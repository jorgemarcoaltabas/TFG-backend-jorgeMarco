import Message from "../../context/responses/Message";
import { createToken } from "../../context/security/auth";
import Auth from "../domain/Auth";
import Usuario from "../domain/Usuario";
import UsuarioRepository from "../domain/Usuarios.repository";
import Respuesta from "../domain/Respuesta";

export default class UsuariosUseCases {
  usuarioRepository: UsuarioRepository;

  constructor(usuarioRepository: UsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }
  async iniciarSesion(usuario: Usuario): Promise<Respuesta> {
    return await this.usuarioRepository.iniciarSesion(usuario);
  }
  async registrar(usuario: Usuario): Promise<Message> {
    return await this.usuarioRepository.registrar(usuario);
  }
  async getUsuario(idUsuario: Number): Promise<Usuario> {
    return this.usuarioRepository.getUsuario(idUsuario)
  }
  getAllUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.getAllUsuarios();
  }
  createToken(usuario: Usuario): Auth {
    const auth: Auth = {
      usuario: {
        id:usuario.id,
        nombre:usuario.nombre,
        cif: usuario.cif,
        rol:usuario.rol,
      },
      token: createToken(usuario)
    };
    return auth;
  }
}
