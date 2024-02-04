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
const dal_factory_1 = require("./dal-factory");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
app.use(express_1.default.json());
app.post('/create/:databaseType/:nomEntity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const databaseType = req.params.databaseType;
        const nomEntity = req.params.nomEntity;
        // console.log(req);
        console.log(databaseType);
        console.log(nomEntity);
        // const { _id, name, phone_number, email, address, city, state, country, password } = data;
        const dal = (0, dal_factory_1.getDAL)(databaseType);
        console.log("voici " + dal);
        const result = yield dal.create(nomEntity, data);
        //res.json(result);
        //   console.log(result);
        return res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/get/:databaseType/:nomEntity/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const databaseType = req.params.databaseType;
        const nomEntity = req.params.nomEntity;
        const id = req.params.id;
        const dal = (0, dal_factory_1.getDAL)(databaseType);
        const result = yield dal.get(nomEntity, id);
        if (result[0] != null) {
            res.send(result[0]);
        }
        else {
            res.send(result);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/FindAll/:databaseType/:nomEntity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const databaseType = req.params.databaseType;
        const nomEntity = req.params.nomEntity;
        const dal = (0, dal_factory_1.getDAL)(databaseType);
        const result = yield dal.findAll(nomEntity);
        res.send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/findByFilter/:databaseType/:nomEntity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const databaseType = req.params.databaseType;
        const nomEntity = req.params.nomEntity;
        let filter;
        if (req.body != null) {
            filter = req.body;
        }
        else {
            filter = req.body.data;
        }
        console.log("filter .... " + JSON.stringify(filter));
        const dal = (0, dal_factory_1.getDAL)(databaseType);
        const result = yield dal.findByFilter(nomEntity, filter);
        if (result != null) {
            res.json(result);
        }
        else {
            res.json(null);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/findByFilter2/:databaseType/:nomEntity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const databaseType = req.params.databaseType;
        const nomEntity = req.params.nomEntity;
        let filter;
        if (req.body != null) {
            filter = req.body;
        }
        else {
            filter = req.body.data;
        }
        // console.log("filter .... "+JSON.stringify(filter));
        const dal = (0, dal_factory_1.getDAL)(databaseType);
        const result = yield dal.findByFilter2(nomEntity, filter);
        if (result != null) {
            res.json(result);
        }
        else {
            res.json(null);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.put('/update/:databaseType/:nomEntity/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const databaseType = req.params.databaseType;
        const nomEntity = req.params.nomEntity;
        console.log(req.body);
        const dal = (0, dal_factory_1.getDAL)(databaseType);
        const _id = req.params.id;
        const result = yield dal.update(nomEntity, _id, req.body);
        res.json(req.body);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
