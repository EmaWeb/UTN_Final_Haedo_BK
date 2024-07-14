const express = require('express')
const { loginController, registerController, verifyTokenController } = require('./auth.controller')

const authRouter = express.Router()

authRouter.post('/register', registerController)

authRouter.post('/login', loginController)

authRouter.get('/verify-token', verifyTokenController)


module.exports = {authRouter}