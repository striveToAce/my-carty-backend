const data = require('../data');

const generateDiscount = () => {
  if (data.orderCount % data.nthOrderDiscount === 0) {
    const discountCode = `DISCOUNT${Date.now()}`;
    data.stats.discountCodesGenerated.push(discountCode);
    return { message: 'Discount code generated', code: discountCode };
  }
  throw new Error('Discount code not available yet');
};

const getStats = () => {
  return {
    totalItemsPurchased: data.stats.totalItemsPurchased,
    totalRevenue: data.stats.totalRevenue,
    discountCodesGenerated: data.stats.discountCodesGenerated,
    totalDiscountsGiven: data.stats.totalDiscountsGiven
  };
};

module.exports = { generateDiscount, getStats };