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
const port = process.env.PORT || 5001;
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
function authentifier(email, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(email + pass + "nv");
            const response = yield axios_1.default.get('http://localhost:3000/findByFilter/Admin/admin', {
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
app.get('/authentificationaAdmin/:email/:password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.send({ error: 'Admin n existe pas' });
    }
}));
app.use(express_1.default.json());
