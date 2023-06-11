import Message from "../../context/responses/Message";
import Usuario from "../domain/Usuario";
import Respuesta from "./Respuesta"

export default interface UsuarioRepository {
  registrar(usuario: Usuario): Promise<Message>;
  iniciarSesion(usuario: Usuario): Promise<Respuesta>;
  getUsuario(idUsuario: Number): Promise<Usuario>;
  getAllUsuarios(): Promise<Usuario[]>;
}
