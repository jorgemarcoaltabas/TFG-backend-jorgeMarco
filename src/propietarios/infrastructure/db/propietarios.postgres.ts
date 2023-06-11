import executeQuery from "../../../context/db/postgres.connector";
import Propietario from "../../domain/Propietarios";
import PropietariosRepository from "../../domain/Propietarios.repository";

export default class PropietariosRepositoryPostgres implements PropietariosRepository{
    async getAllPropietarios(): Promise<Propietario[]> {
        const propietariosDB: any[] = await executeQuery("SELECT * FROM propietarios")

        const propietarios: Propietario[] = [];
        for(const value of propietariosDB){
            const nuevoPropietario:Propietario = {
                id: value.id,
                nombre: value.nombre,
                apellidos: value.apellidos,
                cif: value.cif,
                correo: value.correo,
                telefono: value.telefono,
                poblacion: value.poblacion,
                direccion: value.direccion
            }
            propietarios.push(nuevoPropietario)
        }
        return propietarios;
    }
    async getOnePropietario(id: Number): Promise<Propietario> {
        const propietarioDB: any[] = await executeQuery(`SELECT * FROM propietarios where id = ` + id)
        if(propietarioDB.length > 0 ){
            const propietario:Propietario = {
                id: propietarioDB[0].id,
                nombre: propietarioDB[0].nombre,
                apellidos: propietarioDB[0].apellidos,
                cif: propietarioDB[0].cif,
                correo: propietarioDB[0].correo,
                telefono: propietarioDB[0].telefono,
                poblacion: propietarioDB[0].poblacion,
                direccion: propietarioDB[0].direccion
            }
            return propietario;
        }
        throw new Error("No se ha podiddo recuperar el propietario")
    }
    async addPropietario(propietario: Propietario): Promise<Propietario> {
        const id: any[] = await executeQuery(`insert into propietarios (nombre,apellidos,cif,correo,telefono,poblacion,direccion) values ('${propietario.nombre}','${propietario.apellidos}','${propietario.cif}','${propietario.correo}',${propietario.telefono},'${propietario.poblacion}','${propietario.direccion}') returning id`)
        try{
            const propietarioReturned: Propietario = await this.getOnePropietario(id[0].id)
            return propietarioReturned;
        }catch(error){
            console.error(error);
        }
        throw new Error("No se ha podido agregar el propietario")
    }
    async modifyPropietario(propietario: Propietario, id: Number): Promise<Propietario> {
        try{
            await executeQuery(`update propietarios set nombre = '${propietario.nombre}',apellidos = '${propietario.apellidos}',cif='${propietario.cif}',correo='${propietario.correo}',telefono=${propietario.telefono},poblacion ='${propietario.poblacion}', direccion ='${propietario.direccion}' where id = ${id}`)
            return{
                id: id,
                nombre: propietario.nombre,
                apellidos: propietario.apellidos,
                cif: propietario.cif,
                correo: propietario.correo,
                telefono: propietario.telefono,
                poblacion: propietario.poblacion,
                direccion:propietario.direccion
            }
        }catch(err){
            console.error(err);
        }
        throw new Error("No se ha podido modificar el propietario");
    }
    async deletePropietario(id: Number): Promise<Propietario[]> {
        try{
            await executeQuery(`delete from propietarios where id = ${id}`)
            return this.getAllPropietarios();
        }catch(err){
            console.error(err);
        }
        throw new Error("No se ha podido borrar el propietario.");
    }
}