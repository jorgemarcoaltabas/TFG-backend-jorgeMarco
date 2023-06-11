import Propietario from "../domain/Propietarios";
import PropietariosRepository from "../domain/Propietarios.repository";

export default class PropietarioUseCases{
    propietarioRepository:PropietariosRepository;

    constructor(propietarioRepository:PropietariosRepository){
        this.propietarioRepository = propietarioRepository;
    }

    async getAllPropietarios():Promise<Propietario[]>{
        const propietario:Propietario[] = await this.propietarioRepository.getAllPropietarios();

        return propietario;
    }
    async getOnePropietario(id:Number):Promise<Propietario>{
        const propietario:Propietario = await this.propietarioRepository.getOnePropietario(id);
        return propietario;
    }
    async addPropietario(propietario:Propietario):Promise<Propietario>{
        const propietarioAñadir:Propietario = await this.propietarioRepository.addPropietario(propietario)
        return propietarioAñadir;
    }
    async modifyPropietario(propietario:Propietario, id:Number):Promise<Propietario>{
        const propietarioModificar:Propietario = await this.propietarioRepository.modifyPropietario(propietario,id)
        return propietarioModificar;
    }
    async deletePropietario(id:Number):Promise<Propietario[]>{
        const propietario:Propietario[] = await this.propietarioRepository.deletePropietario(id)
        return propietario;
    }
}