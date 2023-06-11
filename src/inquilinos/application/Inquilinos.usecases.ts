import Inquilino from "../domain/Inquilinos";
import InquilinosRepository from "../domain/Inquilinos.repository";

export default class InquilinosUseCases{
    inquilinosRepository:InquilinosRepository;

    constructor(inquilinosRepository:InquilinosRepository){
        this.inquilinosRepository = inquilinosRepository;
    }

    async getAllInquilinos():Promise<Inquilino[]>{
        const inquilino:Inquilino[] = await this.inquilinosRepository.getAllInquilinos();

        return inquilino;
    }
    async getOneInquilino(id:Number):Promise<Inquilino>{
        const inquilino:Inquilino = await this.inquilinosRepository.getOneInquilino(id);
        return inquilino;
    }
    async addInquilino(inquilino:Inquilino):Promise<Inquilino>{
        const inquilinoAñadir:Inquilino = await this.inquilinosRepository.addInquilino(inquilino)
        return inquilinoAñadir;
    }
    async modifyInquilino(inquilino:Inquilino, id:Number):Promise<Inquilino>{
        const inquilinoModificar:Inquilino = await this.inquilinosRepository.modifyInquilino(inquilino,id)
        return inquilinoModificar;
    }
    async deleteInquilino(id:Number):Promise<Inquilino[]>{
        const inquilino:Inquilino[] = await this.inquilinosRepository.deleteInquilino(id)
        return inquilino;
    }
}