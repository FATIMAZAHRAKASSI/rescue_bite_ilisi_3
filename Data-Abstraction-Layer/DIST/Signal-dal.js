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
class SignalDal {
    constructor() {
        this.mysqlConnection = new SQLConnection_1.default();
    }
    findByFilter2(nomEntity, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connect();
                console.log(filter.id);
                const userResult = yield this.mysqlConnection.executeQuery(`select * from my_signal where statutsignal=?`, ['En_attente']);
                /*  userResult.forEach((element: { description: any; }) => {
                      const desc=element.description
                      element.description=desc
                      console.log("desc desc "+element.description)
                  });*/
                return userResult;
            }
            catch (error) {
                console.error('Error getting entity:', error);
                throw error;
            }
        });
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
                console.log("here's ur signal" + data.unit);
                var currentDate = new Date();
                var formattedDate = currentDate.toISOString().slice(0, -1);
                // Assuming `entityName` is 'utilisateur' for the user table and 'organisation' for the organization table
                // Create a new user
                const userResult = yield this.mysqlConnection.executeQuery('INSERT INTO my_signal (id_commerce, type_nouriture, statutsignal, quantité, image, description_signal,date_expiration,unite) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.id_commerce, data.type_nouriture, 'En_attente', data.quantité, data.image, data.description, data.date_expiration, data.unit]);
                // Get the user's ID
                if (userResult != null) {
                    return userResult;
                }
                else {
                    // Handle other entity creation logic if needed
                    throw new Error('Creation user a echoué');
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
                console.log("here's ur signal" + data);
                // Assuming `entityName` is 'utilisateur' for the user table and 'organisation' for the organization table
                // Create a new user
                const userResult = yield this.mysqlConnection.executeQuery('UPDATE my_signal SET id_commerce=?, type_nouriture=?, statutsignal=?, quantité=?, image=?, description_signal=?, date_expiration=? unite=? where id_signal=?', [data.id_commerce, data.type_nouriture, data.statutsignal, data.quantité, data.image, data.description, data.date_expiration, data.unit, id]);
                if (userResult != null) {
                    return userResult;
                }
                else {
                    // Handle other entity creation logic if needed
                    throw new Error('update signal a echoué');
                }
            }
            catch (error) {
                console.error('Error updateing entity:', error);
                throw error;
            }
        });
    }
    get(entityName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connect();
                const userResult = yield this.mysqlConnection.executeQuery(`select * from my_signal where id_signal=${id}`, [id]);
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
                const userResult = yield this.mysqlConnection.executeQuery(`select * from my_signal`, null);
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
                console.log(filter.id);
                const userResult = yield this.mysqlConnection.executeQuery(`select * from my_signal where id_commerce=?`, [filter.id]);
                /*  userResult.forEach((element: { description: any; }) => {
                      const desc=element.description
                      element.description=desc
                      console.log("desc desc "+element.description)
                  });*/
                return userResult;
            }
            catch (error) {
                console.error('Error getting entity:', error);
                throw error;
            }
        });
    }
}
exports.default = SignalDal;
