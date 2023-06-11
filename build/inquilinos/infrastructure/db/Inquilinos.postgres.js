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
class InquilinosRepositoryPostgres {
    getAllInquilinos() {
        return __awaiter(this, void 0, void 0, function* () {
            const inquilinosDB = yield (0, postgres_connector_1.default)("SELECT * FROM inquilinos");
            const inquilinos = [];
            for (const value of inquilinosDB) {
                const nuevoInquilino = {
                    id: value.id,
                    nombre: value.nombre,
                    apellidos: value.apellidos,
                    cif: value.cif,
                    correo: value.correo,
                    telefono: value.telefono,
                    poblacion: value.poblacion
                };
                inquilinos.push(nuevoInquilino);
            }
            return inquilinos;
        });
    }
    getOneInquilino(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const InquilinoDB = yield (0, postgres_connector_1.default)(`SELECT * FROM inquilinos where id = ` + id);
            if (InquilinoDB.length > 0) {
                const Inquilino = {
                    id: InquilinoDB[0].id,
                    nombre: InquilinoDB[0].nombre,
                    apellidos: InquilinoDB[0].apellidos,
                    cif: InquilinoDB[0].cif,
                    correo: InquilinoDB[0].correo,
                    telefono: InquilinoDB[0].telefono,
                    poblacion: InquilinoDB[0].poblacion
                };
                return Inquilino;
            }
            throw new Error("No se ha podiddo recuperar el Inquilino");
        });
    }
    addInquilino(Inquilino) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield (0, postgres_connector_1.default)(`insert into inquilinos (nombre,apellidos,cif,correo,telefono,poblacion) values ('${Inquilino.nombre}','${Inquilino.apellidos}','${Inquilino.cif}','${Inquilino.correo}',${Inquilino.telefono},'${Inquilino.poblacion}') returning id`);
            try {
                const InquilinoReturned = yield this.getOneInquilino(id[0].id);
                return InquilinoReturned;
            }
            catch (error) {
                console.error(error);
            }
            throw new Error("No se ha podido agregar el Inquilino");
        });
    }
    modifyInquilino(Inquilino, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, postgres_connector_1.default)(`update inquilinos set nombre = '${Inquilino.nombre}',apellidos = '${Inquilino.apellidos}',cif='${Inquilino.cif}',correo='${Inquilino.correo}',telefono=${Inquilino.telefono},poblacion ='${Inquilino.poblacion}' where id = ${id}`);
                return {
                    id: id,
                    nombre: Inquilino.nombre,
                    apellidos: Inquilino.apellidos,
                    cif: Inquilino.cif,
                    correo: Inquilino.correo,
                    telefono: Inquilino.telefono,
                    poblacion: Inquilino.poblacion
                };
            }
            catch (err) {
                console.error(err);
            }
            throw new Error("No se ha podido modificar el Inquilino");
        });
    }
    deleteInquilino(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, postgres_connector_1.default)(`delete from inquilinos where id = ${id}`);
                return this.getAllInquilinos();
            }
            catch (err) {
                console.error(err);
            }
            throw new Error("No se ha podido borrar el Inquilino.");
        });
    }
}
exports.default = InquilinosRepositoryPostgres;
