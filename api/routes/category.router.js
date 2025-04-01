const router = require('express').Router()

const {
    getAllCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory,

} = require('../controllers/category.controller.js')

// Asignamos las rutas con sus correspondientes métodos
router.get('/categories', getAllCategories);
router.get('/:id', getOneCategory);
router.post('/newCategory', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;