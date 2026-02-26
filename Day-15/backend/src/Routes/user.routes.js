const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user.controller')
const identifyUser = require('../middlewares/auth.middleware')

// /api/user/follow/username
userRouter.post('/follow/:username',identifyUser,userController.userFollowController)

// /api/user/unfollow/username
userRouter.post('/unfollow/:username',identifyUser,userController.userUnfollowController)

module.exports = userRouter