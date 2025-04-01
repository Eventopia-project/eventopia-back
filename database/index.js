const { Sequelize } = require('sequelize');
require('dotenv').config();

// Creando una instancia de sequelize
const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    port: process.env.DB_PORT,
    logging: false
});

// comprobar la conexión a dicha base de datos
const checkdb = async () => {
    try {
        await connection.authenticate()
        console.log('Connection to db successful!');
    } catch (error) {
        console.error('We have a problem with connection to db', error);
    }

}
// Creamos las tablas en la base de datos
const syncModels = async () => {
    try {
        await connection.sync()
        console.log('Models added')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connection,
    checkdb,
    syncModels
}