const { query } = require("../config/connection.sql")


const insertarPaciente= async ({titulo, descripcion, precio, stock, codigo}) => {

     
    try{
        const consultaString = 'INSERT INTO paciente (titulo, descripcion, stock, precio, codigo) VALUES (?,?,?,?,?)'
        const valores = [titulo, descripcion, stock, precio, codigo]
        const resultado = await query(consultaString, valores)
        return resultado.insertId
    }
    catch(error){
        throw {status:500, message: 'Error interno en el servidor '}
    }
}

const seleccionarPacientePorId = async (pid) =>{   
    try{
        const consultaString = 'SELECT * FROM paciente WHERE idPaciente = ?'
        const resultado = await query(consultaString, [pid])     
        if(resultado.length === 0){
            throw {status: 404, message: 'Paciente con id ' + pid + ' no encontrado'}
        }
        else{
            return resultado[0]
        }
        
    }
    catch(error){

        if(error.status === 404){
            throw error
        }
        else{
            throw {status:500, message: 'Error interno en el servidor '}
        }
        
    }
}

const deletePacientePorId = async(pid) =>{
    try{        
        const consultaString = 'UPDATE paciente SET estado = 0 WHERE idPaciente = ?'
        const resultado = await query(consultaString, [pid])
       
        if(resultado.length === 0){
            throw {status: 404, message: 'Paciente con id ' + pid + ' no existe'}
        }
        else{
            return {status: 200, message: 'Paciente con id ' + pid + ' eliminado correctamente'}
        }     
    }
    catch(error){
        
        if(error.status === 404){
            throw error
        }
        else{ 
            throw {status:500, message: 'Error interno en el servidor '}           
        }      
    }
}

const listaPacientes = async () =>{
    try{
        const consultaString = 'SELECT * FROM paciente'
        const pacientes = await query(consultaString)
        return pacientes
    }
    catch(error){
        if(error.status){
            throw error
        }
        else{
            throw {status:500, message: 'Error interno en el servidor'}
        }
    }
}

const UpdatePaciente = async (idPaciente, nuevosDatos) => {
    const { nombre, apellido, documento, direccion, email, telefono, sexo , estado} = nuevosDatos;  
    try{
    const consultaString = 'UPDATE paciente SET nombre = ?, apellido = ?, documento = ?, direccion = ?, email = ?, telefono = ?, sexo = ?, estado = ? WHERE idPaciente = ?';
    const valores = [nombre, apellido, documento, direccion, email, telefono, sexo, estado, idPaciente]
    const paciente = await query(consultaString, valores)
    return paciente
       }
    catch(error){      
        if(error.status){
            throw error
        }
        else{
            throw {status:500, message: 'Error interno en el servidor'}
        }
    }
  };


module.exports = {UpdatePaciente,  insertarPaciente, seleccionarPacientePorId, deletePacientePorId, listaPacientes}