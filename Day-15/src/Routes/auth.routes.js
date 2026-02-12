const express = require('express')
const authRouter = express.Router()
const authControllers = require('../controllers/auth.controller')
const { model } = require('mongoose')

authRouter.post('/register',authControllers.registerController)

authRouter.post('/login',authControllers.loginControllers)

module.exports = authRouter