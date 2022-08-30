import express, { Request, Response, NextFunction } from "express";
import Db from "../libs/db";
import { client } from "../libs/pubsub";
const router = express.Router();


router.get('/air', function (req: Request, res: Response, next: NextFunction) {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const topic = 'air/tinggi';
            client.on('connect', () => {
                console.log('Connected');
                client.subscribe([topic], () => {
                    console.log(`Subscribe to topic ${topic}`)
                });
                client.on('message', (topic, payload:any) => {
                    const nilai = JSON.parse(payload);
                    console.log('Received Message:', topic, payload.toString());
                    Db.query('INSERT INTO tbl_air VALUES (NULL,?,NOW())',[nilai.tinggiAir]);
                });
            });
            resolve(res.send('Data Subscribe successfully'))
        } catch (error) {
            reject(error);
        }
    })
});
router.get('/nutrisi', function (req: Request, res: Response, next: NextFunction) {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const topic = 'nutrisi/tinggi';
            client.on('connect', () => {
                console.log('Connected');
                client.subscribe([topic], () => {
                    console.log(`Subscribe to topic ${topic}`)
                });
                client.on('message', (topic, payload) => {
                    const nilai = JSON.parse(req.body.payload);
                    console.log('Received Message:', topic, payload.toString());
                    Db.query('INSERT INTO tbl_nutrisi VALUES (NULL,?,NOW())',[nilai.tinggiAir]);
                });
            });
            resolve(res.send('Data Subscribe successfully'))
        } catch (error) {
            reject(error);
        }
    })
});
router.post('/air', (req: Request, res: Response) => {
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
router.post('/nutrisi', (req: Request, res: Response) => {
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