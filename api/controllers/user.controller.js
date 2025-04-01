// Importamos el modelo User de la carpeta models
const { response } = require('express');
const User = require('../models/user.model.js');
const Event = require('../models/event.model.js');

// En esta función conseguimos todos los usuarios -try-
// En caso de que haya un error, se manda un mensaje con su código, el 500 -catch-
const getAllUsers = async (request, response) => {
    try {
        const users = await User.findAll();
        return response.status(200).json(users);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'There was a problem obtaining users' })
    }
}

// Método para devolver un usuario
const getOneUser = async (request, response) => {
    try {
        const user = await User.findByPk(request.params.id);
        if (user) { // Si lo encuentra, de devuelve el usuario
            return response.status(200).json(user);
        } else { // Si no, que te devuelva un 404 - not found
            return response.status(404).send('User not found')
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'There was a problem obtaining a user' })
    }
}

// Método para crear el usuario
const createUser = async (request, response) => {
    try {
        const user = await User.create({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            location: request.body.location,
        });
        return response.status(200).json({ message: 'User created successfully.', user: user });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'There was a problem adding a user.' });
    }
}

// Método para actualizar el usuario
const updateUser = async (request, response) => {
    try {
        const [userExist, user] = await User.update(request.body, {
            returning: true,
            where: {
                id: request.params.id,
            },
        });
        // Si el usuario está registrado -bbdd-
        if (userExist !== 0) { // userExist hace referencia al nº de elementos que ha <encontrado> dentro de User.update
            return response.status(200).json({ message: 'User updated successfully.', user: user });
        } else {
            return response.status(404).send('User not found.');
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'There is a problem updating a user.' });
    }
}

const deleteUser = async (request, response) => {
    try {
        const user = await User.destroy({
            where: {
                id: request.params.id
            },
        });
        // Si existe o está ese usuario
        if (user) {
            return response.status(200).json({ message: 'User deleted successfully.' });
        } else {
            return response.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'There is a problem deleting a user.' })
    }
}

// Creamos la función profile
const getProfile = async (request, response) => {
    try {
        const user = await User.findOne({
            where: {
                email: response.locals.user.email
            },
            include: [
                {
                    model: Event
                },
                {
                    model: Event,
                    as: 'owner'
                }
            ]
        });

        if (user) {
            return response.status(200).json(user);
        } else {
            return response.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'There was a problem obtaining a user' })
    }
}

// Exportamos los métodos creados
module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    getProfile
}