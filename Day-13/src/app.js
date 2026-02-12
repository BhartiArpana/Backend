const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const userRouter=require('./routes/user.route')

app.use(express.json())
app.use('/api/auth',userRouter)
app.use(cookieParser)
module.exports = app