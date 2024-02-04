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
class CommerceDal {
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
            try {
                yield this.connect();
                console.log(data);
                // Assuming `entityName` is 'utilisateur' for the user table and 'organisation' for the organization table
                // Create a new user
                const userResult = yield this.mysqlConnection.executeQuery('INSERT INTO utilisateur (description, adresse, email, heure_fermeture, heure_ouverture, logo, mot_de_passe, nom, numero_telephone, role_user, id_position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.description, data.adresse, data.email, data.heure_fermeture, data.heure_ouverture, data.logo, data.mot_de_passe, data.nom, data.numero_telephone, data.role_user, data.id_position]);
                // Get the user's ID
                if (userResult != null) {
                    console.log(userResult.insertId);
                    const images = data.images;
                    for (const key in images) {
                        const imageresult = yield this.mysqlConnection.executeQuery('INSERT INTO utilisateur_images  (images, utilisateur_id_utilisateur) VALUES (?, ?)', [images[key], userResult.insertId]);
                    }
                    const orgaresult = yield this.mysqlConnection.executeQuery('INSERT INTO commerce (type_commerce, id_utilisateur) VALUES (?, ?)', [data.type_commerce, userResult.insertId]);
                    return orgaresult;
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
        // Implement your update logic here
        throw new Error('Method not implemented.');
    }
    get(entityName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connect();
                const userResult = yield this.mysqlConnection.executeQuery(`select * from utilisateur,commerce
            where utilisateur.id_utilisateur=commerce.id_utilisateur
            AND commerce.id_utilisateur=?`, [id]);
                const imageResult = yield this.mysqlConnection.executeQuery(`select * from utilisateur_images
            where utilisateur_id_utilisateur=?`, [id]);
                const transformedJson = imageResult.reduce((acc, item, index) => {
                    const imageKey = index.toString();
                    acc.images[imageKey] = item.images;
                    return acc;
                }, { images: {} });
                const mergedJson = Object.assign(Object.assign({}, userResult[0]), transformedJson);
                console.log("your new json" + JSON.stringify(transformedJson));
                console.log("your merged json" + JSON.stringify(mergedJson));
                return mergedJson;
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
                const userResult = yield this.mysqlConnection.executeQuery(`select * from commerce,utilisateur
            where commerce.id_utilisateur=utilisateur.id_utilisateur`, null);
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
                console.log(filter);
                const userResult = yield this.mysqlConnection.executeQuery('SELECT * FROM utilisateur where email=? And mot_de_passe=?', [filter.email, filter.mot_de_passe]);
                console.log("dadad " + userResult + "dada");
                if (userResult != '') { //console.log("your json"+JSON.stringify(userResult[0].id_utilisateur))
                    const organisationresult = yield this.mysqlConnection.executeQuery('SELECT * FROM  commerce where id_utilisateur = ? ', [userResult[0].id_utilisateur]);
                    const imagesresult = yield this.mysqlConnection.executeQuery('SELECT * FROM  utilisateur_images where utilisateur_id_utilisateur = ? ', [userResult[0].id_utilisateur]);
                    const parsedData = imagesresult.reduce((jsonObject, row) => {
                        if (!jsonObject["images"]) {
                            jsonObject["images"] = [];
                        }
                        jsonObject["images"].push(row.images);
                        return jsonObject;
                    }, {});
                    console.log(parsedData);
                    const concatenatedValues = Object.assign(Object.assign(Object.assign({}, userResult[0]), organisationresult), parsedData);
                    console.log(JSON.stringify(organisationresult));
                    return concatenatedValues;
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
exports.default = CommerceDal;
