const withdrawals = require('../models/withdrawal');

// @desc  Get all withdrawal
// @route GET /api/v1/withdrawal
// @access Public
exports.getallWithdrawal = async (req, res, next) => {
  try {
    const withdrawal = await withdrawals.find();

    return res.status(200).json({
      success: true,
      count: withdrawal.length,
      data: withdrawal
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Get agent withdrawal
// @route GET /api/v1/withdrawal
// @access Public
exports.getagWithdrawal = async (req, res, next) => {
    try {
      const withdrawal = await withdrawals.find({agentid: req.body.agentid});
  
      return res.status(200).json({
        success: true,
        count: withdrawal.length,
        data: withdrawal
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// @desc  Patch agent withdrawal
// @route GET /api/v1/withdrawal
// @access Public
exports.upWithdrawal = async (req, res, next) => {
  try {
    const withdrawal = await withdrawals.findByIdAndUpdate(req.body.id,{$set: {status: req.body.status}},{ new: true });

    return res.status(200).json({
      success: true,
      data: withdrawal
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// @desc  Create a withdrawal
// @route POST /api/v1/withdrawal
// @access Public
exports.addWithdrawal = async (req, res, next) => {
  try {
    const withdrawal = await withdrawals.create(req.body);

    return res.status(201).json({
      success: true,
      data: withdrawal
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This withdrawal already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
