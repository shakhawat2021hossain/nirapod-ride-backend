import express, { Request, Response } from "express"
import { router } from "./app/routes"
import cors from "cors"

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

export default app;