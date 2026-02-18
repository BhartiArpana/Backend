const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts',
        required:[true,'postId required for like a post']
    },
    userId:{
        type:String,
        required:[true,'userId required for like a post']
    }
},{
    timestamps:true
})

likeSchema.index({postId:1,userId:1},{unique:true})

const likeModel = mongoose.model('likes',likeSchema)

module.exports = likeModel