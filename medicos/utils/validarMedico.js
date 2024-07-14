
const PROPIEDADES_NECESRARIAS_MEDICO  = ['nombre', 'apellido', 'hora_inicio', 'hora_final', 'email', 'password', 'FK_idDiaSemana','FK_idEspecialidad']

const PROPIEDADES_NECESARIAS_PACIENTE = ['nombre', 'apellido', 'documento', 'sexo', 'direccion', 'telefono', 'email', 'password']


const VALIDACIONES_PACIENTE = {
    'nombre': {
        validacion: (valor) => {
            return Boolean(valor) && /^[A-Za-z]+$/.test(valor);
        },
        errorText: 'El nombre debe ser un valor verdadero compuesto solo por letras'
    },
    'apellido': {
        validacion: (valor) => {
            return Boolean(valor) && /^[A-Za-z]+$/.test(valor);
        },
        errorText: 'El apellido debe ser un valor verdadero compuesto solo por letras'
    },
    'documento': {
        validacion: (valor) => {
            return Boolean(valor) && /^[0-9]{1,8}$/.test(valor);
        },
        errorText: 'El documento debe ser un valor numérico con un máximo de 8 caracteres'
    },
    'sexo': {
        validacion: (valor) => {
            return Boolean(valor) && /^[A-Za-z]+$/.test(valor);
        },
        errorText: 'El sexo debe ser un valor verdadero compuesto solo por letras'
    },
    'direccion': {
        validacion: (valor) => {
            return Boolean(valor) && typeof(valor) === 'string' && valor.length > 0;
        },
        errorText: 'La dirección debe ser un valor verdadero compuesto por texto y números'
    },
    'telefono': {
        validacion: (valor) => {
            return Boolean(valor) && /^[0-9]+$/.test(valor);
        },
        errorText: 'El teléfono debe ser un valor numérico válido'
    },
    'email': {
        validacion: (valor) => {
            return Boolean(valor) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
        },
        errorText: 'El email debe ser una dirección de correo electrónico válida'
    },
    'password': {
        validacion: (valor) => {
            return Boolean(valor) && valor.length >= 6;
        },
        errorText: 'La contraseña debe tener al menos 6 caracteres'
    }
}


const VALIDACIONES_MEDICO = {
    'nombre': {
        validacion: (valor) => {
            return Boolean(valor) && /^[A-Za-z]+$/.test(valor);
        },
        errorText: 'El nombre debe ser un valor verdadero compuesto solo por letras'
    },
    'apellido': {
        validacion: (valor) => {
            return Boolean(valor) && /^[A-Za-z]+$/.test(valor);
        },
        errorText: 'El apellido debe ser un valor verdadero compuesto solo por letras'
    },  
    'hora_inicio': {
        validacion: (valor) => {
            return Boolean(valor) && /^([01]\d|2[0-3]):([0-5]\d)$/.test(valor);
        },
        errorText: 'La hora de inicio debe ser un valor válido en el formato HH:MM'
    },
    'hora_final': {
        validacion: (valor) => {
            return Boolean(valor) && /^([01]\d|2[0-3]):([0-5]\d)$/.test(valor);
        },
        errorText: 'La hora de fin debe ser un valor válido en el formato HH:MM'
    },
    'email': {
        validacion: (valor) => {
            return Boolean(valor) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
        },
        errorText: 'El email debe ser una dirección de correo electrónico válida'
    },
    'password': {
        validacion: (valor) => {
            return Boolean(valor) && valor.length >= 6;
        },
        errorText: 'La contraseña debe tener al menos 6 caracteres'
    },
    'FK_idDiaSemana': {
       
        validacion: (valor) => {
            return Boolean(valor) && !isNaN(valor);
        },
        errorText: 'El dia de la semana debe ser un valor numérico válido'
    }, 
    'FK_idEspecialidad': {
        
        validacion: (valor) => {
            return Boolean(valor) && !isNaN(valor);
        },
        errorText: 'La especialidad debe ser un valor numérico válido'
    }   
}



const validarPropiedadesPaciente = (paciente) => {
    try{
        const propiedades_paciente = Object.keys(paciente)
        const propiedades_faltantes = []
        const propiedades_sobrantes = []
        for (let propiedades_necesaria of PROPIEDADES_NECESARIAS_PACIENTE) {
            if (!propiedades_paciente.includes(propiedades_necesaria)) {
                propiedades_faltantes.push(propiedades_necesaria)
            }
        }
        if (propiedades_faltantes.length > 0) {
            throw { status: 400, message: 'Faltan las propiedades [' + propiedades_faltantes.join(', ') + ']' }
        }
        for (let propiedad of propiedades_paciente) {
            if (!PROPIEDADES_NECESARIAS_PACIENTE.includes(propiedad)) {
                propiedades_sobrantes.push(propiedad)
            }
        }
        if (propiedades_sobrantes.length > 0) {
            throw { status: 400, message: 'Sobran las propiedades [' + propiedades_sobrantes.join(', ') + ']' }
        }
        for(let propiedad in VALIDACIONES_PACIENTE){
            let valor = paciente[propiedad]
            if(!VALIDACIONES_PACIENTE[propiedad].validacion(valor)){
                throw {status: 400, message: VALIDACIONES_PACIENTE[propiedad].errorText}
            }
        }
        return true
    }
    catch(error){
        throw error
    }
}

const validarPropiedadesMedico = (medico) => {
    try{
        const propiedades_medico = Object.keys(medico)
        const propiedades_faltantes = []
        const propiedades_sobrantes = []
        for (let propiedades_necesaria of PROPIEDADES_NECESRARIAS_MEDICO) {
            if (!propiedades_medico.includes(propiedades_necesaria)) {
                propiedades_faltantes.push(propiedades_necesaria)
            }
        }
        if (propiedades_faltantes.length > 0) {
            throw { status: 400, message: 'Faltan las propiedades [' + propiedades_faltantes.join(', ') + ']' }
        }
        for (let propiedad of propiedades_medico) {
            if (!PROPIEDADES_NECESRARIAS_MEDICO.includes(propiedad)) {
                propiedades_sobrantes.push(propiedad)
            }
        }
        if (propiedades_sobrantes.length > 0) {
            throw { status: 400, message: 'Sobran las propiedades [' + propiedades_sobrantes.join(', ') + ']' }
        }
        for(let propiedad in VALIDACIONES_MEDICO){
            let valor = medico[propiedad]
            if(!VALIDACIONES_MEDICO[propiedad].validacion(valor)){
                throw {status: 400, message: VALIDACIONES_MEDICO[propiedad].errorText}
            }
        }
        return true
    }
    catch(error){   
        throw error
    }
}




module.exports = { validarPropiedadesPaciente, validarPropiedadesMedico}