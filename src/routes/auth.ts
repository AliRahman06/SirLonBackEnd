import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import db from '../libs/db';

router.get('/', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const response = await db.query('SELECT * FROM tb_pengguna');
    const result = {
      jsonapi: {
        version: '1.0'
      },
      meta: {
        authors: 'Universitas Madura',
        copyright: '2022 ~ ProJs Universitas Madura'
      },
      data: await response
    }
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (JSON.parse(await fetchData(req)).length > '0') {
      try {
        await db.query('UPDATE tb_pengguna SET nama= ?, foto = ? WHERE email = ?', [body.nama, body.foto, body.email]);
        const result = {
          jsonapi: {
            version: '1.0'
          },
          meta: {
            authors: 'Universitas Madura',
            copyright: '2022 ~ ProJs Universitas Madura'
          },
          status: '200',
          message: 'Login successfully',
          data: JSON.parse(await fetchData(req))
        }
        res.json(result);
      } catch (error) {
        console.log(error);
      }
      return;
    }
    await db.query('INSERT INTO tb_pengguna VALUES (NULL, ?, ?, NULL, NULL, NULL, ?)', [body.email, body.nama, body.foto]);
    const result = {
      jsonapi: {
        version: '1.0'
      },
      meta: {
        authors: 'Universitas Madura',
        copyright: '2022 ~ ProJs Universitas Madura'
      },
      status: '200',
      message: 'Data created successfully'
    }
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

async function fetchData(req: Request) {
  return JSON.stringify(await db.query("SELECT * FROM tb_pengguna WHERE email = ?", [req.body.email]));
}

export default router;
