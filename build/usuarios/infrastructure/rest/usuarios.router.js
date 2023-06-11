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
exports.routerUsuarios = void 0;
const express_1 = __importDefault(require("express"));
const usuarios_usecases_1 = __importDefault(require("../../application/usuarios.usecases"));
const usuarios_repository_postgres_1 = __importDefault(require("../../infrastructure/db/usuarios.repository.postgres"));
const auth_1 = require("../../../context/security/auth");
const router = express_1.default.Router();
exports.routerUsuarios = router;
const usuariosRepository = new usuarios_repository_postgres_1.default();
const usuariosUseCases = new usuarios_usecases_1.default(usuariosRepository);
router.post("/iniciarSesion", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body.cif);
    try {
        const usuario = {
            cif: req.body.cif,
            contraseña: req.body.contraseña
        };
        const iniciarSesion = yield usuariosUseCases.iniciarSesion(usuario);
        if (iniciarSesion.status === 200 && !!iniciarSesion.usuario) {
            usuario.id = iniciarSesion.usuario.id;
            usuario.rol = iniciarSesion.usuario.rol;
            usuario.nombre = iniciarSesion.usuario.nombre;
            const token = usuariosUseCases.createToken(usuario);
            res.json(token);
        }
        else if (iniciarSesion.status === 404) {
            const message = {
                text: "Autentificacion fallida"
            };
            res.status(404).send(message);
        }
        else if (iniciarSesion.status === 400) {
            const message = {
                text: "Informacion insuficiente"
            };
            res.status(400).send(message);
        }
    }
    catch (error) {
        const message = {
            text: String(error)
        };
        res.status(500).send(message);
    }
}));
router.post("/registrar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            cif: req.body.cif,
            correo: req.body.correo,
            telefono: req.body.telefono,
            contraseña: req.body.contraseña,
            rol: req.body.rol
        };
        const result = yield usuariosUseCases.registrar(usuario);
        res.json(result);
    }
    catch (err) {
        const message = {
            text: String(err)
        };
        res.status(500).send(message);
    }
}));
router.get("/getOneUsuario/:id", auth_1.isAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuariosUseCases.getUsuario(Number(req.params.id));
        res.json(usuario);
    }
    catch (err) {
        console.error(err);
    }
}));
