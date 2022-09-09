const agents = require('../models/agent');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path");
const fileHelper = require('../util/file');

exports.addAgentImage = async (req, res, next) => {
  const pimage = req.file;
  if(!image){
    return res.status(400).send('image upload error');
  } else {
    agents.findOneAndUpdate(
      { email: req.decoded.email },
      {
        $set: {
          image: pimage.path,
        },
      },
      { new: true },
      (err, agent) => {
        if (err) return res.status(500).send(err);
        const response = {
          message: "image successfully updated",
          data: agent,
        };
        return res.status(200).send(response);
      }
    );
  }
};


// @desc  Get all agents
// @route GET /api/v1/agents
// @access Public
exports.getAllAgent = async (req, res, next) => {
  try {
    const agent = await agents.find();

    return res.status(200).json({
      success: true,
      count: agent.length,
      data: agent
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Get  agents by id
// @route GET /api/v1/agents
// @access Public
exports.getAgentp = async (req, res, next) => {
  try {
      const cookie = req.cookies.jwt;
      const claims = jwt.verify(cookie, 'Jesus');

      if (!claims) {
          return res.status(401).send({
              message: 'unauthenticated'
          })
      }
    const agent = await agents.find({_id: claims._id});

    return res.status(200).json({
      success: true,
      count: agent.length,
      data: agent
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Get  agents by id
// @route GET /api/v1/agents
// @access Public
exports.getAgent = async (req, res, next) => {
  try {
    const agent = await agents.find({_id: req.body.id});

    return res.status(200).json({
      success: true,
      data: agent
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
  

// @desc update agents balance
// @route GET /api/v1/agents
// @access Public
exports.upAddAgentBal = async (req, res, next) => {
    let { id, tip } = req.body;
    const agentdetail = await agents.find({_id: id});
    const addbal = agentdetail.balance + tip;
    const addreg = agentdetail.regcount + 1;
    try {
        const agent = await agents.findByIdAndUpdate(id, {balance: addbal, regcount: addreg});
      return res.status(200).json({
        success: true,
        data: agent
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  exports.upMinusAgentBal = async (req, res, next) => {
    let { id, debit } = req.body;
    const agentdetails = await agents.find({_id: id});
    const minusbal = agentdetails.balance - debit;
    try {
        const agent = await agents.findByIdAndUpdate(id, {balance: minusbal});
      return res.status(200).json({
        success: true,
        data: agent
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.upAddAgentReg = async (req, res, next) => {
    let { id } = req.body;
    const detail = await agents.find({_id: id});
    const addreg = detail.regcount + 1;
    try {
        const agent = await agents.findByIdAndUpdate(id, {regcount: addreg});
      return res.status(200).json({
        success: true,
        data: agent
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

// @desc  Create a agent
// @route POST /api/v1/agent
// @access Public
exports.addAgent = async (req, res, next) => {
    let agent = await agents.findOne({ email: req.body.email });
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    if(agent){
            return res.status(400).send('agent already registered');
        }else{
            const agent = new agents({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
              address: req.body.address,
              town: req.body.town,
              state: req.body.state,
              contact: req.body.contact,
        });
      const result = await agent.save()
        const {password, ...data} = await result.toJSON();
        return res.status(201).json({
          success: true,
          data: data
        });
        }
      };  

// @desc  Create a agent
// @route POST /api/v1/agent
// @access Public
exports.logAgent = async (req, res, next) => {
  let agent = await agents.findOne({ email: req.body.email });
  if(!agent){
          return res.status(400).send('agent does not exist');
      }else{
        bcrypt.compare(req.body.password,agent.password,(err,result)=>{
            if(err){
                return res.status(400).json({ error: 'password does not match' });
            }
            if(result){
              console.log('password match')
              const token = jwt.sign({_id: agent._id}, "Jesus")
              res.cookie('jwt', token, {
                  httpOnly: true,
                  maxAge: 24 * 60 * 60 * 1000 * 14 // 2 weeks
              })
              res.json({"success" : true, "token" : token});
            }
          })
    
      }
    };
  
// @desc  Patch agent details
// @route GET /api/v1/agent
// @access Public
exports.upAgent = async (req, res, next) => {
  try {
    const agent = await agents.findByIdAndUpdate(req.body.id,{$set: req.body},{ new: true });

    return res.status(200).json({
      success: true,
      data: agent
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Patch agent password
// @route GET /api/v1/agent
// @access Public
exports.upAgentPass = async (req, res, next) => {
  let { id, oldPassword, newPassword } = req.body;
  try {
    const check = await agents.findOne({ _id: id });
    if (!check){
      return res.json({
        error:"invalid agent"
      });
    } else {
      const oldPassCheck = await bcrypt.compare(oldPassword, check.password);
      if (oldPassCheck) {  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    const agent = await agents.findByIdAndUpdate(id, {password: hashedPassword});
    return res.status(200).json({
      success: true,
      data: agent
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
// @desc  agent a agent password change
// @route POST /api/v1/expired
// @access Public
exports.upAgentAdPass = async (req, res, next) => {
  let { id, newPassword } = req.body;
  try {
    const check = await agents.findOne({ _id: id });
    if (!check){
      return res.json({
        error:"invalid agent"
      });
    } else { 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    const agent = await agents.findByIdAndUpdate(id, {password: hashedPassword});
    return res.status(200).json({
      success: true,
      data: agent
    });
  } 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  delete a agent
// @route POST /api/v1/expired
// @access Public
exports.deleteAgent = async (req, res, next) => {
  try {
    const agent = await agents.deleteOne({_id: req.body.id});

    return res.status(201).json({
      success: true
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'agent not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};