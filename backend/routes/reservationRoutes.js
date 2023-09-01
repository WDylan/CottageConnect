const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/', reservationController.findAll);
router.get('/:id', reservationController.findById);
router.get('/user/:id_user', reservationController.findByUser)
router.post('/', reservationController.create);
router.put('/:id', reservationController.update);
router.delete('/:id', reservationController.delete);

module.exports = router;