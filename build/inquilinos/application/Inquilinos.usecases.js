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
class InquilinosUseCases {
    constructor(inquilinosRepository) {
        this.inquilinosRepository = inquilinosRepository;
    }
    getAllInquilinos() {
        return __awaiter(this, void 0, void 0, function* () {
            const inquilino = yield this.inquilinosRepository.getAllInquilinos();
            return inquilino;
        });
    }
    getOneInquilino(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const inquilino = yield this.inquilinosRepository.getOneInquilino(id);
            return inquilino;
        });
    }
    addInquilino(inquilino) {
        return __awaiter(this, void 0, void 0, function* () {
            const inquilinoAñadir = yield this.inquilinosRepository.addInquilino(inquilino);
            return inquilinoAñadir;
        });
    }
    modifyInquilino(inquilino, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const inquilinoModificar = yield this.inquilinosRepository.modifyInquilino(inquilino, id);
            return inquilinoModificar;
        });
    }
    deleteInquilino(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const inquilino = yield this.inquilinosRepository.deleteInquilino(id);
            return inquilino;
        });
    }
}
exports.default = InquilinosUseCases;
