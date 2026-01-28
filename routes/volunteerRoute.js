const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, volunteerController.createVolunteer);
router.get('/', authMiddleware, volunteerController.getVolunteers);
router.get('/:id', authMiddleware, volunteerController.getVolunteerById);
router.delete('/:id', authMiddleware, volunteerController.deleteVolunteer);

module.exports = router;