import dotenv from 'dotenv';
dotenv.config();
export default class Db {
    private static db: any = null;
  
    public static query(query: string, param?: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this.init();
        this.db.getConnection().then(async (conn: any) => {
          if (param == undefined) param = [];
          try {
            const res = await conn.query(query, param);
            conn.release();
            resolve(res);
          } catch(err) {
            conn.release();
            reject(err);
          }
        }).catch((err: any) => reject(err));
      });
    }
  
    public static init() {
      if ( ! Db.db) {
        const mariadb = require('mariadb');
        this.db = mariadb.createPool({
          host: process.env.DB_HOST, 
          port: process.env.DB_PORT,
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD, 
          database: process.env.DB_DATABASE
        });
      }
    }
  };
  