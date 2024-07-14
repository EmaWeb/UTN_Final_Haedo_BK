const { CustomError } = require("../errors/customErrorManager")
const {  seleccionarPacientePorId, deletePacientePorId, listaPacientes , UpdatePaciente} = require("./paciente.repository")
const { validarPropiedadesPaciente } = require("./utils/validarPaciente")

const obtenerPacientes= async () => {
    try{
        const pacientes = await listaPacientes()      
        if(pacientes.length === 0){
            throw new CustomError('No hay paciente', 404)
        }
        return {status: 200, message: 'paciente obtenidos', paciente: pacientes}
    }
    catch(error){
        throw error
    }
} 
const actulizarPaciente = async (idPaciente, nuevosDatos)=>{
    validarPropiedadesPaciente(nuevosDatos)     

    try{
        const paciente = await UpdatePaciente (idPaciente, nuevosDatos)       
        return {ok:true, status:200, paciente}
    }
    catch (error){
        if(error.status){
            throw error
        }
        else{
            throw {status:500, message: "Error interno del servidor"}
        }
    }
}
const eliminarPacientePorId = async (pid)=>{
    try{
        const paciente = await deletePacientePorId (pid)
        return {ok:true, status:200, paciente}
    }
    catch (error){
        if(error.status){
            throw error
        }
        else{
            throw {status:500, message: "Error interno del servidor"}
        }
    }
}
const obtenerPacientePorId = async (pid) =>{      
    try{
        const paciente = await seleccionarPacientePorId(pid)
        return {ok: true, status: 200, paciente}
    }
    catch(error){
        if(error.status){
            throw error
        }
        else{
            throw {status: 500, message: 'Error interno del servidor'}
        }
    }
}


module.exports = { actulizarPaciente,  obtenerPacientePorId, eliminarPacientePorId, obtenerPacientes}


