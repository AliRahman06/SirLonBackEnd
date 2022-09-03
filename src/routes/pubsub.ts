import express, { Request, Response, NextFunction } from "express";
import { client } from "../libs/pubsub";
const router = express.Router();


router.post('/air', (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
        try {
            const input = req.body.text;
            console.log(input)
            const topic = 'melon/siram';
            client.publish(topic, input, { qos: 0, retain: false }, (error) => {
                if (error) {
                    console.log(error);
                }   
            });
            resolve( res.json({message: 'Publish Berhasil'}));
        } catch (error) {
            reject(error);
        }
    })
});
router.post('/nutrisi', (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
        try {
            const topic = 'melon/siram';
            const input = req.body.text;  
            client.publish(topic, input, { qos: 0, retain: false }, (error) => {
                if (error) {
                    console.log(error);
                } 
            });
            resolve( res.json({message: 'Publish Berhasil'}));
        } catch (error) {

        }
    })
});

export default router