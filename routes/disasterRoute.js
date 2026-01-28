const express = require('express');
const router = express.Router();
const disasterController = require('../controllers/disasterController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, disasterController.createDisaster);
router.get('/', authMiddleware, disasterController.getDisasters);
router.get('/:id', authMiddleware, disasterController.getDisasterById);
router.put('/:id', authMiddleware, disasterController.updateDisaster);
router.delete('/:id', authMiddleware, disasterController.deleteDisaster);

module.exports = router;
