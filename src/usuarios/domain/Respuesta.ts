import Usuario from "./Usuario";

export default interface Respuesta{
    status: 200 | 400 | 404,
    usuario?: Usuario
}