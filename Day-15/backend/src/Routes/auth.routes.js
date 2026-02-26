const express = require('express')
const authRouter = express.Router()
const authControllers = require('../controllers/auth.controller')
const { model } = require('mongoose')
const identifyUser = require('../middlewares/auth.middleware')

// /api/auth/register
authRouter.post('/register',authControllers.registerController)

// /api/auth/login
authRouter.post('/login',authControllers.loginControllers)

//  /api/auth/get-me
authRouter.get('/get-me',identifyUser,authControllers.getMeController)

module.exports = authRouter