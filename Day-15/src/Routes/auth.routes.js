const express = require('express')
const authRouter = express.Router()
const authControllers = require('../controllers/auth.controller')
const { model } = require('mongoose')

// /api/auth/register
authRouter.post('/register',authControllers.registerController)

// /api/auth/login
authRouter.post('/login',authControllers.loginControllers)

module.exports = authRouter