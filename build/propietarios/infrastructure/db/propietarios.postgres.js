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
class PropietariosRepositoryPostgres {
    getAllPropietarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const propietariosDB = yield (0, postgres_connector_1.default)("SELECT * FROM propietarios");
            const propietarios = [];
            for (const value of propietariosDB) {
                const nuevoPropietario = {
                    id: value.id,
                    nombre: value.nombre,
                    apellidos: value.apellidos,
                    cif: value.cif,
                    correo: value.correo,
                    telefono: value.telefono,
                    poblacion: value.poblacion
                };
                propietarios.push(nuevoPropietario);
            }
            return propietarios;
        });
    }
    getOnePropietario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const propietarioDB = yield (0, postgres_connector_1.default)(`SELECT * FROM propietarios where id = ` + id);
            if (propietarioDB.length > 0) {
                const propietario = {
                    id: propietarioDB[0].id,
                    nombre: propietarioDB[0].nombre,
                    apellidos: propietarioDB[0].apellidos,
                    cif: propietarioDB[0].cif,
                    correo: propietarioDB[0].correo,
                    telefono: propietarioDB[0].telefono,
                    poblacion: propietarioDB[0].poblacion
                };
                return propietario;
            }
            throw new Error("No se ha podiddo recuperar el propietario");
        });
    }
    addPropietario(propietario) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield (0, postgres_connector_1.default)(`insert into propietarios (nombre,apellidos,cif,correo,telefono,poblacion) values ('${propietario.nombre}','${propietario.apellidos}','${propietario.cif}','${propietario.correo}',${propietario.telefono},'${propietario.poblacion}') returning id`);
            try {
                const propietarioReturned = yield this.getOnePropietario(id[0].id);
                return propietarioReturned;
            }
            catch (error) {
                console.error(error);
            }
            throw new Error("No se ha podido agregar el propietario");
        });
    }
    modifyPropietario(propietario, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, postgres_connector_1.default)(`update propietarios set nombre = '${propietario.nombre}',apellidos = '${propietario.apellidos}',cif='${propietario.cif}',correo='${propietario.correo}',telefono=${propietario.telefono},poblacion ='${propietario.poblacion}' where id = ${id}`);
                return {
                    id: id,
                    nombre: propietario.nombre,
                    apellidos: propietario.apellidos,
                    cif: propietario.cif,
                    correo: propietario.correo,
                    telefono: propietario.telefono,
                    poblacion: propietario.poblacion
                };
            }
            catch (err) {
                console.error(err);
            }
            throw new Error("No se ha podido modificar el propietario");
        });
    }
    deletePropietario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, postgres_connector_1.default)(`delete from propietarios where id = ${id}`);
                return this.getAllPropietarios();
            }
            catch (err) {
                console.error(err);
            }
            throw new Error("No se ha podido borrar el propietario.");
        });
    }
}
exports.default = PropietariosRepositoryPostgres;
