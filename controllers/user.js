const users = require('../models/user');
const products = require('../models/product');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const middleware = require("../middleware");
const path = require("path");
const config = require('../config');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/userimage");
  },
  filename: (req, file, cb) => {
    cb(null, req.decoded._id + ".jpg");
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024,
  },
});
exports.addUserImage = (middleware.checkToken, upload.single("image"), async (req, res) => {
  const pimage = req.file;
  if(!pimage){
    return res.status(400).send('image upload error');
  } else {
  users.findOneAndUpdate(
    { _id: req.decoded._id},
    {
      $set: {
        image: pimage.path,
      },
    },
    { new: true },
    (err, user) => {
      if (err) return res.status(500).send(err);
      const response = {
        message: "image successfully updated",
        data: user,
      };
      return res.status(200).send(response);
    }
    );
  }
});


// @desc  Get all users
// @route GET /api/v1/users
// @access Public
exports.getallUser = async (req, res, next) => {
  try {
    const user = await users.find();

    return res.status(200).json({
      success: true,
      count: user.length,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Get  users by id
// @route GET /api/v1/users
// @access Public
exports.getUserp = async (req, res, next) => {
  try {
      const cookie = req.cookies.jwt;
      const claims = jwt.verify(cookie, config.key);

      if (!claims) {
          return res.status(401).send({
              message: 'unauthenticated'
          })
      }
    const user = await users.find({email: claims.email});

    return res.status(200).json({
      success: true,
      count: user.length,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Get  users by id
// @route GET /api/v1/users
// @access Public
exports.getUser = (middleware.checkToken, async (req, res) => {
  try {
    const user = await users.find({_id: req.decoded._id});

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
  
// @desc  Create a user
// @route POST /api/v1/user
// @access Public
exports.addUser = async (req, res, next) => {
    let user = await users.findOne({ email: req.body.email });
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    if(user){
            return res.status(400).send('User already registered');
        }else{
            const user = new users({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
              address: req.body.address,
              state: req.body.state,
              contact: req.body.contact,
              location: req.body.location,
        });
      const result = await user.save()
        const {password, ...data} = await result.toJSON();
        return res.status(201).json({
          success: true,
          data: data,
        });
        }
      };  
// @desc  Create a user
// @route POST /api/v1/user
// @access Public
exports.logUser = async (req, res, next) => {
  let user = await users.findOne({ email: req.body.email });
  if(!user){
          return res.status(400).send('user does not exist');
      }else{
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(err){
                return res.status(400).json({ error: 'password does not match' });
            }
            if(result){
              console.log('password match')
              const token = jwt.sign({_id: req.body._id}, config.key)
              res.cookie('jwt', token, {
                  httpOnly: true,
                  maxAge: 24 * 60 * 60 * 1000 * 14 // 2 weeks
              })
              res.json({"success" : true, "token" : token});
            }
          })
    
      }
    };
  
// @desc  Patch user details
// @route GET /api/v1/user
// @access Public
exports.upUser = (middleware.checkToken,async (req, res, next) => {
  try {
    const user = await users.findByIdAndUpdate(req.decoded._id,{$set: req.body},{ new: true });

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc  Patch user password
// @route GET /api/v1/user
// @access Public
exports.upUserPass = (middleware.checkToken,async (req, res, next) => {
  let {oldPassword, newPassword } = req.body;
  try {
    const check = await users.findOne({ _id: req.decoded._id });
    if (!check){
      return res.json({
        error:"invalid user"
      });
    } else {
      const oldPassCheck = await bcrypt.compare(oldPassword, check.password);
      if (oldPassCheck) {  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    const user = await users.findByIdAndUpdate(req.decoded._id, {password: hashedPassword});
    return res.status(200).json({
      success: true,
      data: user
    });
  } else {
    return res.json({
      error: "Your old password is wrong!!",
    });
  }
  }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
// @desc  admin a user password change
// @route POST /api/v1/expired
// @access Public
exports.upUserAdPass = async (req, res, next) => {
  let { email, newPassword } = req.body;
  try {
    const check = await users.findOne({ email: email });
    if (!check){
      return res.json({
        error:"invalid user"
      });
    } else { 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    const user = await users.findOneAndUpdate({email: email}, {$set: {
      password: hashedPassword,
    }});
    return res.status(200).json({
      success: true,
      data: user
    });
  } 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  delete a user
// @route POST /api/v1/expired
// @access Public
exports.deleteUser = (middleware.checkToken, async (req, res, next) => {
  try {
    const user = await users.deleteOne({_id: req.decoded._id});

    return res.status(201).json({
      success: true
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'user not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc  post cart
// @route POST /api/v1/usercart
// @access Public
exports.postCart = async (req, res, next) => {
  try {
    const { userid,pid,sid,quantity,pack,proname,amount,price} = req.body; 
    const cproduct = await products.findById(pid);
    let user = await users.findById(userid);


    const checkst = await users.find({$and: [
      {_id:userid},
      {"cart.storeid": sid}
    ]});
    if(checkst.length == 0){
      const cart = await user.cart.push({
        storeid: sid,
        pack: pack
      });
      userx = await user.save();
      res.json(userx);
    }else{
      const cartUp = await users.find({$and: [
        {_id:userid},{"cart.storeid": sid},{"cart.pack.productid": pid}
      ]});
      if(cartUp == 0){
        const cart = await users.updateOne({
          _id: userid,
          cart: {$elemMatch:{storeid: sid}}
      },{
          $push:{"cart.$.pack": pack}}
    );
    res.json(cart);
      } else{
        return res.status(400).json({ error: 'product exists in your cart' });
      }}
      
    
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
// @desc  post cart
// @route POST /api/v1/usercart
// @access Public
exports.deleteCart = async (req, res, next) => {
  try {
    const {userid,cid} = req.body; 
    const cartUp = await users.find({$and: [
      {_id:userid},{"cart._id": cid},
    ]});
    if(cartUp == 0){
      return res.status(400).json({ error: 'cart doest not exist' });      
   } else{
      const cart = await users.updateOne({
        _id: userid,
        cart: {$elemMatch:{_id: cid}}
    },{
        $pull:{cart: {_id: cid}}});
  res.json(cartUp);
    }
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'cart not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
// @desc  post cart
// @route POST /api/v1/usercart
// @access Public
exports.deleteCartPro = async (req, res, next) => {
  try {
    const {userid,cid,packid} = req.body; 
  const cartUp = await users.find({$and: [
    {_id:userid},{"cart._id": cid},{"cart.pack._id": packid}
  ]});
  if(cartUp == 0){
    return res.status(400).json({ error: 'product exists in your cart' });
  } else{
    const cart = await users.updateOne({
      _id: userid,
      cart: {$elemMatch:{_id: cid}}
  },{
      $pull:{"cart.$.pack": {_id: packid}}}
);
res.json(cart);
  }
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'cart not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
