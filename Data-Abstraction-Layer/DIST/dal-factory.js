"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDAL = void 0;
const Demande_dal_1 = __importDefault(require("./Demande-dal"));
const pg_dal_1 = __importDefault(require("./pg-dal"));
const Organisation_dal_1 = __importDefault(require("./Organisation-dal"));
const Commerce_dal_1 = __importDefault(require("./Commerce-dal"));
const Signal_dal_1 = __importDefault(require("./Signal-dal"));
const Admin_1 = __importDefault(require("./Admin"));
function getDAL(databaseType) {
    switch (databaseType) {
        case 'postgresql':
            return new pg_dal_1.default();
        case 'SQLdemande':
            return new Demande_dal_1.default();
        case 'SQLorganisation':
            return new Organisation_dal_1.default();
        case 'SQLcommerce':
            return new Commerce_dal_1.default();
        case 'SQLsignal':
            return new Signal_dal_1.default();
        case 'Admin':
            return new Admin_1.default();
        default:
            throw new Error('Unsupported database type');
    }
}
exports.getDAL = getDAL;
