export default interface Propiedad {
  id?: Number;
  direccion: string;
  catastro: string;
  municipio: string;
  codigo_postal: number;
  actividad?:"venta" | "alquiler"
  estado?: "activo" | "inactivo";
}
