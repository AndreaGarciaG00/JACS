// controllers/psychologistController.js
const Psychologist = require('../models/psicologoModel');
const mongoose = require('mongoose');

exports.getAllPsychologists = async (req, res) => {
    try {
        const psychologists = await Psychologist.find();
        res.status(200).json({
            status: 'success',
            results: psychologists.length,
            data: { psychologists }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getPsychologist = async (req, res) => {
    try {
        const psychologist = await Psychologist.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { psychologist }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

//Crear Psicologo
exports.createPsychologist = async (req, res) => {
    try {
        const newPsychologist = await Psychologist.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { psychologist: newPsychologist }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

//Actualizar
exports.updatePsychologist = async (req, res) => {
    try {
        const psychologist = await Psychologist.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: { psychologist }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

//Eliminar
exports.deletePsychologist = async (req, res) => {
    try {
        await Psychologist.findByIdAndDelete(req.params.id);
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
