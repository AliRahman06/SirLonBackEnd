import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import Db from '../libs/db';

// untuk mendapat tinggi nutrisi
router.get('/', async function(req:Request, res: Response, next: NextFunction) {
    try {
        const data = await Db.query('SELECT tinggi_nutrisi FROM tbl_nutrisi ORDER BY id_nutrisi DESC LIMIT 1');
        // const data = await Db.query('SELECT * FROM tbl_nutrisi WHERE id_nutrisi IN (SELECT MAX(id_nutrisi) FROM tbl_air)');
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async function(req: Request, res: Response){
    const input = req.body;
    try {
        await Db.query('INSERT INTO tbl_nutrisi VALUES (NULL,?,NOW())',[input.tinggiNutrisi])
    } catch (error) {
        console.log(error);
    } finally {
        res.json({message: 'Berhasil tambah'});
    } 
});

export default router;
