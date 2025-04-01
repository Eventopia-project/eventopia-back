// Importamos el modelo de usuario
const User = require('../models/user.model');

// Importamos las librerías para manejar los tokens y cifrado de contraseñas
const jwt = require('jsonwebtoken'); // tokens
const bycrypt = require('bcrypt'); // cifrado

// Definimos la función signUp, una función asíncrona para manejar la creación de usuarios
const signUp = async (request, response) => {
    try {

        const existingUser = await User.findOne({
            where:{
                email: request.body.email
            }
        });
        // Si el usuario trata de registrarse con un correo que ya está en la bbdd
        if (existingUser) {
            return response.status(409).json({ message: 'This user with this email already exists.' });
        }
        // Generamos una 'sal' para el cifrado de la contraseña. Esto ayuda a asegurar mejor la contraseña
        const salt = bycrypt.genSaltSync(parseInt('10'));
        // Ciframos la contraseña que nos da el usuario al escribir usando la sal generada
        request.body.password = bycrypt.hashSync(request.body.password, salt);

        // Creamos un nuevo usuario con los datos proporcionados en la solicitud
        const user = await User.create({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            location: request.body.location
        });

        // Creamos el payload del token, que incluye el email del usuario
        const payload = { email: request.body.email };
        // Firmamos el token con una clave secreta y establecemos un tiempo límite -expiración-
        const token = jwt.sign(payload, 'secret', { expiresIn: '2h'});

        // Si todo va bien, devolvemos el token al usuario con un estado -200-
        return response.status(200).json({ token, user }); // === { token: token }

    } catch (error) {
        console.log(error);
        return response.status(500).json(error);
    }
}

// Definimos la función login, igual de asíncrona que signUp
const login = async (request, response) => {
    try {
        // Aquí tratamos de buscar el usuario en la bbdd que coincida con el email que nos da el usuario
        const user = await User.findOne({
            where: {
                email: request.body.email // hace referencia al <valor> del usuario cuando escribe el email
            },
        });
        // Si no se encuentra el usuario con el email dado, que devuelva erl error 404
        if (!user) {
            return response.status(404).json({ message: 'Email or password wrong.' });
        }

        // Utilizamos bycrypt para comparar la contraseña dada con la que tenemos en la bbdd
        const checkPass = bycrypt.compareSync(request.body.password, user.password);

        // Si la contraseña es correcta
        if (checkPass) {
            // Creamos un payload con el email del usuario
            const payload = { email : request.body.email };
            // Firma un token JWT usando una clave secreta y establecemos un tiempo límite -expiración-
            const token = jwt.sign(payload, 'secret', { expiresIn: '2h' });
            // Devuelve el token generado con el estado 200 -éxito-
            return response.status(200).json({ token,
                user: {
                    id: user.id,
                    name: user.name
                }
            });
        } else {
            // Si la contraseña no es correcta, tira un not found
            return response.status(404).json({ message: 'Email or password wrong.' });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json(error);
    }
}

// Exportamos la función signUp para que se pueda utilizar en otros archivos
module.exports = {
    signUp,
    login
};