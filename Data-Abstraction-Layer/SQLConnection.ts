// db/MySQLConnection.js
import mysql, { Pool, PoolConnection } from 'mysql';

export default class MySQLConnection {
    private pool: Pool;

    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'rescuebite',
            port: 3307,
        });
    }

    getConnection(): Promise<PoolConnection> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
        });
    }
    async executeQuery(sql:any, values:any) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }

                connection.query(sql, values, (queryError, results) => {
                    connection.release();

                    if (queryError) {
                        reject(queryError);
                    } else {
                        resolve(results);
                    }
                });
            });
        });
    }
}
