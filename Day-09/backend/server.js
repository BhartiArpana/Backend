require('dotenv').config()
const app = require('./src/app')
const conncetToDb = require('./src/config/database')
const noteModel = require('./src/model/notes.model')


conncetToDb()


app.listen(3000,()=>{
    console.log('server is running on port 3000');
    
})