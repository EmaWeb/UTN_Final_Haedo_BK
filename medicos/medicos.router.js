
const express = require('express');
const { getAllMedico, getAllEspecialidades} = require('./medicos.controller');

const medicoRouter = express.Router();

medicoRouter.get('/especialidades', getAllEspecialidades);
medicoRouter.get('/medicos', getAllMedico);

module.exports = {medicoRouter};  




