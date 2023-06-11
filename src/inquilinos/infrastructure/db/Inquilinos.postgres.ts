import executeQuery from "../../../context/db/postgres.connector";
import Inquilino from "../../domain/Inquilinos";
import InquilinosRepository from "../../domain/Inquilinos.repository";

export default class InquilinosRepositoryPostgres implements InquilinosRepository{
    async getAllInquilinos(): Promise<Inquilino[]> {
        const inquilinosDB: any[] = await executeQuery("SELECT * FROM inquilinos")

        const inquilinos: Inquilino[] = [];
        for(const value of inquilinosDB){
            const nuevoInquilino:Inquilino = {
                id: value.id,
                nombre: value.nombre,
                apellidos: value.apellidos,
                cif: value.cif,
                correo: value.correo,
                telefono: value.telefono,
                poblacion: value.poblacion
            }
            inquilinos.push(nuevoInquilino)
        }
        return inquilinos;
    }
    async getOneInquilino(id: Number): Promise<Inquilino> {
        const InquilinoDB: any[] = await executeQuery(`SELECT * FROM inquilinos where id = ` + id)
        if(InquilinoDB.length > 0 ){
            const Inquilino:Inquilino = {
                id: InquilinoDB[0].id,
                nombre: InquilinoDB[0].nombre,
                apellidos: InquilinoDB[0].apellidos,
                cif: InquilinoDB[0].cif,
                correo: InquilinoDB[0].correo,
                telefono: InquilinoDB[0].telefono,
                poblacion: InquilinoDB[0].poblacion
            }
            return Inquilino;
        }
        throw new Error("No se ha podiddo recuperar el Inquilino")
    }
    async addInquilino(Inquilino: Inquilino): Promise<Inquilino> {
        const id: any[] = await executeQuery(`insert into inquilinos (nombre,apellidos,cif,correo,telefono,poblacion) values ('${Inquilino.nombre}','${Inquilino.apellidos}','${Inquilino.cif}','${Inquilino.correo}',${Inquilino.telefono},'${Inquilino.poblacion}') returning id`)
        try{
            const InquilinoReturned: Inquilino = await this.getOneInquilino(id[0].id)
            return InquilinoReturned;
        }catch(error){
            console.error(error);
        }
        throw new Error("No se ha podido agregar el Inquilino")
    }
    async modifyInquilino(Inquilino: Inquilino, id: Number): Promise<Inquilino> {
        try{
            await executeQuery(`update inquilinos set nombre = '${Inquilino.nombre}',apellidos = '${Inquilino.apellidos}',cif='${Inquilino.cif}',correo='${Inquilino.correo}',telefono=${Inquilino.telefono},poblacion ='${Inquilino.poblacion}' where id = ${id}`)
            return{
                id: id,
                nombre: Inquilino.nombre,
                apellidos: Inquilino.apellidos,
                cif: Inquilino.cif,
                correo: Inquilino.correo,
                telefono: Inquilino.telefono,
                poblacion: Inquilino.poblacion
            }
        }catch(err){
            console.error(err);
        }
        throw new Error("No se ha podido modificar el Inquilino");
    }
    async deleteInquilino(id: Number): Promise<Inquilino[]> {
        try{
            await executeQuery(`delete from inquilinos where id = ${id}`)
            return this.getAllInquilinos();
        }catch(err){
            console.error(err);
        }
        throw new Error("No se ha podido borrar el Inquilino.");
    }
}