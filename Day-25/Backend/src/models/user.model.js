const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username required'],
        unique:[true,'username must be unique']
    },
    email:{
        type:String,
        required:[true,'email required'],
        unique:[true,'email must be unique']
    },
    password:{
        type:String,
        require:[true,'password is required'],
        select:false
    }
})

const userModel = mongoose.model('User',userSchema)

module.exports = userModel