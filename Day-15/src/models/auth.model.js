const mongoose = require('mongoose')
const authSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"User already exist."],
        required:[true,"Usename is required"]
    },
    email:{
        type:String,
        unique:[true,"Email already exist."],
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:String,
    profileImage:{
        type:String
    }
})

const authModel = mongoose.model('users',authSchema)
module.exports = authModel