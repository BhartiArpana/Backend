// server ko start krte h 
// database se connect krte h

const app = require('./src/app')
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect('')
    .then(()=>{
        console.log('connect to DB');
        
    })
}
connectToDb()
app.listen(3000,(req,res)=>{
   console.log('server is running on port 3000');
   
})
