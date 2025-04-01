// Importamos el modelo Event de la carpeta models
const { response } = require("express");
const Event = require("../models/event.model.js");
const Category = require("../models/category.model.js");

// En esta función conseguimos todos los eventos -try-
// En caso de que haya un error, se manda un mensaje con su código, el 500 -catch-
const getAllEvents = async (request, response) => {
  try {
    const events = await Event.findAll();
    return response.status(200).json(events);
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "There was a problem obtaining events" });
  }
};

// Método para devolver un evento
const getOneEvent = async (request, response) => {
  try {
    const event = await Event.findByPk(request.params.id);
    if (event) {
      // Si lo encuentra, de devuelve el evento
      return response.status(200).json(event);
    } else {
      // Si no, que te devuelva un 404 - not found
      return response.status(404).send("Event not found");
    }
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "There was a problem obtaining a event" });
  }
};

// Método para crear el evento
const createEvent = async (request, response) => {
  try {
    const event = await Event.create({
      name: request.body.name,
      description: request.body.description,
      date_event: request.body.date_event,
      location: request.body.location,
      price: request.body.price,
      userId: request.body.ownerId,
      categoryId: request.body.categoryId,
      ownerId: request.body.ownerId
    });
    return response
      .status(200)
      .json({ message: "Event created successfully.", event: event });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "There was a problem adding a event." });
  }
};

// Método para actualizar un evento en concreto
const updateEvent = async (request, response) => {
  try {
    const [eventExist, event] = await Event.update(request.body, {
      returning: true,
      where: {
        id: request.params.id,
      },
    });
    // Si existe el evento -bbdd-
    if (eventExist !== 0) {
      // eventExist hace referencia al nº de elementos que ha <encontrado> dentro de Event.update
      return response
        .status(200)
        .json({ message: "Event updated successfully.", event: event });
    } else {
      return response.status(404).send("Event not found.");
    }
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "There is a problem updating a event." });
  }
};

const deleteEvent = async (request, response) => {
  try {
    const event = await Event.destroy({
      where: {
        id: request.params.id,
      },
    });
    // Si existe o está ese evento
    if (event) {
      return response
        .status(200)
        .json({ message: "Event deleted successfully." });
    } else {
      return response.status(404).send("Event not found");
    }
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "There is a problem deleting a event." });
  }
};

const filterByCategories = async (request, response) => {
  try {
    const events = await Event.findAll({
      where: {
        category: request.params.category,
      },
      include: Category,
    });
    return response.status(200).json(events);
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "There was a problem obtaining events" });
  }
};

// Exportamos los métodos creados
module.exports = {
  getAllEvents,
  getOneEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  filterByCategories,
};
