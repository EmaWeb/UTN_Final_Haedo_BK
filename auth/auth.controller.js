const { validacionExistencia } = require("../helpers/validation.helper")
const {registerServicePaciente,loginService} = require("./auth.service")
const jwt = require('jsonwebtoken')



const loginController = async (req, res)=> {  
    const {email, password, idPaciente} = req.body     
    try{        
        const token = await loginService({email, password})  
        res.status(200).json({ok: true, message: 'Usuario logueado', token: token, id: token.idPaciente})        
    }
    catch(error){
        res.status(error.status).json(error)
    }
   
}

const registerController = async (req, res) =>{
     const {nombre, apellido, documento, sexo, direccion, telefono, email, password, estado, idrol} = req.body

    try{
        const result = await registerServicePaciente(
            {nombre: nombre, apellido: apellido, documento: documento, sexo:sexo, direccion:direccion, telefono: telefono, email: email, password: password, estado:estado,idrol: idrol,})
        res.status(200).json(result)
    }
    catch(error){
        res.status(error.status).json(error)
    }
}

const verifyTokenController = (req, res) =>{
    const token = req.headers['authorization']   
    if(!validacionExistencia(token) || !isNaN(token) || token === 'null' || token === 'undefined'){
        return  res.status(400).json({status:400, message: 'Debes proporcionar un token validooooo LPPM'})
    }
    const esValido = jwt.verify(token, process.env.JWT_SECRET_KEY)   
    if(!esValido){
        res.status(401).json({status: 401, message: 'Sin autorizacion token invalido'})
    }
    else{
        res.status(200).json({status:200, message: 'Token valido, usuario logueado'})
    }
}


module.exports = {loginController, registerController, verifyTokenController}