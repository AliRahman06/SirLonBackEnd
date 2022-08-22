import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import Db from '../libs/db';

// untuk mendapat tinggi nutrisi
router.get('/tinggiNutrisi', async function(req:Request, res: Response, next: NextFunction) {
    try {
        const data = await Db.query('SELECT * FROM tbl_nutrisi ORDER BY id_nutrisi DESC LIMIT 1');
        // const data = await Db.query('SELECT * FROM tbl_nutrisi WHERE id_nutrisi IN (SELECT MAX(id_nutrisi) FROM tbl_air)');
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

router.post('/tinggiNutrisi', async function(req: Request, res: Response){
    const input = req.body;
    try {
        await Db.query('INSERT INTO tbl_nutrisi VALUES (NULL,?,?',[input.tinggiNutrisi, input.time])
    } catch (error) {
        console.log(error);
    }
});

export default router;
