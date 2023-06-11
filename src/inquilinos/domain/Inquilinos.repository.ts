import Inquilino from "./Inquilinos";

export default interface InquilinosRepository{
    getAllInquilinos(): Promise<Inquilino[]>
    getOneInquilino(id : Number): Promise<Inquilino>
    addInquilino(inquilino: Inquilino): Promise<Inquilino>
    modifyInquilino(inquilino : Inquilino , id : Number) : Promise<Inquilino> 
    deleteInquilino(id: Number) : Promise<Inquilino[]>
}