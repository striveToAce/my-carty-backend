const data = {
    carts: {}, // { userId: [{ name, price, quantity }] }
    orders: [], // [{ userId, totalAmount, discountApplied }]
    stats: {
      totalItemsPurchased: 0,
      totalRevenue: 0,
      totalDiscountsGiven: 0,
      discountCodesGenerated: []
    },
    orderCount: 0, // Track number of orders for nth discount
    nthOrderDiscount: 5 // Every 5th order gets a discount
  };
  
  module.exports = data;