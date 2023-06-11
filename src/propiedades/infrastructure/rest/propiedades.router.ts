import express, { Request,Response } from 'express'
import PropiedadesRepositoryPostgres from '../db/propiedades.postgres'
import Propiedad from '../../domain/Propiedades'
import PropiedadesRepository from '../../domain/Propietarios.repository'
import PropiedadUseCases from '../../application/propiedades.usecases'
import { isAuth, isAdmin } from '../../../context/security/auth'

const router = express.Router();
const propiedadesRepository:PropiedadesRepository = new PropiedadesRepositoryPostgres();
const propiedadesUseCases: PropiedadUseCases = new PropiedadUseCases(propiedadesRepository)

router.get("/getAll",isAuth,isAdmin,async (req: Request,res:Response)=>{
    try{
        const propiedades: Propiedad[] = await propiedadesUseCases.getAllPropiedades()
        res.json(propiedades);
    }catch(err){
        console.error(err);
    }
})

router.get("/getOnePropiedad/:id",async(req:Request,res:Response)=>{
    try{
        const propiedad: Propiedad = await propiedadesUseCases.getOnePropiedad(Number(req.params.id))
        res.json(propiedad)
    }catch(err){
        console.error(err);
    }
})

router.post("/addPropiedad",async (req:Request,res:Response)=>{
    try{
        const propiedad:Propiedad = {
                direccion:req.body.direccion,
                catastro:req.body.catastro,
                municipio:req.body.municipio,
                codigo_postal:req.body.codigo_postal,
                estado:req.body.estado,
                clave:req.body.clave,
                actividad:req.body.actividad
        }
        const nuevaPropiedad:Propiedad = await propiedadesUseCases.addPropiedad(propiedad)
        res.json(nuevaPropiedad)
    }catch(err){
        console.error(err);
    }
})

router.put("/modifyPropiedad/:id",async (req: Request,res: Response)=>{
    try{
        const propiedad:Propiedad = {
                direccion:req.body.direccion,
                catastro:req.body.catastro,
                municipio:req.body.municipio,
                codigo_postal:req.body.codigo_postal,
                estado:req.body.estado,
                clave:req.body.clave,
                actividad:req.body.actividad
        }
        const propiedadModificada:Propiedad = await propiedadesUseCases.modifyPropiedad(propiedad,Number(req.params.id))
        res.json(propiedadModificada)
    }catch(err){
        console.error(err);
    }
})

router.delete("/deletePropiedad/:id", async (req:Request,res:Response)=>{
    try{
        const propiedad:Propiedad[] = await propiedadesUseCases.deletePropiedad(Number(req.params.id))
        res.json(propiedad)
    }catch(err){
        console.error(err);
    }
})

export { router as routerPropiedades}