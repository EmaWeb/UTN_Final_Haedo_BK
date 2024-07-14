const {  obtenerPacientePorId, eliminarPacientePorId, obtenerPacientes , actulizarPaciente} = require("./paciente.service")

const getAllPaciente = async (req, res) => {
    try{
        const result = await obtenerPacientes()
        res.status(200).json(result)
    }
    catch(error){
        res.status(error.status).json(error)
    }
}
const putPacienteController = async (req, res) => {  
    const { idPaciente } = req.params; 
    const nuevosDatos = req.body; 
    try {        
        const pacienteActualizado = await actulizarPaciente(idPaciente, nuevosDatos, { new: true });

        if (!pacienteActualizado) {
            return res.status(404).json({ message: 'Paciente no encontrado.' });
        }

        res.status(200).json(pacienteActualizado); 
    } catch (error) {
        console.error('Error al actualizar paciente:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};
const deletePacienteByIdController = async (req, res)=>{
    try{
        const{pid} = req.params        
        if(!(pid && !isNaN(pid))){
            throw {status:400, message:"El parametro pid debe ser un valor numerico" }
        }
        const result = await eliminarPacientePorId (pid)
        res.status(200).json(result)
    }
    catch(error){
        
        res.status(error.status).json(error)
    }
}
const getPacienteByIdController = async (req, res) => {  
    try{                
        const {pid} = req.params 
        if( !(pid && !isNaN(pid))  ){
            throw {status: 400, message: 'El parametro pid debe ser un valor numerico valido'}
        }
        const result = await obtenerPacientePorId(pid)
        res.status(200).json(result)
    }
    catch(error){
        res.status(error.status).json(error)
    }
}


module.exports = {putPacienteController, getPacienteByIdController, deletePacienteByIdController, getAllPaciente}