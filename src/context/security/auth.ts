import { NextFunction, Request, Response } from "express";

import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import Usuario from "../../usuarios/domain/Usuario";
import Message from "../responses/Message";
const SECRET_KEY: Secret = "mySecretKey";

const createToken = (usuario: Usuario): string => {
  const payload = {
    usuario: {
      id: usuario.id,
      cif:usuario.cif,
      rol: usuario.rol,
    },
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1 days" });
};

const isAuth = (req: Request, response: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];
    if (token) {
      const decoded: any = jwt.verify(token, SECRET_KEY);
      req.body.auth = decoded.usuario;
      next();
    }
  } catch (err) {
    console.error(err);
    const message: Message = {
      text: "No autorizado",
    };
    response.status(401).json(message);
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.auth.rol && req.body.auth.rol == "administrador") {
      next();
    }
  } catch (err) {
    console.error(err);
  }
};

export { createToken, isAuth, isAdmin };
