const adminService = require('../services/adminService');

const generateDiscount = (req, res) => {
  try {
    const result = adminService.generateDiscount();
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getStats = (req, res) => {
  try {
    const result = adminService.getStats();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateDiscount, getStats };