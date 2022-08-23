import express, { Request, Response, NextFunction } from "express";
import Db from "../libs/db";
import mqtt from 'mqtt';
const router = express.Router();


router.get('/', function(req:Request, res: Response, next: NextFunction) {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const host = 'broker.emqx.io';
            const port = '1883';
            const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;


            const connectUrl = `mqtt://${host}:${port}`;
            const client = mqtt.connect(connectUrl, {
                clientId,
                clean: true,
                connectTimeout: 4000,
                username: 'emqx',
                password: 'public',
                reconnectPeriod: 1000,
            });

            const topic = '/nodejs/mqtt';
            client.on('connect', () => {
                console.log('Connected');
                client.subscribe([topic], () => {
                    console.log(`Subscribe to topic ${topic}`)
                });
                client.publish(topic, 'Ali', { qos: 0, retain: false }, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
                client.on('message', (topic, payload) => {
                    console.log('Received Message:', topic, payload.toString())
                })
            });
            resolve(res.send('Data published successfully'))
        } catch (error) {
            reject(error);
        }
    })
});


export default router