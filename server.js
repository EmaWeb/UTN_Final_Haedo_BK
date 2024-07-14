const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const {database} = require('./config/connection.sql')


const {pacienteRouter} = require('./paciente/paciente.router')
const {medicoRouter} = require('./medicos/medicos.router')
const { authRouter } = require('./auth/auth.router')

const PORT = process.env.PORT || 4000
const app = express()


app.use(cors())
app.use(express.json())

app.get('/test' , (req, res) => {
    res.json({status:200, message: 'hellow world'})
})

app.use('/api/auth', authRouter)
app.use('/api/paciente', pacienteRouter)
app.use('/api/medicos', medicoRouter)

app.listen(PORT, () =>{
    console.log('Nuestra aplicacion se ejecuta en el puerto: ' + PORT)
})

