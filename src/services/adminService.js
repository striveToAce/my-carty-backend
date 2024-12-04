const data = require('../data');

/**
 * Generates a new discount code if the order count is a multiple of nthOrderDiscount.
 * @returns {Object} - An object containing a message and the generated discount code.
 * @throws {Error} - Throws an error if a discount code is not available yet.
 */
const generateDiscount = () => {
  if (data.orderCount % data.nthOrderDiscount === 0) {
    const discountCode = `DISCOUNT${Date.now()}`;
    data.stats.discountCodesGenerated.push(discountCode);
    return {
      message: 'Discount code generated',
      code: discountCode
    };
  }
  throw new Error('Discount code not available yet');
};

/**
 * Retrieves statistical information about sales and discount activities.
 * @returns {Object} An object containing various statistics such as total items purchased,
 * total revenue, discount codes generated, and total discounts given.
 */
const getStats = () => {
  return {
    // Total number of items purchased across all orders
    totalItemsPurchased: data.stats.totalItemsPurchased,
    
    // Total revenue generated from all orders
    totalRevenue: data.stats.totalRevenue,
    
    // List of discount codes that have been generated
    discountCodesGenerated: data.stats.discountCodesGenerated,
    
    // Total value of discounts given to customers
    totalDiscountsGiven: data.stats.totalDiscountsGiven
  };
};

module.exports = { generateDiscount, getStats };