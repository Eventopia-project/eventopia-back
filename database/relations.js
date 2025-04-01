const User = require('../api/models/user.model.js')
const Assistance = require('../api/models/assistance.model.js')
const Event = require('../api/models/event.model.js')
const Category = require('../api/models/category.model.js')

const initializeRelations = () => {
    try {

        // Relación 1:N de Evento - Categoría
        Category.hasMany(Event);
        Event.belongsTo(Category);

        User.hasMany(Event, { as: 'owner' });
        Event.belongsTo(User, { as: 'owner' });
        // Relación N:M de User - Event
        User.belongsToMany(Event, { through : Assistance });
        Event.belongsToMany(User, { through : Assistance });

        console.info('Relations added to models');
    } catch (error) {
        console.error('We have a problem with relations', error);
    }
}

module.exports = initializeRelations;