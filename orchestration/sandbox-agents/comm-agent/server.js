import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))

app.get('/comm',(req,res)=>{
    req.send('Comm-agent')
})

app.listen(4001,()=>{
    console.log('server running on port 4001')
})