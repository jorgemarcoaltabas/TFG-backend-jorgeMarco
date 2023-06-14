import express, { Request, Response } from 'express';
import InquilinosRepositoryPostgres from '../db/Inquilinos.postgres';
import Inquilino from '../../domain/Inquilinos';
import InquilinosRepository from '../../domain/Inquilinos.repository';
import InquilinosUseCases from '../../application/Inquilinos.usecases'

const router = express.Router();
const inquilinosRepository: InquilinosRepository = new InquilinosRepositoryPostgres();
const inquilinosUseCases: InquilinosUseCases = new InquilinosUseCases(inquilinosRepository)

router.get("/getAll",async(req:Request, res:Response)=>{
    try{
        const inquilinos: Inquilino[]=await inquilinosUseCases.getAllInquilinos()
        res.json(inquilinos)
    }catch(err){
        console.error(err);
    }
})

router.get("/getOneInquilino/:id",async(req:Request,res:Response)=>{
    try{
        const inquilinos: Inquilino = await inquilinosUseCases.getOneInquilino(Number(req.params.id));
        res.json(inquilinos)
    }catch(err){
        console.error(err);
    }
})
router.post("/addInquilino",async(req:Request,res:Response)=>{
    try{
        const inquilinos:Inquilino={
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                cif: req.body.cif,
                correo: req.body.correo,
                telefono: req.body.telefono,
                poblacion: req.body.poblacion
        }
        const nuevoInquilino:Inquilino = await inquilinosUseCases.addInquilino(inquilinos)
        res.json(nuevoInquilino)
    }catch(err){
        console.error(err);
    }
})
router.put("/modifyInquilino/:id",async (req:Request,res:Response)=>{
    try{
        const inquilinos:Inquilino = {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                cif: req.body.cif,
                correo: req.body.correo,
                telefono: req.body.telefono,
                poblacion: req.body.poblacion
        }
        const InquilinoModificado:Inquilino = await inquilinosUseCases.modifyInquilino(inquilinos, Number(req.params.id))
        res.json(InquilinoModificado)
    }catch(err){
        console.error(err);
    }
})
router.delete("/deleteInquilino/:id",async (req:Request,res:Response)=>{
    try{
        const inquilinos:Inquilino[] = await inquilinosUseCases.deleteInquilino(Number(req.params.id))
        res.json(inquilinos)
    }catch(err){
        console.error(err);
    }
})
export { router as routerInquilinos }