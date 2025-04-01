const { DataTypes } = require( 'sequelize');

const { connection } = require('../../database/index');

const Assistance = connection.define('assistance',{
    is_attend: {
        type: DataTypes.BOOLEAN
    },
},{
    timestamps: false
})
module.exports = Assistance;