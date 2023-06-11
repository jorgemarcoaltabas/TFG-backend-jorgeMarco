import Propiedad from "../domain/Propiedades";
import PropiedadesRepository from "../domain/Propietarios.repository";

export default class PropiedadUseCases{
    propiedadRepository:PropiedadesRepository;

    constructor(propiedadRepository:PropiedadesRepository){
        this.propiedadRepository = propiedadRepository;
    }

    async getAllPropiedades():Promise<Propiedad[]>{
        const propiedad:Propiedad[] = await this.propiedadRepository.getAllPropiedades()

        return propiedad;
    }
    async getOnePropiedad(id:Number):Promise<Propiedad>{
        const propiedad:Propiedad = await this.propiedadRepository.getOnePropiedad(id)
        return propiedad;
    }
    async addPropiedad(propiedad:Propiedad):Promise<Propiedad>{
        const añadirPropiedad:Propiedad = await this.propiedadRepository.addPropiedad(propiedad)
        return añadirPropiedad;
    }
    async modifyPropiedad(propiedad:Propiedad,id:Number):Promise<Propiedad>{
        const modificarPropiedad:Propiedad = await this.propiedadRepository.modifyPropiedad(propiedad,id)
        return modificarPropiedad;
    }
    async deletePropiedad(id:Number):Promise<Propiedad[]>{
        const propiedad:Propiedad[] = await this.propiedadRepository.deletePropiedad(id)
        return propiedad;
    }
}