import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import Db from '../libs/db';

// untuk mendapat tinggi nutrisi
router.get('/tinggiAir', async function(req:Request, res: Response, next: NextFunction) {
    try {
        const data = await Db.query('SELECT * FROM tbl_air ORDER BY id_air DESC LIMIT 1');
        // const data = await Db.query('SELECT * FROM tbl_air WHERE id_air IN (SELECT MAX(id_air) FROM tbl_air)');
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

router.post('/tinggiAir', async function(req: Request, res: Response){
    const input = req.body;
    try {
        await Db.query('INSERT INTO tbl_air VALUES (NULL,?,?',[input.tinggiAir, input.time])
    } catch (error) {
        console.log(error);
    }
});

export default router;
