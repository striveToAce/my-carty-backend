const { body, validationResult } = require("express-validator");

const validateAddToCart = [
  body("userId")
    .isString()
    .notEmpty()
    .withMessage("User ID is required and must be a string"),
  body("item").isObject().withMessage("Item must be an object"),
  body("item.id")
    .isString()
    .notEmpty()
    .withMessage("Item ID is required and must be a string"),
  body("item.name")
    .isString()
    .notEmpty()
    .withMessage("Item name is required and must be a string"),
  body("item.price")
    .isFloat({ gt: 0 })
    .withMessage("Item price must be a positive number"),
  body("item.quantity")
    .isInt({ gt: 0 })
    .withMessage("Item quantity must be a positive integer"),
];

const validateUpdateCart = [
  body("userId")
    .isString()
    .notEmpty()
    .withMessage("User ID is required and must be a string"),
  body("item").isObject().withMessage("Item must be an object"),
  body("item.id")
    .isString()
    .notEmpty()
    .withMessage("Item ID is required and must be a string"),
  body("item.name")
    .isString()
    .notEmpty()
    .withMessage("Item name is required and must be a string"),
  body("item.quantity")
    .isInt({ min: 0 })
    .withMessage("Item quantity must be a non-negative integer"),
  body("item.price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Item price must be a positive number if provided"),
];

const validateCartRemoval = [
    body("userId")
      .isString()
      .notEmpty()
      .withMessage("User ID is required and must be a string"),
    body("itemId")
      .isString()
      .notEmpty()
      .withMessage("Item ID is required and must be a string"),
  ];

const validateCheckout = [
  body("userId")
    .isString()
    .notEmpty()
    .withMessage("User ID is required and must be a string"),
  body("discountCode")
    .optional()
    .isString()
    .withMessage("Discount code must be a string"),
];

const validationResultHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateAddToCart,
  validateUpdateCart,
  validateCheckout,
  validateCartRemoval,
  validationResultHandler,
};
