import express, { Request, Response } from 'express';
import PropietariosRepositoryPostgres from '../db/propietarios.postgres';
import Propietario from '../../domain/Propietarios';
import PropietariosRepository from '../../domain/Propietarios.repository';
import PropietarioUseCases from '../../application/propietarios.usecases';

const router = express.Router();
const propietariosRepository: PropietariosRepository = new PropietariosRepositoryPostgres();
const propietariosUseCases: PropietarioUseCases = new PropietarioUseCases(propietariosRepository)

router.get("/getAll",async(req:Request, res:Response)=>{
    try{
        const propietarios: Propietario[]=await propietariosUseCases.getAllPropietarios()
        res.json(propietarios)
    }catch(err){
        console.error(err);
    }
})

router.get("/getOnePropietario/:id",async(req:Request,res:Response)=>{
    try{
        const propietario: Propietario = await propietariosRepository.getOnePropietario(Number(req.params.id));
        res.json(propietario)
    }catch(err){
        console.error(err);
    }
})
router.post("/addPropietario",async(req:Request,res:Response)=>{
    try{
        const propietario:Propietario={
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                cif: req.body.cif,
                correo: req.body.correo,
                telefono: req.body.telefono,
                poblacion: req.body.poblacion,
                direccion: req.body.direccion
        }
        const nuevoPropietario:Propietario = await propietariosUseCases.addPropietario(propietario)
        res.json(nuevoPropietario)
    }catch(err){
        console.error(err);
    }
})
router.put("/modifyPropietario/:id",async (req:Request,res:Response)=>{
    try{
        const propietario:Propietario = {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                cif: req.body.cif,
                correo: req.body.correo,
                telefono: req.body.telefono,
                poblacion: req.body.poblacion,
                direccion: req.body.direccion
        }
        const propietarioModificado:Propietario = await propietariosUseCases.modifyPropietario(propietario, Number(req.params.id))
        res.json(propietarioModificado)
    }catch(err){
        console.error(err);
    }
})
router.delete("/deletePropietario/:id",async (req:Request,res:Response)=>{
    try{
        const propietario:Propietario[] = await propietariosUseCases.deletePropietario(Number(req.params.id))
        res.json(propietario)
    }catch(err){
        console.error(err);
    }
})
export { router as routerPropietarios }