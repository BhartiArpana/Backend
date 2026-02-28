const { route } = require('../app')
const userModel = require('../models/user.model')
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

// for register user 
// @route /api/auth/register
router.post('/register',authController.registerUser)

// for login user
// @route /api/auth/login
router.post('/login',authController.LoginUser)



module.exports = router