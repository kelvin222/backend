const sublists = require('../models/sublist');

// @desc  Get all sublists
// @route GET /api/v1/sublists
// @access Public
exports.getallSublist = async (req, res, next) => {
  try {
    const sublist = await sublists.find();

    return res.status(200).json({
      success: true,
      count: sublist.length,
      data: sublist
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// @desc  Create a sublist
// @route POST /api/v1/sublist
// @access Public
exports.addSublist = async (req, res, next) => {
  try {
    const sublist = await sublists.create(req.body);

    return res.status(201).json({
      success: true,
      data: sublist
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This sublist already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  delete a sublist
// @route POST /api/v1/sublist
// @access Public
exports.deleteSublist = async (req, res, next) => {
    try {
      const sublist = await sublists.deleteOne({_id: req.body.id});
  
      return res.status(201).json({
        success: true,
        data: sublist
      });
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'entry doesnt already exist' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };
