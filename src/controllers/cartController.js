const cartService = require('../services/cartService');

const addToCart = (req, res) => {
  try {
    const { userId, item } = req.body;
    const result = cartService.addToCart(userId, item);
    res.json({ message: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const checkout = (req, res) => {
  try {
    const { userId, discountCode } = req.body;
    const result = cartService.checkout(userId, discountCode);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addToCart, checkout };