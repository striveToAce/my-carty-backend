const express = require("express");
const cartController = require("../controllers/cartController");
const {
  validateAddToCart,
  validationResultHandler,
  validateCheckout,
  validateCartRemoval,
  validateUpdateCart,
} = require("../validators/cartValidator");
const router = express.Router();

router.post(
  "/add",
  validateAddToCart,
  validationResultHandler,
  cartController.addToCart
);

router.post(
  "/update",
  validateUpdateCart,
  validationResultHandler,
  cartController.updateCart
);

router.post(
  "/checkout",
  validateCheckout,
  validationResultHandler,
  cartController.checkout
);
router.post(
  "/removeItem",
  validateCartRemoval,
  validationResultHandler,
  cartController.removeFromCart
);

module.exports = router;