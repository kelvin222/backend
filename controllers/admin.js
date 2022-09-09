const admins = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path");
const fileHelper = require('../util/file');

exports.addAdminImage = async (req, res, next) => {
  const pimage = req.file;
  if(!image){
    return res.status(400).send('image upload error');
  } else {
    admins.findOneAndUpdate(
      { email: req.decoded.email },
      {
        $set: {
          image: pimage.path,
        },
      },
      { new: true },
      (err, admin) => {
        if (err) return res.status(500).send(err);
        const response = {
          message: "image successfully updated",
          data: admin,
        };
        return res.status(200).send(response);
      }
    );
  }
};


// @desc  Get all admins
// @route GET /api/v1/admins
// @access Public
exports.getAllAdmin = async (req, res, next) => {
  try {
    const admin = await admins.find();

    return res.status(200).json({
      success: true,
      count: admin.length,
      data: admin
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Get  admins by id
// @route GET /api/v1/admins
// @access Public
exports.getAdminp = async (req, res, next) => {
  try {
      const cookie = req.cookies.jwt;
      const claims = jwt.verify(cookie, 'Jesus');

      if (!claims) {
          return res.status(401).send({
              message: 'unauthenticated'
          })
      }
    const admin = await admins.find({_id: claims._id});

    return res.status(200).json({
      success: true,
      count: admin.length,
      data: admin
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Get  admins by id
// @route GET /api/v1/admins
// @access Public
exports.getAdmin = async (req, res, next) => {
  try {
    const admin = await admins.find({_id: req.body.id});

    return res.status(200).json({
      success: true,
      data: admin
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
  
// @desc  Create a admin
// @route POST /api/v1/admin
// @access Public
exports.addAdmin = async (req, res, next) => {
    let admin = await admins.findOne({ email: req.body.email });
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    if(admin){
            return res.status(400).send('admin already registered');
        }else{
            const admin = new admins({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
              address: req.body.address,
              state: req.body.state,
              contact: req.body.contact,
        });
      const result = await admin.save()
        const {password, ...data} = await result.toJSON();
        return res.status(201).json({
          success: true,
          data: data
        });
        }
      };  
// @desc  Create a admin
// @route POST /api/v1/admin
// @access Public
exports.logAdmin = async (req, res, next) => {
  let admin = await admins.findOne({ email: req.body.email });
  if(!admin){
          return res.status(400).send('admin does not exist');
      }else{
        bcrypt.compare(req.body.password,admin.password,(err,result)=>{
            if(err){
                return res.status(400).json({ error: 'password does not match' });
            }
            if(result){
              console.log('password match')
              const token = jwt.sign({_id: admin._id}, "Jesus")
              res.cookie('jwt', token, {
                  httpOnly: true,
                  maxAge: 24 * 60 * 60 * 1000 * 14 // 2 weeks
              })
              res.json({"success" : true, "token" : token});
            }
          })
    
      }
    };
  
// @desc  Patch admin details
// @route GET /api/v1/admin
// @access Public
exports.upAdmin = async (req, res, next) => {
  try {
    const admin = await admins.findByIdAndUpdate(req.body.id,{$set: req.body},{ new: true });

    return res.status(200).json({
      success: true,
      data: admin
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Patch admin password
// @route GET /api/v1/admin
// @access Public
exports.upAdminPass = async (req, res, next) => {
  let { id, oldPassword, newPassword } = req.body;
  try {
    const check = await admins.findOne({ _id: id });
    if (!check){
      return res.json({
        error:"invalid admin"
      });
    } else {
      const oldPassCheck = await bcrypt.compare(oldPassword, check.password);
      if (oldPassCheck) {  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    const admin = await admins.findByIdAndUpdate(id, {password: hashedPassword});
    return res.status(200).json({
      success: true,
      data: admin
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
};
// @desc  admin a admin password change
// @route POST /api/v1/expired
// @access Public
exports.upAdminAdPass = async (req, res, next) => {
  let { id, newPassword } = req.body;
  try {
    const check = await admins.findOne({ _id: id });
    if (!check){
      return res.json({
        error:"invalid admin"
      });
    } else { 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    const admin = await admins.findByIdAndUpdate(id, {password: hashedPassword});
    return res.status(200).json({
      success: true,
      data: admin
    });
  } 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  delete a admin
// @route POST /api/v1/expired
// @access Public
exports.deleteAdmin = async (req, res, next) => {
  try {
    const admin = await admins.deleteOne({_id: req.body.id});

    return res.status(201).json({
      success: true
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'admin not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};