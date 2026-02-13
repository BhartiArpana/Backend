const express = require('express')
const postRouter = express.Router()
const postContoller = require('../controllers/post.controllers')
const multer = require('multer')
const upload = multer({storage:multer.memoryStorage()})

postRouter.post('/',upload.single("image"),postContoller.createPostController)

module.exports = postRouter