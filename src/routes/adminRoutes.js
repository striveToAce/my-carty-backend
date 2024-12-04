const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.post('/discount/generate', adminController.generateDiscount);
router.get('/stats', adminController.getStats);

module.exports = router;