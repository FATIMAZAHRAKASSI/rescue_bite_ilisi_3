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
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3003;
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
app.post('/create/SQLsignal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req;
        //  const jsonString = flatted.stringify(data);
        // Parse the JSON string
        //const parsedObject = flatted.parse(jsonString);
        //console.log(parsedObject)
        // const data = req.body.body;
        const responseSignalDB = yield axios_1.default.post('http://localhost:3000/create/SQLsignal/my_signal', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("data de signal " + responseSignalDB.data);
        if (responseSignalDB.status === 200) {
            return res.json(req);
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/get/SQLsignal/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log("votre id" + id);
    const response = yield axios_1.default.get(`http://localhost:3000/get/SQLsignal/my_signal/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {}
    });
    if (response != null) {
        console.log("ghjkljhg" + response.data);
        //recuperer la position
        const response2 = yield axios_1.default.get(`http://localhost:5000/get/SQLcommerce/${response.data.id_commerce}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {}
        });
        const mergedJson = Object.assign(Object.assign({}, response.data), response2.data);
        //console.log("data de signal "+JSON.stringify(mergedJson));
        return res.json(mergedJson);
    }
    else {
        return res.send({ error: 'signal n existe pas' });
    }
}));
app.get('/getSanscommerce/SQLsignal/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log("votre id" + id);
    const response = yield axios_1.default.get(`http://localhost:3000/get/SQLsignal/my_signal/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {}
    });
    if (response != null) {
        return res.json(response.data);
    }
    else {
        return res.send({ error: 'signal n existe pas' });
    }
}));
app.get('/FindAll/SQLsignal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`http://localhost:3000/FindAll/SQLsignal/my_signal`, {
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
                const response2 = yield axios_1.default.get(`http://localhost:3003/get/SQLsignal/${item.id_signal}`, {
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
app.post('/accepter/signal/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req;
        const id = req.params.id;
        console.log(data);
        // const data = req.body.body;
        const responseComerceDB = yield axios_1.default.put(`http://localhost:3000/update/SQLsignal/my_signal/${id}`, data, {
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
app.post('/refuser/signal/:iddemande/:idsignal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const iddemande = req.params.iddemande;
        const idsignal = req.params.idsignal;
        const jsonString = `{"id_signal": ${idsignal}}`;
        const data = JSON.parse(jsonString);
        // const data = req.body.body;
        const responseComerceDB = yield axios_1.default.get(`http://localhost:3000/findByFilter/SQLdemande/${iddemande}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
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
app.get('/FindAllEn_attente/SQLsignal/:idcommerce', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idcomm = req.params.idcommerce;
    console.log(idcomm);
    const response = yield axios_1.default.get(`http://localhost:3000/findByFilter/SQLsignal/signal`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: { "id": idcomm }
    });
    if (response != null) {
        console.log("ghjkljhg" + response.data);
        if (Array.isArray(response.data)) {
            let jsonArray = [];
            var i = 0;
            // Parcourir les éléments du tableau
            for (var item of response.data) {
                //faire appel a l'api de getById puis inserer dans le json
                const response2 = yield axios_1.default.get(`http://localhost:3003/get/SQLsignal/${item.id_signal}`, {
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
app.get('/FindAllEn_attente/SQLsignal', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idcomm = req.params.idcommerce;
    console.log(idcomm);
    const response = yield axios_1.default.get(`http://localhost:3000/findByFilter2/SQLsignal/signal`, {
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
                const response2 = yield axios_1.default.get(`http://localhost:3003/getSanscommerce/SQLsignal/${item.id_signal}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {}
                });
                const response3 = yield axios_1.default.get(`http://localhost:5000/get/SQLcommerce/${item.id_commerce}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {}
                });
                // console.log("data prolly"+JSON.stringify(response2.data));
                const cord = { "latitude": response3.data.latitude, "longitude": response3.data.longitude };
                const merge = Object.assign(Object.assign({}, response2.data), cord);
                jsonArray.push(merge);
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
app.use(express_1.default.json());
