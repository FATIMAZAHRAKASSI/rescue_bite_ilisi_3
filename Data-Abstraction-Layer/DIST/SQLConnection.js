"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// db/MySQLConnection.js
const mysql_1 = __importDefault(require("mysql"));
class MySQLConnection {
    constructor() {
        this.pool = mysql_1.default.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'rescuebite',
            port: 3307,
        });
    }
    getConnection() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
    executeQuery(sql, values) {
        return __awaiter(this, void 0, void 0, function* () {
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
                        }
                        else {
                            resolve(results);
                        }
                    });
                });
            });
        });
    }
}
exports.default = MySQLConnection;
