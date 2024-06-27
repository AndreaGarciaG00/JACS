// routes/testimonialRoutes.js
const express = require('express');
const testimonialController = require('../controllers/testimonioController');

const router = express.Router();

router
    .route('/')
    .get(testimonialController.getAllTestimonials)
    .post(testimonialController.createTestimonial);

router
    .route('/:id')
    .get(testimonialController.getTestimonial)
    .patch(testimonialController.updateTestimonial)
    .delete(testimonialController.deleteTestimonial);

module.exports = router;
