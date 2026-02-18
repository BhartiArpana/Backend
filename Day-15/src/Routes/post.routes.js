const express = require('express')
const postRouter = express.Router()
const postContoller = require('../controllers/post.controllers')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require('../middlewares/auth.middleware')


// /api/post/
postRouter.post('/',upload.single("postImg"),identifyUser,postContoller.createPostController)

// /api/post
postRouter.get('/',identifyUser,postContoller.getPostController)

// /api/post/details/postId
postRouter.get('/details/:postId',identifyUser,postContoller.getPostDetailsController)

// /api/post/like/postId
postRouter.post('/like/:postId',identifyUser,postContoller.likePostController)

module.exports = postRouter