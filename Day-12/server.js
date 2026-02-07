const dotenv = require('dotenv').config()
const app = require('./src/app')
const mongoose = require('mongoose')
const conncetToDb = require('./src/config/database')

conncetToDb()

app.listen(3000,()=>{
    console.log('server is running on port 3000');
    
})