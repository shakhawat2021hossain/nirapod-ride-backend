import express, { Request, Response } from "express"
import { router } from "./app/routes"
import cors from "cors"
import { notFound } from "./app/middleware/notFound"
import { globalErrHandler } from "./app/middleware/globalErrHandler"

const app = express()

// middleware
app.use(cors())
app.use(express.json())

app.get('/', async(req: Request, res: Response) =>{
    res.json({
        message: "Hello from Server"
    })
})

app.use("/api/v1", router)


// global error handler
app.use(globalErrHandler)

// not found
app.use(notFound)

export default app;