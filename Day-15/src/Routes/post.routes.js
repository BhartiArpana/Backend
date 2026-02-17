const express = require('express')
const postRouter = express.Router()
const postContoller = require('../controllers/post.controllers')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require('../middlewares/auth.middleware')

postRouter.post('/',upload.single("postImg"),identifyUser,postContoller.createPostController)
postRouter.get('/',identifyUser,postContoller.getPostController)
postRouter.get('/details/:postId',identifyUser,postContoller.getPostDetailsController)

module.exports = postRouter