import express from 'express'
import morgan from 'morgan'

const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    const response = {
        'name': 'john',
        'age': 30,
        'city': 'New York'
    }
    res.status(200).json({
        message: 'Data fetched successfully',
        data: response
    })
})

app.listen(3001,()=>{
    console.log('Server is running on port 3001')
})