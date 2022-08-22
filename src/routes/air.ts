import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import Db from '../libs/db';

// untuk mendapat tinggi nutrisi
router.get('/', async function(req:Request, res: Response, next: NextFunction) {
    try {
        const data = await Db.query('SELECT * FROM tbl_air ORDER BY id_air DESC LIMIT 1');
        // const data = await Db.query('SELECT * FROM tbl_air WHERE id_air IN (SELECT MAX(id_air) FROM tbl_air)');
        res.send('Berhasil');
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});

router.post('/', async function(req: Request, res: Response){
    const input = req.body;
    try {
        await Db.query('INSERT INTO tbl_air VALUES (NULL,?,?',[input.tinggiAir, input.time]);
        res.send('Berhasil');
    } catch (error) {
        console.log(error);
    }
});

export default router;
