import express from "express";
import runGraph from "./ai/graph.ai.js";

const app = express()
app.post('/',async(req,res)=>{
    const result = await runGraph("write a code for find factorial in js ")
    res.send(result)
})

export default app