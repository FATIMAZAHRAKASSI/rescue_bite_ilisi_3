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
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class PGDAL {
    constructor() {
        this.pool = new pg_1.Pool({
            user: 'ilisi',
            host: 'localhost',
            database: 'geolocalisation',
            password: 'ilisi',
            port: 15432,
            max: 1000000000000000
        });
    }
    findByFilter2(nomEntity, filter) {
        throw new Error('Method not implemented.');
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let client;
            try {
                client = yield this.pool.connect();
                console.log('Connected to PostgreSQL');
            }
            catch (error) {
                console.error('Error connecting to PostgreSQL:', error);
                throw error;
            }
            finally {
                client === null || client === void 0 ? void 0 : client.release();
            }
        });
    }
    create(entityName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            try {
                const result = yield this.pool.query(`INSERT INTO ${entityName} (latitude, longitude, nom,delta_latitude,delta_longitude) VALUES ($1, $2, $3,$4,$5) RETURNING *`, [data.latitude, data.longitude, data.nom, data.delta_latitude, data.delta_longitude]);
                if (result.rows && result.rows.length > 0) {
                    console.log('Inserted row:', result.rows[0]);
                    return result.rows[0];
                }
                else {
                    throw new Error('Insert operation did not return the inserted row.');
                }
            }
            catch (error) {
                console.error('Error creating row:', error);
                throw error;
            }
        });
    }
    update(entityName, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            try {
                const result = yield this.pool.query(`UPDATE ${entityName} SET latitude = $1, longitude = $2, nom = $3 WHERE id = $4 RETURNING *`, [data.latitude, data.longitude, data.nom, id]);
                if (result.rows && result.rows.length > 0) {
                    console.log('Updated row:', result.rows[0]);
                    return result.rows[0];
                }
                else {
                    throw new Error('Update operation did not return the updated row.');
                }
            }
            catch (error) {
                console.error('Error updating row:', error);
                throw error;
            }
        });
    }
    get(entityName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            try {
                const result = yield this.pool.query(`SELECT * FROM ${entityName} WHERE id = $1`, [id]);
                if (result.rows && result.rows.length > 0) {
                    console.log('Retrieved row:', result.rows[0]);
                    return result.rows[0];
                }
                else {
                    console.log('No row found with the specified ID.');
                }
            }
            catch (error) {
                console.error('Error getting row:', error);
                throw error;
            }
        });
    }
    delete(entityName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            try {
                const result = yield this.pool.query(`DELETE FROM ${entityName} WHERE id = $1 RETURNING *`, [id]);
                if (result.rows && result.rows.length > 0) {
                    console.log('Deleted row:', result.rows[0]);
                    return true;
                }
                else {
                    throw new Error('Delete operation did not return the deleted row.');
                }
            }
            catch (error) {
                console.error('Error deleting row:', error);
                throw error;
            }
        });
    }
    findAll(entityName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            try {
                const result = yield this.pool.query(`SELECT * FROM ${entityName}`);
                return result.rows;
            }
            catch (error) {
                console.error('Error fetching all rows:', error);
                throw error;
            }
        });
    }
    findByFilter(entityName, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connect();
            const longitude = filter.longitude;
            const latitude = filter.latitude;
            const delta_longitude = filter.delta_longitude;
            const delta_latitude = filter.delta_latitude;
            console.log("affichage place pg admin " + delta_longitude + "--" + delta_latitude + "------" + latitude + longitude);
            try {
                const result = yield this.pool.query(`SELECT * FROM ${entityName} WHERE latitude = $1 AND longitude= $2 AND delta_longitude=$3 AND delta_latitude=$4`, [latitude, longitude, delta_longitude, delta_latitude]);
                console.log("results" + result.rows[0]);
                return result.rows[0];
            }
            catch (error) {
                console.error('Error fetching rows by filter:', error);
                throw error;
            }
        });
    }
}
exports.default = PGDAL;
