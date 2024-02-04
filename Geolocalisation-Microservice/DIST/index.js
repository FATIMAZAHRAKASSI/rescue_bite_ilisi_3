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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Increase the limit for handling JSON payloads
app.use(body_parser_1.default.json({ limit: '1000mb' }));
// Increase the limit for handling URL-encoded payloads
app.use(body_parser_1.default.urlencoded({ limit: '1000mb', extended: true }));
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
app.use(express_1.default.json());
function checkIfElementExistsAndGetId(elem1) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("votre element " + elem1);
        try {
            const response = yield axios_1.default.get('http://localhost:3000/findByFilter/postgresql/postion_table', {
                data: elem1,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status == 200) {
                // Si la réponse est réussie, renvoyer l'ID extrait de la réponse
                const id = response.data.id; // Assurez-vous d'ajuster la propriété 'id' selon la structure de votre réponse
                console.log("here's my data " + response.data);
                return id;
            }
            else {
                return null;
            }
        }
        catch (error) {
            // Gérez les erreurs ici
            console.log("erooooooooor");
            return null; // En cas d'erreur, renvoyer null (ou une valeur appropriée)
        }
    });
}
function createInPostgreSQLAndGetId(pos1) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post('http://localhost:3000/create/postgresql/postion_table', pos1, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status == 200) {
                const id = response.data.id;
                return id;
            }
            else {
                // Si la réponse est un code d'erreur, renvoyer null (ou une valeur appropriée)
                return null;
            }
        }
        catch (error) {
            // Gérez les erreurs ici
            console.error(error);
            return null; // En cas d'erreur, renvoyer null (ou une valeur appropriée)
        }
    });
}
app.post('/create/postgresql/postion_table', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("je suis la");
        //  const data=req.body
        const data = req.body.body;
        const pos = data.node;
        console.log("affichage de deltas " + pos.delta_longitude + "------" + pos.delta_latitude);
        let id1;
        try {
            id1 = yield checkIfElementExistsAndGetId(pos);
            if (id1 == null) {
                console.log("id1 " + id1);
                id1 = yield createInPostgreSQLAndGetId(pos);
                console.log("id1 apres creation" + id1);
            }
            else {
                console.log("id1 recupere sans creation " + id1);
            }
            let newdata;
            if (data.role_user == "Organisation") {
                newdata = {
                    "description": data.description,
                    "adresse": data.adresse,
                    "email": data.email,
                    "heure_fermeture": data.heure_fermeture,
                    "heure_ouverture": data.heure_ouverture,
                    "logo": data.logo,
                    "mot_de_passe": data.mot_de_passe,
                    "nom": data.nom,
                    "type_organisation": data.type_organisation,
                    "numero_telephone": data.numero_telephone,
                    "role_user": data.role_user,
                    "id_position": id1,
                    "images": data.images
                };
                try {
                    const responseOrganisation = yield axios_1.default.post('http://localhost:3002/create/SQLorganisation', newdata, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (responseOrganisation.status == 200) {
                        return res.status(200).json({ message: 'Création Organisation réussie' });
                    }
                    else {
                        // Si la réponse est un code d'erreur, renvoyer null (ou une valeur appropriée)
                        return null;
                    }
                }
                catch (error) {
                    // Gérez les erreurs ici
                    console.error(error);
                    return null; // En cas d'erreur, renvoyer null (ou une valeur appropriée)
                }
            }
            else {
                newdata = {
                    "description": data.description,
                    "adresse": data.adresse,
                    "email": data.email,
                    "heure_fermeture": data.heure_fermeture,
                    "heure_ouverture": data.heure_ouverture,
                    "logo": data.logo,
                    "mot_de_passe": data.mot_de_passe,
                    "nom": data.nom,
                    "type_commerce": data.type_commerce,
                    "numero_telephone": data.numero_telephone,
                    "role_user": data.role_user,
                    "id_position": id1,
                    "images": data.images
                };
                try {
                    const responseComerce = yield axios_1.default.post('http://localhost:5000/create/SQLcommerce', newdata, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (responseComerce.status == 200) {
                        return res.status(200).json({ message: 'Création Commerce réussie' });
                    }
                    else {
                        // Si la réponse est un code d'erreur, renvoyer null (ou une valeur appropriée)
                        return null;
                    }
                }
                catch (error) {
                    // Gérez les erreurs ici
                    console.error(error);
                    return null; // En cas d'erreur, renvoyer null (ou une valeur appropriée)
                }
            }
        }
        catch (error) {
            console.log('Erreur:');
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/get/postgresql/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log("votre id" + id);
    const response = yield axios_1.default.get(`http://localhost:3000/get/postgresql/postion_table/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {}
    });
    if (response != null) {
        console.log("ghjkljhg" + response.data);
        res.send(response.data);
    }
    else {
        res.send({ error: 'signal n existe pas' });
    }
}));
app.get('/FindAll/postgresql', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`http://localhost:3000/FindAll/postgresql/postion_table`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {}
    });
    if (response != null) {
        console.log("ghjkljhg" + response.data);
        res.send(response.data);
    }
    else {
        res.send({ error: 'signal n existe pas' });
    }
}));
