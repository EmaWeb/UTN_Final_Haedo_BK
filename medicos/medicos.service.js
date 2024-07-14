const { CustomError } = require("../errors/customErrorManager")
const { listaMedicos, listaEspecialidades } = require("./medicos.repository")


const obtenerMedicos = async () => {
    try{
        const medicos = await listaMedicos()
        if(medicos.length === 0){
            throw new CustomError('No hay medicos', 404)
        }
        return {status: 200, message: 'medicos obtenidos', medicos: medicos}
    }
    catch(error){
        throw error
    }
} 

const obtenerEspecialidades = async () => {
    try{
        const especialidades = await listaEspecialidades()      
        if(especialidades.length === 0){
            throw new CustomError('No hay especialidades', 404)
        }
        return {status: 200, message: 'especialidades obtenidas', especialidades: especialidades}
    }
    catch(error){
        throw error
    }
} 




module.exports = { obtenerMedicos, obtenerEspecialidades}


