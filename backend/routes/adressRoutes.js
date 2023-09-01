const express = require('express');
const router = express.Router();
const adressController = require('../controllers/adressController');

router.get('/', adressController.findAll);
router.get('/:id', adressController.findById);
router.post('/', adressController.create);
router.put('/:id', adressController.update);
router.delete('/:id', adressController.delete);

module.exports = router;