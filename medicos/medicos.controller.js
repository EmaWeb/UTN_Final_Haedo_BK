
const {  obtenerMedicos, obtenerEspecialidades } = require("./medicos.service");
const jwt = require('jsonwebtoken')


const getAllMedico = async (req, res) => {
    try {
        const result = await obtenerMedicos();
     
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json(error);
    }
};

const getAllEspecialidades = async (req, res) => {
    try {
        const result = await obtenerEspecialidades();    
            
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json(error);
    }
};

module.exports = {  getAllMedico , getAllEspecialidades, };


