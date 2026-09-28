import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.get('/core',(req,res)=>{
    let sum = 0
    for(let i=0;i<1000000000;i++){
        sum += i
    }
    res.status(200).json({message:'Hello World', sum})
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})