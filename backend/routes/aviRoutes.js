const express = require('express');
const router = express.Router();
const aviController = require('../controllers/aviController');

router.get('/', aviController.findAll);
router.get('/:id', aviController.findById);
router.post('/', aviController.create);
router.put('/:id', aviController.update);
router.delete('/:id', aviController.delete);

module.exports = router;