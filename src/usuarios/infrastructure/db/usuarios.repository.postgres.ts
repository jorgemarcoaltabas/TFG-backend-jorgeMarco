import Message from "../../../context/responses/Message";
import Usuario from "../../domain/Usuario";

import UsuarioRepository from "../../domain/Usuarios.repository";
import executeQuery from "../../../context/db/postgres.connector"
import { compare, hash } from "../../../context/security/encrypter";
import Respuesta from "../../domain/Respuesta";

export default class UsuariosRepositoryPostgres implements UsuarioRepository{
    async registrar(usuario: Usuario): Promise<Message> {
        console.log(usuario.contraseña);
        
        if(usuario.nombre && usuario.contraseña){
            try{
                await executeQuery(`insert into usuarios (nombre,apellidos,cif,correo,telefono,contraseña) values ('${usuario.nombre}','${usuario.apellidos}','${usuario.cif}','${usuario.correo}',${usuario.telefono},'${hash(usuario.contraseña)}')`)

                const message: Message = {
                    text: 'Usuario creado correctamente'
                }
                return message;
            }catch(err){
                console.log(err)
            }
        }
        const message: Message = {
            text: 'Ha ocurrido un error con la creacion del usuario'
        }
        return message;
    }
    async iniciarSesion(usuario: Usuario): Promise<Respuesta> {
        console.log(usuario);
        
        if(usuario.cif && usuario.contraseña){
            const result: any[] = await executeQuery(`select * from usuarios where cif  = '${usuario.cif}'`)
            if(result.length >= 1 && compare(usuario.contraseña, result[0].contraseña)){
                    usuario.id = result[0].id,
                    usuario.nombre = result[0].nombre,
                    usuario.apellidos =  result[0].apellidos,
                    usuario.cif =  result[0].cif,
                    usuario.rol =  result[0].rol

                return {
                    status: 200,
                    usuario: usuario
                };
            }else{
                const message: Message = {
                    text: "Cif o contraseña incorrecta"
                }
                console.log(message);
                
                return {
                    status: 404
                }
            }
        }
        return{
            status: 400
        }
    }
    async getUsuario(idUsuario: Number): Promise<Usuario> {
        const usuarioDB: any[] = await executeQuery("SELECT id, nombre, rol, cif FROM usuarios WHERE id=" + idUsuario)

        const usuario: Usuario = {
                    id: usuarioDB[0].id,
                    nombre: usuarioDB[0].nombre,
                    apellidos: usuarioDB[0].apellidos,
                    cif: usuarioDB[0].cif,
                    telefono: usuarioDB[0].telefono,
                    contraseña: usuarioDB[0].contraseña,
                    rol:usuarioDB[0].rol
                }

                return usuario
    }
    async getAllUsuarios(): Promise<Usuario[]> {
        const usuariosDB: any[] = await executeQuery("SELECT id, nombre, rol, cif FROM usuarios")
        const usuarios: Usuario[] = [];

        usuariosDB.forEach(usuarioDB => {
            usuarios.push({
                id: usuarioDB.id,
                nombre: usuarioDB.name,
                rol: usuarioDB.role,
                cif: usuarioDB.cif
            })


        })
        return usuarios;
    }
    
}