const orders = require('../models/order');

// @desc  Get all orders
// @route GET /api/v1/orders
// @access Public
exports.getOrder = async (req, res, next) => {
    try {
      const order = await orders.find();
  
      return res.status(200).json({
        success: true,
        count: order.length,
        data: order
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  // @desc  Get all orders
  // @route GET /api/v1/orders
  // @access Public
  exports.getStoreOrder = async (req, res, next) => {
      try {
        const { storeid,status} = req.body;
        const order = await orders.find({$and: [
            {storeid: storeid},
            {status: status}
          ]});
    
        return res.status(200).json({
          success: true,
          count: order.length,
          data: order
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
    };

// @desc  Get all orders
// @route GET /api/v1/orders
// @access Public
exports.getUserOrder = async (req, res, next) => {
    try {
        const { userid,status} = req.body;
      const order = await orders.find({$and: [
        {userid: userid},
        {status: status}
      ]});
  
      return res.status(200).json({
        success: true,
        count: order.length,
        data: order
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };


// @desc  Create a order
// @route POST /api/v1/order
// @access Public
exports.addOrder = async (req, res, next) => {
  try {
    const order = await orders.create(req.body);
    return res.status(201).json({
      success: true,
      data: order
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This order already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  delete a order
// @route POST /api/v1/order
// @access Public
exports.deleteOrder = async (req, res, next) => {
    try {
      const order = await orders.deleteOne({_id: req.body.oid});
  
      return res.status(201).json({
        success: true,
        data: order
      });
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'entry doesnt exist' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };
