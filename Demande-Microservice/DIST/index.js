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
const port = process.env.PORT || 3005;
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
app.post('/create/demande', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req;
        console.log("the data" + JSON.stringify(data));
        // const data = req.body.body;
        const responseComerceDB = yield axios_1.default.post('http://localhost:3000/create/SQLdemande/demande', data, {
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
app.get('/get/SQLdemande/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log("votre id" + id);
    const response = yield axios_1.default.get(`http://localhost:3000/get/SQLdemande/demande/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: {}
    });
    if (response != null) { //console.log("ghjkljhg"+response.data);
        //recuperer la position
        const response2 = yield axios_1.default.get(`http://localhost:3003/get/SQLsignal/${response.data.id_signal}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {}
        });
        const mergedJson = Object.assign(Object.assign({}, response.data), response2.data);
        res.send(mergedJson);
    }
    else {
        res.send({ error: 'commerce n existe pas' });
    }
}));
app.get('/FindAll/SQLdemande/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const jsonString = `{"id_signal": ${id}}`;
    const data = JSON.parse(jsonString);
    const response = yield axios_1.default.get(`http://localhost:3000/FindByFilter2/SQLdemande/demande`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    });
    if (response != null) {
        //console.log("ghjkljhg"+response.data);
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
            const response3 = yield axios_1.default.get(`http://localhost:3002/get/SQLorganisation/${item.id_organisation}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {}
            });
            // console.log("data prolly"+JSON.stringify(response2.data));
            const jsonorga = { "organisation": response3.data };
            console.log("orga" + jsonorga);
            const mergedJson = Object.assign(Object.assign(Object.assign({}, item), response2.data), jsonorga);
            jsonArray.push(mergedJson);
            console.log("blabla" + JSON.stringify(jsonArray[i]));
            i++;
        }
        ;
        res.send(jsonArray);
    }
    else {
        res.send({ error: 'demande n existe pas' });
    }
}));
app.put('/accepter/demande/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req;
        const id = req.params.id;
        // const data = req.body.body;
        const responseDemandeDB = yield axios_1.default.put(`http://localhost:3000/update/SQLdemande/demande/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (responseDemandeDB.status === 200) {
            let idsignal = responseDemandeDB.data.id_signal;
            console.log("response data" + responseDemandeDB.data.id_signal);
            const responseSignal = yield axios_1.default.get(`http://localhost:3003/get/SQLsignal/${idsignal}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {}
            });
            //   console.log("votre data "+flatted.stringify(responseSignal.data));
            responseSignal.data.statutsignal = "Termine";
            console.log("nouveau data apres modification " + JSON.stringify(responseSignal.data));
            if (responseSignal.status === 200) {
                const responseSignalUpdateDB = yield axios_1.default.post(`http://localhost:3003/accepter/signal/${idsignal}`, responseSignal.data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const responseDemandeRefuseDB = yield axios_1.default.post(`http://localhost:3003/refuser/signal/${id}/${idsignal}`, responseSignal.data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                return res.json(responseDemandeRefuseDB.data);
            }
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.use(express_1.default.json());
