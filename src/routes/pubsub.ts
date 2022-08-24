import express, { Request, Response, NextFunction } from "express";
import Db from "../libs/db";
import { client } from "../libs/pubsub";
const router = express.Router();


router.get('/', function (req: Request, res: Response, next: NextFunction) {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const topic = 'air/tinggi';
            client.on('connect', () => {
                console.log('Connected');
                client.subscribe([topic], () => {
                    console.log(`Subscribe to topic ${topic}`)
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
router.post('/', (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
        try {
            const topic = 'air/tinggi';
            client.on('connect', () => {
                console.log('Connected');
                client.publish(topic, req.body.text, { qos: 0, retain: false }, (error) => {
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

        }
    })
});

export default router