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
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
app.use(express_1.default.json());
app.post('/create/SQLcommerce', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // const data = req.body.body;
        const responseComerceDB = yield axios_1.default.post('http://localhost:3000/create/SQLcommerce/commerce', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (responseComerceDB.status === 200) {
            return res.status(200).send(responseComerceDB.data);
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
function authentifier(email, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(email + pass + "nv");
            const response = yield axios_1.default.get('http://localhost:3000/findByFilter/SQLcommerce/commerce', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    "email": email,
                    "mot_de_passe": pass
                }
            });
            if (response != null) {
                console.log("ghjkljhg" + response.data);
                return response.data;
            }
            else {
                return null;
            }
        }
        catch (error) {
            // Handle errors
            console.error('Error', error);
            return { error: 'Internal Server Error' };
        }
    });
}
app.get('/authentificationCommerce/:email/:password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const pass = req.params.password;
    console.log(email + pass);
    const b = yield authentifier(email, pass);
    if (b != null) {
        const c = JSON.stringify(b);
        // console.log("here's "+JSON.stringify(b))
        res.send(JSON.parse(c));
    }
    else {
        res.send({ error: 'commerce n existe pas' });
    }
}));
app.get('/get/SQLcommerce/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log("votre id" + id);
    const response = yield axios_1.default.get(`http://localhost:3000/get/SQLcommerce/commerce/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {}
    });
    if (response != null) {
        console.log("ghjkljhg" + response.data);
        //recuperer la position
        const response2 = yield axios_1.default.get(`http://localhost:3001/get/postgresql/${response.data.id_position}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {}
        });
        const mergedJson = Object.assign(Object.assign({}, response.data), response2.data);
        console.log(JSON.stringify("merged" + mergedJson));
        res.send(mergedJson);
    }
    else {
        res.send({ error: 'commerce n existe pas' });
    }
}));
app.get('/FindAll/SQLcommerce', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`http://localhost:3000/FindAll/SQLcommerce/commerce`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {}
    });
    if (response != null) {
        console.log("ghjkljhg" + response.data);
        if (Array.isArray(response.data)) {
            let jsonArray = [];
            var i = 0;
            // Parcourir les éléments du tableau
            for (var item of response.data) {
                //faire appel a l'api de getById puis inserer dans le json
                const response2 = yield axios_1.default.get(`http://localhost:5000/get/SQLcommerce/${item.id_utilisateur}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {}
                });
                // console.log("data prolly"+JSON.stringify(response2.data));
                jsonArray.push(response2.data);
                console.log("blabla" + JSON.stringify(jsonArray[i]));
                i++;
            }
            ;
            res.send(jsonArray);
        }
        else {
            // Si les données ne sont pas un tableau
            console.error('Les données ne sont pas un tableau JSON.');
        }
    }
    else {
        res.send({ error: 'commerce n existe pas' });
    }
}));
