const { validacionExistencia, validacionEmail } = require("../../helpers/validation.helper")

const validacionUsuario = (usuario) =>{     
    if(!validacionExistencia(usuario.email)){
        throw {message: 'Email inexistente', status: 400}
    } 
    if(!validacionExistencia(usuario.password)){
        throw {message: 'Password incorrecto', status: 400}
    }
    if(!validacionEmail(usuario.email)){
        throw {message: 'Email incorrecto', status: 400}
    }
}


module.exports = {validacionUsuario}