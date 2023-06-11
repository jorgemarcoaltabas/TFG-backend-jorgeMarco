import Propietario from "./Propietarios";

export default interface PropietariosRepository{
    getAllPropietarios():Promise<Propietario[]>
    getOnePropietario(id: Number):Promise<Propietario>
    addPropietario(propietario: Propietario):Promise<Propietario>
    modifyPropietario(propietario:Propietario, id: Number): Promise<Propietario>
    deletePropietario(id:Number):Promise<Propietario[]>
}