const payments = require('../models/payment');

// @desc  Get all payouts
// @route GET /api/v1/payouts
// @access Public
exports.getallPayment = async (req, res, next) => {
  try {
    const payment = await payments.find();

    return res.status(200).json({
      success: true,
      count: payment.length,
      data: payment
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

  // @desc  Get agent payouts
  // @route GET /api/v1/payouts
  // @access Public
  exports.getagPayment = async (req, res, next) => {
      try {
        const payment = await payments.find({agentid: req.body.agentid});
    
        return res.status(200).json({
          success: true,
          count: payment.length,
          data: payment
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
    };
// @desc  Create a payment
// @route POST /api/v1/payment
// @access Public
exports.addPayment = async (req, res, next) => {
  try {
    const payment = await payments.create(req.body);

    return res.status(201).json({
      success: true,
      data: payment
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This payment already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
