const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:String,
    postImg:{
        type:String,
        required:[true,"image url required for creating a post"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"UserId required for creating an object"]
    }
})

const postModel = mongoose.model('posts',postSchema)
module.exports = postModel