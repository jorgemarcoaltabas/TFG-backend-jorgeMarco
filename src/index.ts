//imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//routers
import {routerUsuarios} from "./usuarios/infrastructure/rest/usuarios.router"
import {routerPropietarios} from "./propietarios/infrastructure/rest/propietarios.router"
import { routerInquilinos } from "./inquilinos/infrastructure/rest/Inquilinos.router";
import { routerPropiedades } from "./propiedades/infrastructure/rest/propiedades.router";

dotenv.config();

const app = express();
const port = process.env.PORT;
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
//middlewares
app.use(express.json());
app.use(cors(corsOptions))


app.use("/api/usuarios",routerUsuarios);
app.use("/api/propietarios",routerPropietarios)
app.use("/api/inquilinos",routerInquilinos)
app.use("/api/propiedades",routerPropiedades)
//portListener
app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${port}`);
  });
//
    /*"test": "react-scripts test",*/
export { app };
