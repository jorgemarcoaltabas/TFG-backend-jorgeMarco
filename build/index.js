"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
//imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
//routers
const usuarios_router_1 = require("./usuarios/infrastructure/rest/usuarios.router");
const propietarios_router_1 = require("./propietarios/infrastructure/rest/propietarios.router");
const Inquilinos_router_1 = require("./inquilinos/infrastructure/rest/Inquilinos.router");
const propiedades_router_1 = require("./propiedades/infrastructure/rest/propiedades.router");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use("/api/usuarios", usuarios_router_1.routerUsuarios);
app.use("/api/propietarios", propietarios_router_1.routerPropietarios);
app.use("/api/inquilinos", Inquilinos_router_1.routerInquilinos);
app.use("/api/propiedades", propiedades_router_1.routerPropiedades);
//portListener
app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${port}`);
});
