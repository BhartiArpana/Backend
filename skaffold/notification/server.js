import express from 'express'
import morgan from 'morgan'
import axios from 'axios'

const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.get('/',async(req,res)=>{
    let response = await axios.get('http://core-service')
    res.status(200).json(response.data)
})

app.listen(5000,()=>{
    console.log(`server running at port 5000`)
})