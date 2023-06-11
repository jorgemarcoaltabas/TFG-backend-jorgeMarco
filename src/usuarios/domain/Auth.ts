import Usuario from "./Usuario";

export default interface Auth {
  usuario: Usuario;
  token: string;
}
