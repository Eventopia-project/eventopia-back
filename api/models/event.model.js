const { DataTypes } = require( 'sequelize');

const { connection } =require('../../database/index');

const Event = connection.define('event',{
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    date_event: {
        type: DataTypes.DATE
    },
    location: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    }


},{
    timestamps: false
})
module.exports = Event;