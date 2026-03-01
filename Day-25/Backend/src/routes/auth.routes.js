const { route } = require('../app')
const userModel = require('../models/user.model')
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

// for register user 
// @route /api/auth/register
router.post('/register',authController.registerUser)

// for login user
// @route /api/auth/login
router.post('/login',authController.LoginUser)

// for get-me
// @route /api/auth/get-me
router.get('/get-me',authMiddleware.authUser,authController.getMe)

// for logout
// @route /api/auth/logout
router.get('/logout',authController.logout)

module.exports = router