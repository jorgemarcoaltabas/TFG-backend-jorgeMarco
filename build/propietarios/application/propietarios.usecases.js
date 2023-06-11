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
class PropietarioUseCases {
    constructor(propietarioRepository) {
        this.propietarioRepository = propietarioRepository;
    }
    getAllPropietarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const propietario = yield this.propietarioRepository.getAllPropietarios();
            return propietario;
        });
    }
    getOnePropietario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const propietario = yield this.propietarioRepository.getOnePropietario(id);
            return propietario;
        });
    }
    addPropietario(propietario) {
        return __awaiter(this, void 0, void 0, function* () {
            const propietarioAñadir = yield this.propietarioRepository.addPropietario(propietario);
            return propietarioAñadir;
        });
    }
    modifyPropietario(propietario, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const propietarioModificar = yield this.propietarioRepository.modifyPropietario(propietario, id);
            return propietarioModificar;
        });
    }
    deletePropietario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const propietario = yield this.propietarioRepository.deletePropietario(id);
            return propietario;
        });
    }
}
exports.default = PropietarioUseCases;
