const { query } = require("../config/connection.sql")


const insertarMedico = async ({nombre, apellido, hora_inicio, hora_final, email, password, FK_idDiaSemana, FK_idEspecialidad, idrol}) => {
    idrol = 2
    try{
        const consultaString = 'INSERT INTO medico (nombre, apellido, hora_inicio, hora_final, email, password, FK_idDiaSemana, FK_idEspecialidad, idrol ) VALUES (?,?,?,?,?,?,?,?,?)'
        
        const valores = [nombre, apellido, hora_inicio, hora_final, email, password, FK_idDiaSemana, FK_idEspecialidad, idrol]
        const resultado = await query(consultaString, valores)      
        return resultado.insertId        
    }
    
    catch(error){     
        throw {status:500, message: 'Error interno en el servidor'}
    }
}

const listaMedicos = async () =>{
    try{
        const consultaString = 'SELECT m.*, e.nom_E, d.nom_D FROM medico m JOIN especialidad e ON e.idEspecialidad = m.FK_idEspecialidad JOIN diassemana d ON d.idDiaSemana = m.FK_idDiaSemana';
        const medicos = await query(consultaString)  
        return medicos
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

const listaEspecialidades = async () =>{
    try{
        const consultaString = 'SELECT * FROM especialidad'
        const especialidad = await query(consultaString)        
        return especialidad
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


module.exports = { insertarMedico,  listaMedicos,listaEspecialidades}