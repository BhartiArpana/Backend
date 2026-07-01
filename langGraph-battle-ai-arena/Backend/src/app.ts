import express from "express";
import runGraph from "./ai/graph.ai.js";
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST'],
    credentials:true
}))
app.post('/',async(req,res)=>{
    const result = await runGraph("write a code for find factorial in js ")
    res.send(result)
})

app.post('/invoke',async(req,res)=>{
    const {message} = req.body
    const result = await runGraph(message)
    res.status(200).json({
        message:"Responses : ",
        result
    })
})

export default app