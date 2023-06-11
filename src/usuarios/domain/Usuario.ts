export default interface Usuario {
  id?: Number;
  nombre?: string;
  apellidos?: string;
  cif: string;
  correo?: string;
  telefono?: number;
  contraseña?: string;
  rol?: "administrador" | "trabajador";
}
