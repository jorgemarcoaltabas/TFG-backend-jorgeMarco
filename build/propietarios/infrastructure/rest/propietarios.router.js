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
exports.routerPropietarios = void 0;
const express_1 = __importDefault(require("express"));
const propietarios_postgres_1 = __importDefault(require("../db/propietarios.postgres"));
const propietarios_usecases_1 = __importDefault(require("../../application/propietarios.usecases"));
const router = express_1.default.Router();
exports.routerPropietarios = router;
const propietariosRepository = new propietarios_postgres_1.default();
const propietariosUseCases = new propietarios_usecases_1.default(propietariosRepository);
router.get("/getAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propietarios = yield propietariosUseCases.getAllPropietarios();
        res.json(propietarios);
    }
    catch (err) {
        console.error(err);
    }
}));
router.get("/getOnePropietario/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propietario = yield propietariosRepository.getOnePropietario(Number(req.params.id));
        res.json(propietario);
    }
    catch (err) {
        console.error(err);
    }
}));
router.post("/addPropietario", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propietario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            cif: req.body.cif,
            correo: req.body.correo,
            telefono: req.body.telefono,
            poblacion: req.body.poblacion
        };
        const nuevoPropietario = yield propietariosUseCases.addPropietario(propietario);
        res.json(nuevoPropietario);
    }
    catch (err) {
        console.error(err);
    }
}));
router.put("/modifyPropietario/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propietario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            cif: req.body.cif,
            correo: req.body.correo,
            telefono: req.body.telefono,
            poblacion: req.body.poblacion
        };
        const propietarioModificado = yield propietariosUseCases.modifyPropietario(propietario, Number(req.params.id));
        res.json(propietarioModificado);
    }
    catch (err) {
        console.error(err);
    }
}));
router.delete("/deltePropietario/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propietario = yield propietariosUseCases.deletePropietario(Number(req.params.id));
        res.json(propietario);
    }
    catch (err) {
        console.error(err);
    }
}));
