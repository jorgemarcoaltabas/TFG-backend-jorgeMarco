import express, { Request, Response } from "express";

import UsuariosUseCases from "../../application/usuarios.usecases"
import UsuarioRepository from "../../domain/Usuarios.repository";
import UsuariosRepositoryPostgres from "../../infrastructure/db/usuarios.repository.postgres"

import Usuario from "../../domain/Usuario";
import Auth from "../../domain/Auth";
import Message from "../../../context/responses/Message";
import { isAdmin, isAuth } from "../../../context/security/auth";

const router = express.Router();

const usuariosRepository: UsuarioRepository = new UsuariosRepositoryPostgres();
const usuariosUseCases: UsuariosUseCases = new UsuariosUseCases(usuariosRepository);

router.post("/iniciarSesion", async(req:Request ,res:Response)=>{
    console.log(req.body.cif);
    
    try{
        const usuario:Usuario = {
            cif: req.body.cif,
            contraseña: req.body.contraseña
        }
        
        const iniciarSesion = await usuariosUseCases.iniciarSesion(usuario)
        if(iniciarSesion.status === 200 && !!iniciarSesion.usuario){
            usuario.id = iniciarSesion.usuario.id
            usuario.rol = iniciarSesion.usuario.rol
            usuario.nombre = iniciarSesion.usuario.nombre
            const token: Auth = usuariosUseCases.createToken(usuario)
            res.json(token)
        }else if(iniciarSesion.status === 404){
            const message: Message = {
                text: "Autentificacion fallida"
            }
            res.status(404).send(message)
        }else if(iniciarSesion.status === 400){
            const message:Message = {
                text:"Informacion insuficiente"
            }
            res.status(400).send(message)
        }
    }catch (error){
        const message: Message = {
            text: String(error)
        };
        res.status(500).send(message)
    }
})
router.post("/registrar", async (req:Request,res:Response)=>{
    try{
        const usuario:Usuario = {
            nombre:req.body.nombre,
            apellidos:req.body.apellidos,
            cif:req.body.cif,
            correo:req.body.correo,
            telefono:req.body.telefono,
            contraseña:req.body.contraseña,
            rol:req.body.rol
        }
        const result: Auth | Message = await usuariosUseCases.registrar(usuario)
        res.json(result)
    }catch(err){
        const message:Message = {
            text:String(err)
        }
        res.status(500).send(message)
    }
})
router.get("/getOneUsuario/:id",isAuth,async (req:Request,res:Response)=>{
    try{
        const usuario:Usuario = await usuariosUseCases.getUsuario(Number(req.params.id))
        res.json(usuario)
    }catch(err){
        console.error(err);
    }
})
export { router as routerUsuarios }