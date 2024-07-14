
const PROPIEDADES_NECESARIAS = ['nombre', 'apellido', 'documento', 'sexo', 'direccion', 'telefono', 'email', 'password'];

const VALIDACIONES_PACIENTE = {
    'nombre': {
        validacion: (valor) => /^[a-zA-Z]+$/.test(valor),
        errorText: 'Solo se permiten letras'
    },
    'apellido': {
        validacion: (valor) => /^[a-zA-Z]+$/.test(valor),
        errorText: 'Solo se permiten letras'
    },
    'documento': {
        validacion: (valor) => /^\d{1,8}$/.test(valor),
        errorText: 'Solo se permiten números, máximo 8 dígitos'
    },
    'sexo': {
        validacion: (valor) => ['M', 'F'].includes(valor),
        errorText: 'Selecciona un sexo válido'
    },
    'direccion': {
        validacion: (valor) => valor.length <= 25,
        errorText: 'Máximo 25 caracteres'
    },
    'telefono': {
        validacion: (valor) => /^\d{1,15}$/.test(valor),
        errorText: 'Solo se permiten números, máximo 15 dígitos'
    },
    'email': {
        validacion: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
        errorText: 'Formato de email inválido'
    },
    'password': {
        validacion: (valor) => valor.length <= 8,
        errorText: 'Máximo 8 caracteres'
    }
};

 const validarPaciente = (paciente) => {
    const errores = {};
    PROPIEDADES_NECESARIAS.forEach(propiedad => {
        const { validacion, errorText } = VALIDACIONES_PACIENTE[propiedad];
        if (!validacion(paciente[propiedad])) {
            errores[propiedad] = errorText;
        }
    });
    return errores;
};

module.exports = {validarPaciente}
