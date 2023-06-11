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
exports.routerPropiedades = void 0;
const express_1 = __importDefault(require("express"));
const propiedades_postgres_1 = __importDefault(require("../db/propiedades.postgres"));
const propiedades_usecases_1 = __importDefault(require("../../application/propiedades.usecases"));
const router = express_1.default.Router();
exports.routerPropiedades = router;
const propiedadesRepository = new propiedades_postgres_1.default();
const propiedadesUseCases = new propiedades_usecases_1.default(propiedadesRepository);
router.get("/getAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propiedades = yield propiedadesUseCases.getAllPropiedades();
        res.json(propiedades);
    }
    catch (err) {
        console.error(err);
    }
}));
router.get("/getOnePropiedad/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propiedad = yield propiedadesUseCases.getOnePropiedad(Number(req.params.id));
        res.json(propiedad);
    }
    catch (err) {
        console.error(err);
    }
}));
router.post("/addPropiedad", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propiedad = {
            direccion: req.body.direccion,
            catastro: req.body.catastro,
            municipio: req.body.municipio,
            codigo_postal: req.body.codigo_postal,
            estado: req.body.estado
        };
        const nuevaPropiedad = yield propiedadesUseCases.addPropiedad(propiedad);
        res.json(nuevaPropiedad);
    }
    catch (err) {
        console.error(err);
    }
}));
router.put("/modifyPropiedad/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propiedad = {
            direccion: req.body.direccion,
            catastro: req.body.catastro,
            municipio: req.body.municipio,
            codigo_postal: req.body.codigo_postal,
            estado: req.body.estado
        };
        const propiedadModificada = yield propiedadesUseCases.modifyPropiedad(propiedad, Number(req.params.id));
        res.json(propiedadModificada);
    }
    catch (err) {
        console.error(err);
    }
}));
router.delete("/deletePropiedad/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const propiedad = yield propiedadesUseCases.deletePropiedad(Number(req.params.id));
        res.json(propiedad);
    }
    catch (err) {
        console.error(err);
    }
}));
