const { DataTypes } = require( 'sequelize');

const { connection } =require('../../database/index');

const Category = connection.define('category',{
    name: {
        type: DataTypes.STRING
    },


},{
    timestamps: false
})
module.exports = Category;