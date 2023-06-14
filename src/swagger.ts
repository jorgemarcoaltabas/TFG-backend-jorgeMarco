import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { Request, Response } from "express"

const options = {
    definition: {
        openapi: "3.0.0",
        info:{title:"TFG-JorgeMarco",version:"1.0.0"},
    },
    apis:["./usuarios/infrastructure/rest/usuarios.router", "./inquilinos/infrastructure/rest/inquilinos.router","./propiedades/infrastructure/rest/propiedades.router","./propietarios/infrastructure/rest/propietarios.router"]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app:any,port:any) => {
    app.use('/api/docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get("/api/docs.json", (req:Request,res:Response) => {
        res.setHeader("Content-Type","application/json")
        res.send(swaggerSpec)
    })
}

export{swaggerDocs}