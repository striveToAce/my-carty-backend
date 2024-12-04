const data = require('../data');

const addToCart = (userId, item) => {
  if (!userId || !item || !item.name || !item.price || !item.quantity) {
    throw new Error('Invalid item details or user ID');
  }

  if (!data.carts[userId]) {
    data.carts[userId] = [];
  }

  data.carts[userId].push(item);
  return 'Item added to cart successfully';
};

const checkout = (userId, discountCode) => {
  const cart = data.carts[userId];
  if (!cart || cart.length === 0) {
    throw new Error('Cart is empty');
  }

  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discountApplied = 0;

  if (discountCode) {
    const validCode = data.stats.discountCodesGenerated.find(code => code === discountCode);
    if (validCode) {
      discountApplied = total * 0.1;
      total -= discountApplied;

      data.stats.discountCodesGenerated = data.stats.discountCodesGenerated.filter(code => code !== discountCode);
    } else {
      throw new Error('Invalid discount code');
    }
  }

  data.orders.push({ userId, totalAmount: total, discountApplied });
  data.stats.totalItemsPurchased += cart.reduce((sum, item) => sum + item.quantity, 0);
  data.stats.totalRevenue += total;
  data.stats.totalDiscountsGiven += discountApplied;
  data.orderCount++;

  data.carts[userId] = []; // Clear cart
  return { total, discountApplied, message: 'Order placed successfully!' };
};

module.exports = { addToCart, checkout };