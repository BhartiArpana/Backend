import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))

app.get('/sandbox',(req,res)=>{
    res.send('Sandbox')
})


app.listen(4000,()=>{
    console.log('server running on port 4000')
})