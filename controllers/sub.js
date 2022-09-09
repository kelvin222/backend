const subs = require('../models/sub');

// @desc  Get all subs
// @route GET /api/v1/subs
// @access Public
exports.getallSub = async (req, res, next) => {
  try {
    const sub = await subs.find();

    return res.status(200).json({
      success: true,
      count: sub.length,
      data: sub
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

  // @desc  Get store sub
  // @route GET /api/v1/sub
  // @access Public
  exports.getstSub = async (req, res, next) => {
      try {
        const sub = await subs.find({storeid: req.body.storeid});
    
        return res.status(200).json({
          success: true,
          count: sub.length,
          data: sub
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
    };
// @desc  Create a sub
// @route POST /api/v1/sub
// @access Public
exports.addSub = async (req, res, next) => {
  try {
    const sub = await subs.create(req.body);

    return res.status(201).json({
      success: true,
      data: sub
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This sub already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  delete a sub
// @route POST /api/v1/sub
// @access Public
exports.deleteSub = async (req, res, next) => {
    try {
      const sub = await subs.deleteOne({_id: req.body.id});
  
      return res.status(201).json({
        success: true,
        data: sub
      });
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'entry doesnt already exist' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };
