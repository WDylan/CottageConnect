const express = require('express');
const router = express.Router();
const prestationController = require('../controllers/prestationController');

router.get('/', prestationController.findAll);
router.get('/:id', prestationController.findById);
router.post('/', prestationController.create);
router.put('/:id', prestationController.update);
router.delete('/:id', prestationController.delete);

module.exports = router;