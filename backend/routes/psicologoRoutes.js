// routes/psychologistRoutes.js
const express = require('express');
const psychologistController = require('../controllers/psicologoController');

const router = express.Router();

router
    .route('/')
    .get(psychologistController.getAllPsychologists)
    .post(psychologistController.createPsychologist);

router
    .route('/:id')
    .get(psychologistController.getPsychologist)
    .patch(psychologistController.updatePsychologist)
    .delete(psychologistController.deletePsychologist);

module.exports = router;
