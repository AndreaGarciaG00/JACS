// controllers/collaboratorController.js
const Collaborator = require('../models/colaboradorModel');
const mongoose = require('mongoose');


exports.getAllCollaborators = async (req, res) => {
    try {
        const collaborators = await Collaborator.find();
        res.status(200).json({
            status: 'success',
            results: collaborators.length,
            data: { collaborators }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getCollaborator = async (req, res) => {
    try {
        const collaborator = await Collaborator.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { collaborator }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

//Crear nuevo colaborador
exports.createCollaborator = async (req, res) => {
    try {
        const newCollaborator = await Collaborator.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { collaborator: newCollaborator }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

//Actualizar los colaboradores
exports.updateCollaborator = async (req, res) => {
    try {
        const collaborator = await Collaborator.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: { collaborator }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

//Eliminar
exports.deleteCollaborator = async (req, res) => {
    try {
        await Collaborator.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};
