const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors  = require('cors')



// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        credentials:true,
        origin:'http://localhost:5173'
    }
))

// require routes
const authRouter = require('./Routes/auth.routes')
const postRouter = require('./Routes/post.routes')
const userRouter = require('./Routes/user.routes')
const pendingRouter = require('./Routes/pending.routes')

// use routes
app.use('/api/auth',authRouter)
app.use('/api/post',postRouter)
app.use('/api/user',userRouter)
app.use('/api/user',pendingRouter)


module.exports = app