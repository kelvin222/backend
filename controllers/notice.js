const notices = require('../models/notice');

// @desc  Get all notices
// @route GET /api/v1/notice
// @access Public
exports.getallNotice = async (req, res, next) => {
  try {
    const notice = await notices.find();

    return res.status(200).json({
      success: true,
      count: notice.length,
      data: notice
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// @desc  Create a notice
// @route POST /api/v1/notice
// @access Public
exports.addNotice = async (req, res, next) => {
  try {
    const notice = await notices.create(req.body);

    return res.status(201).json({
      success: true,
      data: notice
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This notice already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  delete a notice
// @route POST /api/v1/notice
// @access Public
exports.deleteNotice = async (req, res, next) => {
    try {
      const notice = await notices.deleteOne({_id: req.body.id});
  
      return res.status(201).json({
        success: true,
        data: notice
      });
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'entry doesnt already exist' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };
