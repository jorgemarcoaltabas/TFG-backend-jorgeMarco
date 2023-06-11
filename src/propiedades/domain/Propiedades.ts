export default interface Propiedad {
  id?: Number;
  direccion: string;
  catastro: string;
  municipio: string;
  codigo_postal: number;
  estado: "activo" | "inactivo";
  clave:string;
  actividad:"venta" | "alquiler";
}
