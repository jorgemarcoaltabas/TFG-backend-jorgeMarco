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
exports.routerInquilinos = void 0;
const express_1 = __importDefault(require("express"));
const Inquilinos_postgres_1 = __importDefault(require("../db/Inquilinos.postgres"));
const Inquilinos_usecases_1 = __importDefault(require("../../application/Inquilinos.usecases"));
const router = express_1.default.Router();
exports.routerInquilinos = router;
const inquilinosRepository = new Inquilinos_postgres_1.default();
const inquilinosUseCases = new Inquilinos_usecases_1.default(inquilinosRepository);
router.get("/getAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inquilinos = yield inquilinosUseCases.getAllInquilinos();
        res.json(inquilinos);
    }
    catch (err) {
        console.error(err);
    }
}));
router.get("/getOneInquilino/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inquilinos = yield inquilinosUseCases.getOneInquilino(Number(req.params.id));
        res.json(inquilinos);
    }
    catch (err) {
        console.error(err);
    }
}));
router.post("/addInquilino", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inquilinos = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            cif: req.body.cif,
            correo: req.body.correo,
            telefono: req.body.telefono,
            poblacion: req.body.poblacion
        };
        const nuevoInquilino = yield inquilinosUseCases.addInquilino(inquilinos);
        res.json(nuevoInquilino);
    }
    catch (err) {
        console.error(err);
    }
}));
router.put("/modifyInquilino/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inquilinos = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            cif: req.body.cif,
            correo: req.body.correo,
            telefono: req.body.telefono,
            poblacion: req.body.poblacion
        };
        const InquilinoModificado = yield inquilinosUseCases.modifyInquilino(inquilinos, Number(req.params.id));
        res.json(InquilinoModificado);
    }
    catch (err) {
        console.error(err);
    }
}));
router.delete("/delteInquilino/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inquilinos = yield inquilinosUseCases.deleteInquilino(Number(req.params.id));
        res.json(inquilinos);
    }
    catch (err) {
        console.error(err);
    }
}));
