const payouts = require('../models/payout');

// @desc  Get all payouts
// @route GET /api/v1/payouts
// @access Public
exports.getallPayout = async (req, res, next) => {
  try {
    const payout = await payouts.find();

    return res.status(200).json({
      success: true,
      count: payout.length,
      data: payout
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Get admin payouts
// @route GET /api/v1/payouts
// @access Public
exports.getadPayout = async (req, res, next) => {
    try {
      const payout = await payouts.find({adminid: req.body.adminid});
  
      return res.status(200).json({
        success: true,
        count: payout.length,
        data: payout
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  // @desc  Get agent payouts
  // @route GET /api/v1/payouts
  // @access Public
  exports.getagPayout = async (req, res, next) => {
      try {
        const payout = await payouts.find({agentid: req.body.agentid});
    
        return res.status(200).json({
          success: true,
          count: payout.length,
          data: payout
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
    };
// @desc  Create a payout
// @route POST /api/v1/payout
// @access Public
exports.addPayout = async (req, res, next) => {
  try {
    const payout = await payouts.create(req.body);

    return res.status(201).json({
      success: true,
      data: payout
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This payout already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
