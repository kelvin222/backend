const stores = require('../models/store');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const middleware = require("../middleware");
const multer = require("multer");
const config = require('../config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/storeimage");
  },
  filename: (req, file, cb) => {
    cb(null, req.decoded._id + ".jpg");
  },
});
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/storeimage/");
  },
  filename: (req, file, cb) => {
    cb(null, "st"+ req.decoded._id + ".jpg");
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
const upload2 = multer({
  storage: storage2,
  limits: {
    fileSize: 1024,
  },
});

exports.addStoreImage = (middleware.checkToken, upload.single("simage"), async (req, res, next) => {
    const img = req.file;
    if(!img){
      return res.status(400).send('image upload error');
    } else {
      stores.findOneAndUpdate(
        { _id: req.decoded._id },
        {
          $set: {
            simage: img.path,
          },
        },
        { new: true },
        (err, store) => {
          if (err) return res.status(500).send(err);
          const response = {
            message: "store image successfully updated",
            data: store,
          };
          return res.status(200).send(response);
        }
      );
    }
  });

  exports.addOwnerImage = (middleware.checkToken, upload2.single("oimage"), async (req, res, next) => {
    const pimage = req.file;
    if(!pimage){
      return res.status(400).send('image upload error');
    } else {
      stores.findOneAndUpdate(
        { _id: req.decoded._id },
        {
          $set: {
            oimage: pimage.path,
          },
        },
        { new: true },
        (err, store) => {
          if (err) return res.status(500).send(err);
          const response = {
            message: "owner image successfully updated",
            data: store,
          };
          return res.status(200).send(response);
        }
      );
    }
  });
    

// @desc  Get all stores
// @route GET /api/v1/stores
// @access Public
exports.getAllStore = async (req, res, next) => {
  try {
    const store = await stores.find();

    return res.status(200).json({
      success: true,
      count: store.length,
      data: store
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Get  stores by id
// @route GET /api/v1/stores
// @access Public
exports.getStorep = async (req, res, next) => {
  try {
      const cookie = req.cookies.jwt;
      const claims = jwt.verify(cookie, config.key);

      if (!claims) {
          return res.status(401).send({
              message: 'unauthenticated'
          })
      }
    const store = await stores.find({_id: claims._id});

    return res.status(200).json({
      success: true,
      count: store.length,
      data: store
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Get  stores by id
// @route GET /api/v1/stores
// @access Public
exports.getStore = async (req, res, next) => {
    try {
      const store = await stores.find({_id: req.body.id});
  
      return res.status(200).json({
        success: true,
        data: store
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// @desc  Get  stores by state
// @route GET /api/v1/stores
// @access Public
exports.getStoreSt = async (req, res, next) => {
  try {
    const store = await stores.find({state: req.body.state});

    return res.status(200).json({
      success: true,
      data: store
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};  
// @desc  Get  stores by location
// @route GET /api/v1/stores
// @access Public
exports.getStoreLoc = async (req, res, next) => {
  let { long, lat } = req.body;
    try {
      const store = await stores.find({location: {$near: {$maxDistance: 10000, $geometry: {type: "Point", coordinates: [long, lat]}}}});
  
      return res.status(200).json({
        success: true,
        data: store
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
      
  
// @desc  Get  stores by town
// @route GET /api/v1/stores
// @access Public
exports.getStoreTw = async (req, res, next) => {
    try {
      const store = await stores.find({town: req.body.town});
  
      return res.status(200).json({
        success: true,
        data: store
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
    

// @desc update stores balance
// @route GET /api/v1/stores
// @access Public
exports.upAddStoreBal = async (req, res, next) => {
    let { id, amount } = req.body;
    const storedetail = await stores.find({_id: id});
    const addbal = storedetail.balance + amount;
    try {
        const store = await stores.findByIdAndUpdate(id, {balance: addbal});
      return res.status(200).json({
        success: true,
        data: store
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  exports.upMinusStoreBal = async (req, res, next) => {
    let { id, amount } = req.body;
    const storedetails = await stores.find({_id: id});
    const minusbal = storedetails.balance - amount;
    try {
        const store = await stores.findByIdAndUpdate(id, {balance: minusbal});
      return res.status(200).json({
        success: true,
        data: store
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.upAddStoreProCount = async (req, res, next) => {
    let { id } = req.body;
    const detail = await stores.find({_id: id});
    const addcount = detail.procount + 1;
    try {
        const store = await stores.findByIdAndUpdate(id, {procount: addcount});
      return res.status(200).json({
        success: true,
        data: store
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.upMinStoreProCount = async (req, res, next) => {
    let { id } = req.body;
    const detail = await stores.find({_id: id});
    const minuscount = detail.procount - 1;
    try {
        const store = await stores.findByIdAndUpdate(id, {procount: minuscount});
      return res.status(200).json({
        success: true,
        data: store
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };


  exports.upStoreSub = async (req, res, next) => {
    let { id, subid } = req.body;
    try {
        const store = await stores.findByIdAndUpdate(id, {subid: subid});
      return res.status(200).json({
        success: true,
        data: store
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };


  exports.upStoreVerify = async (req, res, next) => {
    let { id, vertype, vernumber } = req.body;
    try {
        const store = await stores.findByIdAndUpdate(id, {vertype: vertype, vernumber: vernumber});
      return res.status(200).json({
        success: true,
        data: store
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  
  exports.upStoreVerified = async (req, res, next) => {
    let { id, verstat} = req.body;
    try {
        const store = await stores.findByIdAndUpdate(id, {verified: verstat});
      return res.status(200).json({
        success: true,
        data: store
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };


// @desc  Create a store
// @route POST /api/v1/store
// @access Public
exports.addStore = async (req, res, next) => {
    let store = await stores.findOne({ email: req.body.email });
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    if(store){
            return res.status(400).send('store already registered');
        }else{
            const store = new stores({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
              owner: req.body.owner,
              contact: req.body.contact,
        });
      const result = await store.save()
        const {password, ...data} = await result.toJSON();
        return res.status(201).json({
          success: true,
          data: data
        });
        }
      };  

// @desc  store login
// @route POST /api/v1/store
// @access Public
exports.logStore = async (req, res, next) => {
  let store = await stores.findOne({ email: req.body.email });
  if(!store){
          return res.status(400).send('store does not exist');
      }else{
        bcrypt.compare(req.body.password,store.password,(err,result)=>{
            if(err){
                return res.status(400).json({ error: 'password does not match' });
            }
            if(result){
              console.log('password match')
              const token = jwt.sign({_id: store._id}, config.key)
              res.cookie('jwt', token, {
                  httpOnly: true,
                  maxAge: 24 * 60 * 60 * 1000 * 14 // 2 weeks
              })
              res.json({"success" : true, "token" : token});
            }
          })
    
      }
    };
  
// @desc  Patch store details
// @route GET /api/v1/store
// @access Public
exports.upStore = (middleware.checkToken, async (req, res, next) => {
  try {
    const store = await stores.findByIdAndUpdate(req.decoded._id,{$set: req.body},{ new: true });

    return res.status(200).json({
      success: true,
      data: store
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc  Patch store password
// @route GET /api/v1/store
// @access Public
exports.upStorePass = async (req, res, next) => {
  let { id, oldPassword, newPassword } = req.body;
  try {
    const check = await stores.findOne({ _id: id });
    if (!check){
      return res.json({
        error:"invalid store"
      });
    } else {
      const oldPassCheck = await bcrypt.compare(oldPassword, check.password);
      if (oldPassCheck) {  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    const store = await stores.findByIdAndUpdate(id, {password: hashedPassword});
    return res.status(200).json({
      success: true,
      data: store
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
// @desc  store a store password change
// @route POST /api/v1/store
// @access Public
exports.upStoreAdPass = async (req, res, next) => {
  let { id, newPassword } = req.body;
  try {
    const check = await stores.findOne({ _id: id });
    if (!check){
      return res.json({
        error:"invalid store"
      });
    } else { 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    const store = await stores.findByIdAndUpdate(id, {password: hashedPassword});
    return res.status(200).json({
      success: true,
      data: store
    });
  } 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  delete a store
// @route POST /api/v1/expired
// @access Public
exports.deleteStore = async (req, res, next) => {
  try {
    const store = await stores.deleteOne({_id: req.body.id});

    return res.status(201).json({
      success: true
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'store not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};


// @desc add store ratings
// @route POST /api/v1/store
// @access Public
exports.addStoreRating = async (req, res, next) => {
  let { id, userid, rating, review } = req.body;
  if (!id || !rating || !review || !userid) {
    return res.json({ error: "All filled must be required" });
  } else {
    let store = await stores.findOne({ _id: id });
      if (store.ratings.length > 0) {
        store.ratings.map((item) => {
          if (item.user === userid) {
            return res.json({ error: "You already reviewed the store" });
          } else {
            try {
              let newRating = stores.findByIdAndUpdate(id, {
                $push: {
                  ratings: {
                    review: review,
                    user: userid,
                    rating: rating,
                  },
                },
              });
              newRating.exec((err, result) => {
                if (err) {
                  console.log(err);
                }
                return res.json({ success: "Thanks for your review" });
              });
            } catch (err) {
              return res.json({ error: "Review error" });
            }
          }
        });
      } else {
        try {
          let newRatingReview = stores.findByIdAndUpdate(id, {
            $push: {
              ratings: { review: review, user: userid, rating: rating },
            },
          });
          newRatingReview.exec((err, result) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Thanks for your review" });
          });
        } catch (err) {
          return res.json({ error: "Review error" });
        }
      }
  }
};

// @desc  delete a store rating
// @route POST /api/v1/store
// @access Public
exports.deleteStoreRating = async (req, res, next) => {
  let { rid, id } = req.body;
  try {
    const reviewDelete = await stores.findByIdAndUpdate(id, {
      $pull: { ratings: { _id: rid } },
    });
    reviewDelete.exec((err, result) => {
      if (err) {
        console.log(err);
      }
      return res.json({ success: "Your review is deleted" });
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'review not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};