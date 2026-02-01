const mongoose = require('mongoose')

function conncetToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to DB');
        
    })
}

module.exports = conncetToDb