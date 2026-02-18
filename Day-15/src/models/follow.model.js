const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    follower:{
        type:String
    },
    followee:{
        type:String
    }
},{
    timestamps:true
})

userSchema.index({followee:1,follower:1}),{unique:true}

const followModel = mongoose.model('follows',userSchema)

module.exports = followModel