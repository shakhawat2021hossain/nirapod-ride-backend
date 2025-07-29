import express, { Request, Response } from "express"
const app = express()

app.get('/', async(req: Request, res: Response) =>{
    res.json({
        message: "Hello from Server"
    })
})

export default app;