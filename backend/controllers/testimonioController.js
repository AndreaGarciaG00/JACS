// controllers/testimonialController.js
const Testimonial = require('../models/testimonioModel');
const mongoose = require('mongoose');

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json({
            status: 'success',
            results: testimonials.length,
            data: { testimonials }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { testimonial }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

//Crear nuevo testimonio
exports.createTestimonial = async (req, res) => {
    try {
        const newTestimonial = await Testimonial.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { testimonial: newTestimonial }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

//Actulizar
exports.updateTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: { testimonial }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

//Eliminar
exports.deleteTestimonial = async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
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
