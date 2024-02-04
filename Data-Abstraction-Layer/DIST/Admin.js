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
class admin {
    constructor() {
        this.mysqlConnection = new SQLConnection_1.default();
    }
    findByFilter2(nomEntity, filter) {
        throw new Error('Method not implemented.');
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
            throw new Error('Method not implemented.');
        });
    }
    update(entityName, id, data) {
        // Implement your update logic here
        throw new Error('Method not implemented.');
    }
    get(entityName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    delete(entityName, id) {
        // Implement your delete logic here
        throw new Error('Method not implemented.');
    }
    findAll(entityName) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    findByFilter(entityName, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connect();
                console.log(filter);
                const userResult = yield this.mysqlConnection.executeQuery('SELECT * FROM admin where email=? And password=?', [filter.email, filter.mot_de_passe]);
                if (userResult != '') { //console.log("your json"+JSON.stringify(userResult[0].id_utilisateur))
                    return userResult;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error('Error creating entity:', error);
                throw error;
            }
        });
    }
}
exports.default = admin;
