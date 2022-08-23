import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
import Db from '../libs/db';


// untuk mendapatkan berapakali siram air dalam sehari
router.get('/air', async function(req: Request, res: Response,  next: NextFunction){
    try {
        const response = await Db.query('SELECT COUNT(siram_air) AS totalSiram FROM tbl_siram_air WHERE (YEAR(time) = YEAR(NOW()) AND MONTH(time) = MONTH(NOW()) AND DAY(time) = DAY(NOW()) AND siram_air = 1)');
        const data = JSON.parse(JSON.stringify(response, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value
        ));
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

// muntuk mendapatkan berapakali siram nutrisi dalam sebulan
router.get('/nutrisi', async function(req: Request, res: Response, next: NextFunction){
    try {
        const response = await Db.query('SELECT COUNT(siram_nutrisi) AS totalSiram FROM tbl_siram_nutrisi WHERE (YEAR(time) = YEAR(NOW()) AND MONTH(time) = MONTH(NOW()) AND siram_nutrisi = 1)');
        const data = JSON.parse(JSON.stringify(response, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value 
    ));
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

// untuk mengecek status penyiraman air
router.get('/air/cek', async function(req: Request, res: Response, next: NextFunction){
    try {
        const data = await Db.query('SELECT * FROM tbl_siram_air ORDER BY id_siram DESC LIMIT 1');
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});

// untuk mengecek status penyiraman nutrisi
router.get('/nutrisi/cek', async function(req: Request, res: Response, next: NextFunction){
    try {
        const data = await Db.query('SELECT * FROM tbl_siram_nutrisi ORDER BY id_siram_nutrisi DESC LIMIT 1');
        res.json(data);
    } catch (error) {
        console.log(error);
    }
});



router.post('/air', async function(req: Request, res: Response){
    const input = req.body;
    try {
        await Db.query('INSERT INTO tbl_siram VALUES (NULL,?,NOW()',[input.siram_air])
    } catch (error) {
        console.log(error);
    }
});

router.post('/nutrisi', async function(req: Request, res: Response){
    const input = req.body;
    try {
        await Db.query('INSERT INTO tbl_siram_nutrisi VALUES (NULL,?,NOW()',[input.siram_nutrisi])
    } catch (error) {
        console.log(error);
    }
});

export default router;