const chats = require('../models/chat');

// @desc  Get all chats
// @route GET /api/v1/chats
// @access Public
exports.getUserChat = async (req, res, next) => {
    try {
      const { userid} = req.body;
      const chat = await chats.find(
          {userid: userid});
  
      return res.status(200).json({
        success: true,
        count: chat.length,
        data: chat
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

// @desc  Get all chats
// @route GET /api/v1/chats
// @access Public
exports.getStoreChat = async (req, res, next) => {
    try {
      const { storeid} = req.body;
      const chat = await chats.find({storeid: storeid});
  
      return res.status(200).json({
        success: true,
        count: chat.length,
        data: chat
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

// @desc  Get all chats
// @route GET /api/v1/chats
// @access Public
exports.getOrderChat = async (req, res, next) => {
    try {
      const {orderid} = req.body;
      const chat = await chats.find({orderid: orderid});
  
      return res.status(200).json({
        success: true,
        count: chat.length,
        data: chat
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };


// @desc  Create a chat
// @route POST /api/v1/chat
// @access Public
exports.addChat = async (req, res, next) => {
  try {
    const checkchat = await chats.find(
        {orderid:orderid});
      if(checkchat.length == 0){
    const chat = await chats.create(req.body);

    return res.status(201).json({
      success: true,
      data: chat
    });
} else{
    return res.status(400).json({ error: 'This chat already exists' });
}
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This chat already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

  // @desc  delete a chatmessage
  // @route POST /api/v1/chat
  // @access Public
  exports.deleteChat = async (req, res, next) => {
      try {
        const chat = await chats.deleteOne({_id: req.body.id});
    
        return res.status(201).json({
          success: true,
          data: chat
        });
      } catch (err) {
        console.error(err);
        if (err.code === 11000) {
          return res.status(400).json({ error: 'entry doesnt already exist' });
        }
        res.status(500).json({ error: 'Server error' });
      }
    };

// @desc  delete chat message
// @route POST /api/v1/chat
// @access Public
exports.deleteChatmess = async (req, res, next) => {
    try {
      const {id,orderid,capsuleid} = req.body; 
    const chatcheck = await chats.find({$and: [
      {_id:id},{orderid: orderid}
    ]});
    if(chatcheck == 0){
      return res.status(400).json({ error: 'chat order does not exist' });
    } else{
      const chat = await chats.updateOne({
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
        return res.status(400).json({ error: 'chat not found' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };