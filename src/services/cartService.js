const data = require("../data");

/**
 * Adds an item to the user's cart.
 * Validates the user ID and item details before adding.
 * @param {string} userId - The ID of the user.
 * @param {Object} item - The item to add to the cart.
 * @param {string} item.name - The name of the item.
 * @param {number} item.price - The price of the item.
 * @param {number} item.quantity - The quantity of the item.
 * @param {string} item.id - The ID of the item.
 * @returns {string} - A success message.
 * @throws {Error} - Throws an error if the user ID or item details are invalid.
 */
const addToCart = (userId, item) => {
  // Validate input: check if userId and all item details are provided
  if (
    !userId ||
    !item ||
    !item.name ||
    !item.price ||
    !item.quantity ||
    !item.id
  ) {
    throw new Error("Invalid item details or user ID");
  }

  // Initialize cart for the user if not already present
  if (!data.carts[userId]) {
    data.carts[userId] = [];
  }

  // Add the item to the user's cart
  data.carts[userId].push(item);
  return "Item added to cart successfully";
};

/**
 * Updates the quantity of an item in the user's cart.
 * If the quantity is 0, the item is removed from the cart.
 * @param {string} userId - The ID of the user.
 * @param {Object} item - The item to update with its new quantity.
 * @param {string} item.id - The ID of the item.
 * @param {number} item.quantity - The new quantity of the item.
 * @param {number} [item.price] - The price of the item (optional).
 * @returns {string} - A success message.
 * @throws {Error} - Throws an error if the user ID or item details are invalid.
 */
const updateCart = (userId, item) => {
  if (
    !userId ||
    !item ||
    !item.name ||
    !item.id ||
    (!item.quantity && item.quantity !== 0)
  ) {
    throw new Error("Invalid user ID or item details");
  }

  const cart = data.carts[userId];
  if (!cart || cart.length === 0) {
    throw new Error("Cart is empty");
  }

  // Find the item in the cart
  const itemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
  if (itemIndex === -1) {
    throw new Error("Item not found in cart");
  }

  // Update item details
  if (item.quantity === 0) {
    // Remove item if quantity is 0
    cart.splice(itemIndex, 1);
  } else {
    cart[itemIndex].quantity = item.quantity;
    if (item.price) {
      cart[itemIndex].price = item.price;
    }
  }

  return "Cart updated successfully";
};

const removeFromCart = (userId, itemId) => {
  if (!userId || !itemId) {
    throw new Error("ItemId or UserId is missing");
  }

  if (!data.carts[userId]) {
    data.carts[userId] = [];
  }

  const updatedCarts = data.carts[userId].filter((item) => item.id !== itemId);
  data.carts[userId] = updatedCarts;
  return "Item removed from cart successfully";
};

/**
 * Processes the checkout for a user's cart, applying a discount if a valid code is provided.
 * Updates order history and statistics, and clears the user's cart.
 * @param {string} userId - The ID of the user.
 * @param {string} [discountCode] - The discount code to apply (optional).
 * @returns {Object} - An object containing the total amount, discount applied, and a success message.
 * @throws {Error} - Throws an error if the cart is empty or if an invalid discount code is provided.
 */
const checkout = (userId, discountCode) => {
  const cart = data.carts[userId];
  if (!cart || cart.length === 0) {
    throw new Error("Cart is empty");
  }

  // Calculate the total price of all items in the cart
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discountApplied = 0;

  // Check if a discount code is provided and valid
  if (discountCode) {
    const validCode = data.stats.discountCodesGenerated.find(
      (code) => code === discountCode
    );
    if (validCode) {
      // Apply a 10% discount
      discountApplied = total * 0.1;
      total -= discountApplied;

      // Remove the used discount code
      data.stats.discountCodesGenerated = data.stats.discountCodesGenerated.filter(
        (code) => code !== discountCode
      );
    } else {
      throw new Error("Invalid discount code");
    }
  }

  // Record the order and update statistics
  data.orders.push({ userId, totalAmount: total, discountApplied });
  data.stats.totalItemsPurchased += cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  data.stats.totalRevenue += total;
  data.stats.totalDiscountsGiven += discountApplied;
  data.orderCount++;

  // Clear the user's cart
  data.carts[userId] = [];
  
  return { total, discountApplied, message: "Order placed successfully!" };
};

module.exports = { addToCart, checkout, removeFromCart, updateCart };
