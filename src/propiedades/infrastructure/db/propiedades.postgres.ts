import executeQuery from "../../../context/db/postgres.connector";
import Propiedad from "../../domain/Propiedades";
import PropiedadesRepository from "../../domain/Propietarios.repository"

export default class PropiedadesRepositoryPostgres implements PropiedadesRepository{
    async getAllPropiedades(): Promise<Propiedad[]> {
        const propiedadesDB: any[] = await executeQuery(`select * from propiedades`)
        const propiedades: Propiedad[]=[];
        for(const value of propiedadesDB){
            const nuevaPropiedad:Propiedad = {
                id:value.id,
                direccion:value.direccion,
                catastro:value.catastro,
                municipio:value.municipio,
                codigo_postal:value.codigo_postal,
                estado:value.estado,
                clave:value.clave,
                actividad:value.actividad
            }
            propiedades.push(nuevaPropiedad)
        }
        return propiedades;
    }
    async getOnePropiedad(id: Number): Promise<Propiedad> {
        const propiedadDB: any[] = await executeQuery(`select * from propiedades where id = ${id}`)
        if(propiedadDB.length>0){
            const propiedad:Propiedad = {
                id:propiedadDB[0].id,
                direccion:propiedadDB[0].direccion,
                catastro:propiedadDB[0].catastro,
                municipio:propiedadDB[0].municipio,
                codigo_postal:propiedadDB[0].codigo_postal,
                estado:propiedadDB[0].estado,
                clave:propiedadDB[0].clave,
                actividad:propiedadDB[0].actividad
            }
            return propiedad;
        }
        throw new Error("No se ha podido recuperar la propiedad.");
    }
    async addPropiedad(propiedad: Propiedad): Promise<Propiedad> {     
        const id: any[] = await executeQuery(`insert into propiedades (direccion,catastro,municipio,codigo_postal,estado,clave,actividad) values ('${propiedad.direccion}','${propiedad.catastro}','${propiedad.municipio}',${propiedad.codigo_postal},'${propiedad.estado}','${propiedad.clave}','${propiedad.actividad}') RETURNING id`)
        try{
            const propiedadReturned: Propiedad = await this.getOnePropiedad(id[0].id)
            return propiedadReturned;
        }catch(err){
            console.error(err);
        }
        throw new Error("No se ha podido añadir la propiedad.");
    }
    async modifyPropiedad(propiedad: Propiedad, id: Number): Promise<Propiedad> {
        try{
            await executeQuery(`update propiedades set direccion = '${propiedad.direccion}',catastro = '${propiedad.catastro}',municipio = '${propiedad.municipio}',codigo_postal = ${propiedad.codigo_postal},estado = '${propiedad.estado}',clave ='${propiedad.clave}',actividad='${propiedad.actividad}'`)
            return{
                id:id,
                direccion:propiedad.direccion,
                catastro:propiedad.catastro,
                municipio:propiedad.municipio,
                codigo_postal:propiedad.codigo_postal,
                estado:propiedad.estado,
                clave:propiedad.clave,
                actividad:propiedad.actividad
            }
        }catch(err){
            console.error(err);
        }
        throw new Error("No se ha podido modificar la propiedad.");
    }
    async deletePropiedad(id: Number): Promise<Propiedad[]> {
        try{
            await executeQuery(`delete from propietarios where id  = ${id}`)
            return this.getAllPropiedades();
        }catch(err){
            console.error(err);
        }
        throw new Error("No se ha podido borrar la propiedad.");
    }
}