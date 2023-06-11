"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuth = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "mySecretKey";
const createToken = (usuario) => {
    const payload = {
        usuario: {
            id: usuario.id,
            cif: usuario.cif,
            rol: usuario.rol,
        },
    };
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: "1 days" });
};
exports.createToken = createToken;
const isAuth = (req, response, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            req.body.auth = decoded.usuario;
            next();
        }
    }
    catch (err) {
        console.error(err);
        const message = {
            text: "No autorizado",
        };
        response.status(401).json(message);
    }
};
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => {
    try {
        if (req.body.auth.role && req.body.auth.role == "administrador") {
            next();
        }
    }
    catch (err) {
        console.error(err);
    }
};
exports.isAdmin = isAdmin;
