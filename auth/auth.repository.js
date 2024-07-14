const { database, query } = require("../config/connection.sql")
const bcrypt = require('bcrypt')


const buscarUsuarioPorEmail = async (email) => {    
    try {       
        const consultaExistencia = 'SELECT * FROM paciente WHERE email = ? AND estado = 1'; 
        const resultados = await query(consultaExistencia, [email])
        if(resultados.length > 0){
            return resultados[0]
        }
        else{
            return null
        }
    
    } catch (error) {
        console.error('Error al buscar usuario por email:', error);
        throw { status: 500, message: 'Error interno en el servidor 1' };
    }
};

const insertarUsuarioPaciente= async ({nombre:nombre, apellido:apellido, documento:documento, sexo:sexo, direccion:direccion, telefono:telefono, email:email, password:password, estado=1, idrol:idrol}) => {
  
    try{
        const consultaString = 'INSERT INTO paciente (nombre, apellido, documento, sexo, direccion, telefono, email, password,estado, idrol) VALUES (?,?,?,?,?,?,?,?,?,?)'
        const valores = [nombre, apellido, documento, sexo, direccion, telefono, email, password, estado, idrol]
      
        const resultado = await query(consultaString, valores)
        return resultado.insertId
    }
    catch(error){
        throw {status:500, message: 'Error interno en el servidor'}
    }
}

module.exports = { buscarUsuarioPorEmail , insertarUsuarioPaciente}

