const express = require('express')
const {    
    getPacienteByIdController, 
    putPacienteController,
    deletePacienteByIdController, 
    getAllPaciente 
} = require('./paciente.controller')

const pacienteRouter = express.Router()


pacienteRouter.get('/', getAllPaciente)
pacienteRouter.put('/:idPaciente', putPacienteController);
pacienteRouter.delete('/:pid', deletePacienteByIdController)
pacienteRouter.get('/:pid', getPacienteByIdController)


module.exports = {pacienteRouter}