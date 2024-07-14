const { buscarUsuarioPorEmail, insertarUsuarioPaciente} = require("./auth.repository")
const bcrypt = require('bcrypt')
const { validacionUsuario } = require("./utils/validationUser.util")
const jwt = require('jsonwebtoken')

const registerServicePaciente = async (usuario) =>{  
    
    try{
        const {nombre, apellido, documento, sexo, direccion, telefono, email, password,estado,  idrol} = usuario
       
        validacionUsuario({email, password,idrol})        
        const usuarioExistente = await buscarUsuarioPorEmail(usuario.email, usuario.idrol) 
        if(usuarioExistente){
            throw {status: 400, message: 'ERROR: email ya registrado'}
        }


        const passwordHash = await bcrypt.hash(usuario.password, 10)
        usuario.estado = 1;
        const result = await insertarUsuarioPaciente({
        nombre:usuario.nombre, 
        apellido:usuario.apellido, 
        documento:usuario.documento,             
        sexo:usuario.sexo, 
        direccion:usuario.direccion, 
        telefono:usuario.telefono, 
        email:usuario.email, 
        estado:usuario.estado,
        password: passwordHash, 
        idrol: usuario.idrol})   

        if(result){
            return {ok: true, message: 'Se inserto el paciente'}
        }
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


const loginService = async (usuario) =>{   
    try{             
        const {email, password} = usuario            
        validacionUsuario(usuario)
       
        const usuarioExistente = await buscarUsuarioPorEmail(email)  
        if(!usuarioExistente){
            throw { status: 400, message: 'No existe usuario con ese email o se encuntra inactivo'}
        }               
        const esCorrecta = await bcrypt.compare(password, usuarioExistente.password)
        if(!esCorrecta){
            throw { status: 400, message: 'Contraseña incorrecta'}
        }
        else{
            const token = jwt.sign({email}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'})           
            const datosPaciente = {
                idPaciente: usuarioExistente.idPaciente,
                email: usuarioExistente.email,
                idRol:usuarioExistente.idRol,
                token: token,
            }
            return datosPaciente
        }
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


module.exports = {registerServicePaciente, loginService}

