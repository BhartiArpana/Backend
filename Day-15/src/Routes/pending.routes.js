const express = require('express')
const pendingRouter = express.Router()
const pendingController = require('../controllers/pending.controller') 
const identifyUser = require('../middlewares/auth.middleware')

// /api/user/pending/username
pendingRouter.get('/pending',identifyUser,pendingController.pendingUserController)

// /api/user/accept/follower
pendingRouter.patch('/accept/:follower',identifyUser,pendingController.acceptUserController)

//  /api/user/reject/follower
pendingRouter.delete('/reject/:follower',identifyUser,pendingController.rejectUserController)

module.exports = pendingRouter