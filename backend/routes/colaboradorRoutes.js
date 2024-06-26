// routes/collaboratorRoutes.js
const express = require('express');
const collaboratorController = require('../controllers/colaboradorController');

const router = express.Router();

router
    .route('/')
    .get(collaboratorController.getAllCollaborators)
    .post(collaboratorController.createCollaborator);

router
    .route('/:id')
    .get(collaboratorController.getCollaborator)
    .patch(collaboratorController.updateCollaborator)
    .delete(collaboratorController.deleteCollaborator);

module.exports = router;
