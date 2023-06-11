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
const postgres_connector_1 = __importDefault(require("../../../context/db/postgres.connector"));
const encrypter_1 = require("../../../context/security/encrypter");
class UsuariosRepositoryPostgres {
    registrar(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(usuario.contraseña);
            if (usuario.nombre && usuario.contraseña) {
                try {
                    yield (0, postgres_connector_1.default)(`insert into usuarios (nombre,apellidos,cif,correo,telefono,contraseña,rol) values ('${usuario.nombre}','${usuario.apellidos}','${usuario.cif}','${usuario.correo}',${usuario.telefono},'${(0, encrypter_1.hash)(usuario.contraseña)}','${usuario.rol}')`);
                    const message = {
                        text: 'Usuario creado correctamente'
                    };
                    return message;
                }
                catch (err) {
                    console.log(err);
                }
            }
            const message = {
                text: 'Ha ocurrido un error con la creacion del usuario'
            };
            return message;
        });
    }
    iniciarSesion(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(usuario);
            if (usuario.cif && usuario.contraseña) {
                const result = yield (0, postgres_connector_1.default)(`select * from usuarios where cif  = '${usuario.cif}'`);
                if (result.length >= 1 && (0, encrypter_1.compare)(usuario.contraseña, result[0].contraseña)) {
                    usuario.id = result[0].id,
                        usuario.nombre = result[0].nombre,
                        usuario.apellidos = result[0].apellidos,
                        usuario.cif = result[0].cif,
                        usuario.rol = result[0].rol;
                    return {
                        status: 200,
                        usuario: usuario
                    };
                }
                else {
                    const message = {
                        text: "Cif o contraseña incorrecta"
                    };
                    console.log(message);
                    return {
                        status: 404
                    };
                }
            }
            return {
                status: 400
            };
        });
    }
    getUsuario(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioDB = yield (0, postgres_connector_1.default)("SELECT id, nombre, rol, cif FROM usuarios WHERE id=" + idUsuario);
            const usuario = {
                id: usuarioDB[0].id,
                nombre: usuarioDB[0].nombre,
                apellidos: usuarioDB[0].apellidos,
                cif: usuarioDB[0].cif,
                telefono: usuarioDB[0].telefono,
                contraseña: usuarioDB[0].contraseña,
                rol: usuarioDB[0].rol
            };
            return usuario;
        });
    }
    getAllUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuariosDB = yield (0, postgres_connector_1.default)("SELECT id, nombre, rol, cif FROM usuarios");
            const usuarios = [];
            usuariosDB.forEach(usuarioDB => {
                usuarios.push({
                    id: usuarioDB.id,
                    nombre: usuarioDB.name,
                    rol: usuarioDB.role,
                    cif: usuarioDB.cif
                });
            });
            return usuarios;
        });
    }
}
exports.default = UsuariosRepositoryPostgres;
