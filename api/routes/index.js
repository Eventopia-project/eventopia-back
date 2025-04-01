// Importamos el módulo de enrutamiento de Express y creamos un enrutador
const router = require('express').Router();

// Usamos el enrutador para manejar todas las peticiones dirigidas a '/user'
router.use('/user', require('./user.router')); // user.router hace referencia al archivo user.router.js dentro de la carpeta routes

// Para la ruta de administrador
router.use('/admin', require('./admin.router'));

// Usamos el enrutador para manejar todas la peticiones dirigidas a '/event'
router.use('/event', require('./event.router')); // event.router hace referencia al archivo user.router.js dentro de la carpeta routes

// Usamos el enrutador para manejar todas la peticiones dirigidas a '/category'
router.use('/category', require('./category.router')); // category.router hace referencia al archivo user.router.js dentro de la carpeta routes

// Usamos el enrutador para manejar todas las peticiones dirigidas a '/auth'
router.use('/auth', require('./auth.router'));

// Exportamos el enrutador para que se pueda usar en otros archivos
module.exports = router;