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
class PropiedadesRepositoryPostgres {
    getAllPropiedades() {
        return __awaiter(this, void 0, void 0, function* () {
            const propiedadesDB = yield (0, postgres_connector_1.default)(`select * from propiedades`);
            const propiedades = [];
            for (const value of propiedadesDB) {
                const nuevaPropiedad = {
                    id: value.id,
                    direccion: value.direccion,
                    catastro: value.catastro,
                    municipio: value.municipio,
                    codigo_postal: value.codigo_postal,
                    estado: value.estado
                };
                propiedades.push(nuevaPropiedad);
            }
            return propiedades;
        });
    }
    getOnePropiedad(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const propiedadDB = yield (0, postgres_connector_1.default)(`select * from propiedades where id = ${id}`);
            if (propiedadDB.length > 0) {
                const propiedad = {
                    id: propiedadDB[0].id,
                    direccion: propiedadDB[0].direccion,
                    catastro: propiedadDB[0].catastro,
                    municipio: propiedadDB[0].municipio,
                    codigo_postal: propiedadDB[0].codigo_postal,
                    estado: propiedadDB[0].estado
                };
                return propiedad;
            }
            throw new Error("No se ha podido recuperar la propiedad.");
        });
    }
    addPropiedad(propiedad) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(propiedad);
            const id = yield (0, postgres_connector_1.default)(`insert into propiedades (direccion,catastro,municipio,codigo_postal,estado) values ('${propiedad.direccion}','${propiedad.catastro}','${propiedad.municipio}',${propiedad.codigo_postal},'${propiedad.estado}') RETURNING id`);
            try {
                const propiedadReturned = yield this.getOnePropiedad(id[0].id);
                return propiedadReturned;
            }
            catch (err) {
                console.error(err);
            }
            throw new Error("No se ha podido añadir la propiedad.");
        });
    }
    modifyPropiedad(propiedad, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, postgres_connector_1.default)(`update propiedades set direccion = '${propiedad.direccion}',catastro = '${propiedad.catastro}',municipio = '${propiedad.municipio}',codigo_postal = ${propiedad.codigo_postal},estado = '${propiedad.estado}',`);
                return {
                    id: id,
                    direccion: propiedad.direccion,
                    catastro: propiedad.catastro,
                    municipio: propiedad.municipio,
                    codigo_postal: propiedad.codigo_postal,
                    estado: propiedad.estado
                };
            }
            catch (err) {
                console.error(err);
            }
            throw new Error("No se ha podido modificar la propiedad.");
        });
    }
    deletePropiedad(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, postgres_connector_1.default)(`delete from propietarios where id  = ${id}`);
                return this.getAllPropiedades();
            }
            catch (err) {
                console.error(err);
            }
            throw new Error("No se ha podido borrar la propiedad.");
        });
    }
}
exports.default = PropiedadesRepositoryPostgres;
