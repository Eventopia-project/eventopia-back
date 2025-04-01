// Importamos tanto el modelo User como el paquete jwt -jsonwebtoken-
const User = require('../models/user.model');
const jwt =  require('jsonwebtoken');
require('dotenv').config();

// Creamos una función checkAuth, que como su nombre indica, es para validar la autenticación
function checkAuth(request, response, next) {
    // Verificamos si la petición tiene encabezado de autorización
    if (!request.headers.authorization) {
        // Si no se encuentra el encabezado, tira un not found -404-
        return response.status(200).json({ message: 'Token not found' });
    }

    // Utilizamos el jwt.verify para validar el token dado
    jwt.verify(
        request.headers.authorization, // El token extraído del encabezado de autorización
        'secret', // La clave secreta para desencriptar el token, se almacena en las variables de entorno
        async (error, payload) => {
            // si hay un error de verificación, como token expirado o modificado
            if (error) {
                console.error(error.message); // mostrar error en consola
                // Tira un error 401 diciendo: token no válido
                return response.status(401).json({ message: 'Token not valid' });
            }

            // Por el contrario, si es válido, busca al usuario en la bbdd
            const user = await User.findOne({
                where: {
                    email: payload.email,
                },
            });
            // Si no lo encuentra, tira un 401 de error
            if (!user) {
                return response.status(401).json({ message: 'Token not valid' });
            }
            // Si se encuentra al usuario, lo guarda en un objeto llamado res.locals
            // para su uso en el middleware
            response.locals.user = user; // ???
            // Llama a la función next para continuar con el siguiente middleware en la cadena
            next();
        }
    );
}

function checkAdmin(request, response, next) {
    // Si el usuario NO es administrador, tira un 401 - NO eres admin
    if (response.locals.user.role) { // ???? user o el objeto importado ??
        return response.status(401).json({ message: 'Admins only' });
    } else {
        next();
    }
}

module.exports = {
    checkAuth,
    checkAdmin
}