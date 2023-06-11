import Propiedad from "./Propiedades";

export default interface PropiedadesRepository{
    getAllPropiedades():Promise<Propiedad[]>
    getOnePropiedad(id:Number):Promise<Propiedad>
    addPropiedad(propiedad:Propiedad):Promise<Propiedad>
    modifyPropiedad(propiedad:Propiedad, id:Number):Promise<Propiedad>
    deletePropiedad(id:Number):Promise<Propiedad[]>
}