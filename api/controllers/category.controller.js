// Importamos el modelo Category de la carpeta models
const { response } = require('express');
const Category = require('../models/category.model.js');

// En esta función conseguimos todas las categorías -try-
// En caso de que haya un error, se manda un mensaje con su código, el 500 -catch-
const getAllCategories = async (request, response) => {
    try {
        const categories = await Category.findAll();
        return response.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'There was a problem obtaining category' })
    }
}

// Método para devolver una categoría
const getOneCategory = async (request, response) => {
    try {
        const category = await Category.findByPk(request.params.id);
        if (category) { // Si lo encuentra, que devuelva la categoría
            return response.status(200).json(category);
        } else { // Si no, que te devuelva un 404 - not found
            return response.status(404).send('Category not found')
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'There was a problem obtaining a category' })
    }
}

// Método para crear una categoría
const createCategory = async (request, response) => {
    try {
        const category = await Category.create({
            name: request.body.name,
        });
        return response.status(200).json({ message: 'Category created successfully.', category: category });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'There was a problem adding a category.' });
    }
}

// Método para actualizar una categoría
const updateCategory = async (request, response) => {
    try {
        const [categoryExist, category] = await Category.update(request.body, {
            returning: true,
            where: {
                id: request.params.id,
            },
        });
        // Si la categoría existe -bbdd-
        if (categoryExist !== 0) { // categoryExist hace referencia al nº de elementos que ha <encontrado> dentro de Category.update
            return response.status(200).json({ message: 'Category updated successfully.', category: category });
        } else {
            return response.status(404).send('Category not found.');
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'There is a problem updating a category.' });
    }
}

const deleteCategory = async (request, response) => {
    try {
        const category = await Category.destroy({
            where: {
                id: request.params.id
            },
        });
        // Si existe o está esa categoría
        if (category) {
            return response.status(200).json({ message: 'Category deleted successfully.' });
        } else {
            return response.status(404).send('Category not found');
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'There is a problem deleting a category.' })
    }
}

// Exportamos los métodos creados
module.exports = {
    getAllCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory
}