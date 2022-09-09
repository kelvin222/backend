const coschats = require('../models/coschat');

// @desc  Get all coschats
// @route GET /api/v1/coschats
// @access Public
exports.getCoschat = async (req, res, next) => {
    try {
      const { cate, status} = req.body;
      const coschat = await coschats.find({$and: [
        {cate:cate},{status: status}
      ]});
  
      return res.status(200).json({
        success: true,
        count: coschat.length,
        data: coschat
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

// @desc  Get all coschats
// @route GET /api/v1/coschats
// @access Public
exports.getUserCoschat = async (req, res, next) => {
  try {
    const { userid, status} = req.body;
    const coschat = await coschats.find({$and: [
      {cosid:userid},{status: status}
    ]});

    return res.status(200).json({
      success: true,
      count: coschat.length,
      data: coschat
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
// @desc  Get all coschats
// @route GET /api/v1/coschats
// @access Public
exports.getStoreCoschat = async (req, res, next) => {
    try {
      const { storeid, status} = req.body;
      const coschat = await coschats.find({$and: [
        {cosid:storeid},{status: status}
      ]});
  
      return res.status(200).json({
        success: true,
        count: coschat.length,
        data: coschat
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

// @desc  Get all coschats
// @route GET /api/v1/coschats
// @access Public
exports.getAgentCoschat = async (req, res, next) => {
    try {
      const {agentid,status} = req.body;
      const coschat = await coschats.find({$and: [
        {cosid:agentid},{status: status}
      ]});
  
      return res.status(200).json({
        success: true,
        count: coschat.length,
        data: coschat
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };


// @desc  Create a coschat
// @route POST /api/v1/coschat
// @access Public
exports.addCoschat = async (req, res, next) => {
  try {
    const {status,cosid} = req.body;
    const checkcoschat = await coschats.find({$and: [
      {cosid:cosid},{status: status}
    ]});
      if(checkcoschat.length == 0){
    const coschat = await coschats.create(req.body);

    return res.status(201).json({
      success: true,
      data: coschat
    });
} else{
    return res.status(400).json({ error: 'Open Customer care ticket exists' });
}
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Patch product details
// @route GET /api/v1/product
// @access Public
exports.upCoschat = async (req, res, next) => {
  try {
    const coschat = await coschats.findByIdAndUpdate(req.body.id,{$set: req.body},{ new: true });

    return res.status(200).json({
      success: true,
      data: coschat
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}; 

  // @desc  delete a coschatmessage
  // @route POST /api/v1/coschat
  // @access Public
  exports.deleteCoschat = async (req, res, next) => {
      try {
        const coschat = await coschats.deleteOne({_id: req.body.id});
    
        return res.status(201).json({
          success: true,
          data: coschat
        });
      } catch (err) {
        console.error(err);
        if (err.code === 11000) {
          return res.status(400).json({ error: 'entry doesnt already exist' });
        }
        res.status(500).json({ error: 'Server error' });
      }
    };

// @desc  delete coschat message
// @route POST /api/v1/coschat
/* @access Public
exports.deletecoschatmess = async (req, res, next) => {
    try {
      const {id,orderid,capsuleid} = req.body; 
    const coschatcheck = await coschats.find({$and: [
      {_id:id},{orderid: orderid}
    ]});
    if(coschatcheck == 0){
      return res.status(400).json({ error: 'coschat order does not exist' });
    } else{
      const coschat = await coschats.updateOne({
        _id: id,
        capsule: {$elemMatch:{_id: capsuleid}}
    },{
        $pull:{capsule: {_id: capsuleid}}}
  );
  res.json(cart);
    }
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'coschat not found' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };*/