const expireds = require('../models/expired');

// @desc  Get all expireds
// @route GET /api/v1/expireds
// @access Public
exports.getallExpired = async (req, res, next) => {
  try {
    const expired = await expireds.find();

    return res.status(200).json({
      success: true,
      count: expired.length,
      data: expired
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

  // @desc  Get store expired sub
  // @route GET /api/v1/expired
  // @access Public
  exports.getstExpired = async (req, res, next) => {
      try {
        const expired = await expireds.find({storeid: req.body.storeid});
    
        return res.status(200).json({
          success: true,
          count: expired.length,
          data: expired
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
    };
// @desc  Create a expired
// @route POST /api/v1/expired
// @access Public
exports.addExpired = async (req, res, next) => {
  try {
    const expired = await expireds.create(req.body);

    return res.status(201).json({
      success: true,
      data: expired
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This expired already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  delete a expired
// @route POST /api/v1/expired
// @access Public
exports.deleteExpired = async (req, res, next) => {
    try {
      const expired = await expireds.deleteOne({_id: req.body.id});
  
      return res.status(201).json({
        success: true,
        data: expired
      });
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'entry doesnt already exist' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };
