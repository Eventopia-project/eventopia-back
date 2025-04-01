const router = require('express').Router();
const { checkAuth, checkAdmin } = require('../middlewares/auth');

// Importamos los controladores de administrador
const { getAllUsers, deleteUser } = require('../controllers/user.controller');

// Rutas de administrador
router.get('/users', checkAuth, checkAdmin, getAllUsers);
router.delete('/:id', checkAuth, checkAdmin, deleteUser);

module.exports = router;