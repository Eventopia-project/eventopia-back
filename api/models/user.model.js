const { DataTypes } = require( 'sequelize');

const { connection } =require('../../database/index');

const User = connection.define('user',{
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM('member', 'admin'),
        defaultValue: 'member'
    }

},{
    timestamps: false
})
module.exports = User;