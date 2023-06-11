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
Object.defineProperty(exports, "__esModule", { value: true });
class PropiedadUseCases {
    constructor(propiedadRepository) {
        this.propiedadRepository = propiedadRepository;
    }
    getAllPropiedades() {
        return __awaiter(this, void 0, void 0, function* () {
            const propiedad = yield this.propiedadRepository.getAllPropiedades();
            return propiedad;
        });
    }
    getOnePropiedad(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const propiedad = yield this.propiedadRepository.getOnePropiedad(id);
            return propiedad;
        });
    }
    addPropiedad(propiedad) {
        return __awaiter(this, void 0, void 0, function* () {
            const añadirPropiedad = yield this.propiedadRepository.addPropiedad(propiedad);
            return añadirPropiedad;
        });
    }
    modifyPropiedad(propiedad, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const modificarPropiedad = yield this.propiedadRepository.modifyPropiedad(propiedad, id);
            return modificarPropiedad;
        });
    }
    deletePropiedad(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const propiedad = yield this.propiedadRepository.deletePropiedad(id);
            return propiedad;
        });
    }
}
exports.default = PropiedadUseCases;
