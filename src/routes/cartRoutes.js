const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateCart);
router.post('/checkout', cartController.checkout);
router.delete('/:id', cartController.addToCart);

module.exports = router;