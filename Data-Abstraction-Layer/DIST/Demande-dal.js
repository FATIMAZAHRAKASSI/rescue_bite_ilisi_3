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
const SQLConnection_1 = __importDefault(require("./SQLConnection"));
class DemandeDal {
    constructor() {
        this.mysqlConnection = new SQLConnection_1.default();
    }
    ;
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield this.mysqlConnection.getConnection();
                console.log('Connected to MySQL');
                connection.release();
            }
            catch (error) {
                console.error('Error connecting to MySQL:', error);
                throw error;
            }
        });
    }
    create(entityName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connect();
                console.log("here's ur demande" + JSON.stringify(data));
                // Assuming `entityName` is 'utilisateur' for the user table and 'organisation' for the organization table
                // Create a new user
                const userResult = yield this.mysqlConnection.executeQuery('INSERT INTO demande (id_signal, id_organisation, statutdemande) VALUES (?, ?, ?)', [data.id_signal, data.id_organisation, 'En_attente']);
                if (userResult != null) {
                    console.log("user result " + userResult);
                    return userResult;
                }
                else {
                    // Handle other entity creation logic if needed
                    throw new Error('Creation demande a echoué');
                }
            }
            catch (error) {
                console.error('Error creating entity:', error);
                throw error;
            }
        });
    }
    update(entityName, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement your update logic here
            try {
                yield this.connect();
                console.log("here's ur demande" + JSON.stringify(data));
                // Assuming `entityName` is 'utilisateur' for the user table and 'organisation' for the organization table
                // Create a new user
                const userResult = yield this.mysqlConnection.executeQuery('UPDATE  demande SET  id_signal=?, id_organisation=?, statutdemande=? where id_demande=?', [data.id_signal, data.id_organisation, data.statutdemande, id]);
                if (userResult != null) {
                    return userResult;
                }
                else {
                    // Handle other entity creation logic if needed
                    throw new Error('Creation demande a echoué');
                }
            }
            catch (error) {
                console.error('Error creating entity:', error);
                throw error;
            }
        });
    }
    get(entityName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connect();
                const userResult = yield this.mysqlConnection.executeQuery(`select * from demande
            where demande.id_demande=?`, [id]);
                return userResult;
            }
            catch (error) {
                console.error('Error getting entity:', error);
                throw error;
            }
        });
    }
    delete(entityName, id) {
        // Implement your delete logic here
        throw new Error('Method not implemented.');
    }
    findAll(entityName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connect();
                const userResult = yield this.mysqlConnection.executeQuery(`select * from demande`, null);
                return userResult;
            }
            catch (error) {
                console.error('Error getting entity:', error);
                throw error;
            }
        });
    }
    findByFilter(entityName, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connect();
                console.log("here's id" + JSON.stringify(filter.id_signal));
                let id = filter.id_signal;
                let iddemande = parseInt(entityName);
                const userResult = yield this.mysqlConnection.executeQuery(`UPDATE demande SET statutdemande =? where id_demande !=? and id_signal=?`, ['Refuse', iddemande, id]);
                return userResult;
            }
            catch (error) {
                console.error('Error getting entity:', error);
                throw error;
            }
        });
    }
    findByFilter2(entityName, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connect();
                console.log("here's id" + JSON.stringify(filter.id_signal));
                let id = filter.id_signal;
                let iddemande = parseInt(entityName);
                const userResult = yield this.mysqlConnection.executeQuery(`select * from demande where id_signal=?`, [id]);
                console.log(JSON.stringify("youre ueser ersult demande " + userResult));
                return userResult;
            }
            catch (error) {
                console.error('Error getting entity:', error);
                throw error;
            }
        });
    }
}
exports.default = DemandeDal;
