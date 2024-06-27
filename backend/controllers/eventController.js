const Event = require('../models/eventModel');
const ErrorResponse = require('../utils/errorResponse');

// Crear un evento
exports.createEvent = async (req, res, next) => {
    const { title, date, time, description, image } = req.body;

    try {
        if (!title || !date || !time || !description || !image) {
            throw new ErrorResponse('Falta uno o más campos requeridos: title, date, time, description, image', 400);
        }

        const event = await Event.create({
            title,
            date,
            time,
            description,
            image: {
                url: image,
                public_id: null 
            },
        });

        res.status(201).json({
            success: true,
            event
        });

    } catch (error) {
        next(error); // Pasar el error al siguiente middleware de manejo de errores
    }
};

// Mostrar todos los eventos
exports.showEvents = async (req, res, next) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            events
        });
    } catch (error) {
        next(error);
    }
};

// Actualizar un evento
exports.updateEvent = async (req, res, next) => {
    const { id } = req.params;
    const { title, date, time, description, image } = req.body;

    try {
        const event = await Event.findById(id);

        if (!event) {
            throw new ErrorResponse('Evento no encontrado', 404);
        }

        event.title = title || event.title;
        event.date = date || event.date;
        event.time = time || event.time;
        event.description = description || event.description;
        event.image.url = image || event.image.url;

        await event.save();

        res.status(200).json({
            success: true,
            event
        });

    } catch (error) {
        next(error);
    }
};

// Eliminar un evento
exports.deleteEvent = async (req, res, next) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);

        if (!event) {
            throw new ErrorResponse('Evento no encontrado', 404);
        }

        await event.remove();

        res.status(200).json({
            success: true,
            message: 'Evento eliminado correctamente'
        });

    } catch (error) {
        next(error);
    }
};
