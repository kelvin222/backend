const products = require('../models/product');
const stores = require('../models/store');
const path = require("path");
const fileHelper = require('../util/file');
const category = require('../models/category');
const middleware = require("../middleware");
const multer = require("multer");
const config = require('../config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/productimage");
  },
  filename: (req, file, cb) => {
    cb(null, req.decoded.email + req.body.filename +".jpg");
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

exports.addProductImage = (middleware.checkToken, upload.single("image"), async (req, res, next) => {
    const img = req.file;
    if(!img){
      return res.status(400).send('image upload error');
    } else {
      products.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            image: img.path,
          },
        },
        { new: true },
        (err, product) => {
          if (err) return res.status(500).send(err);
          const response = {
            message: "product image successfully updated",
            data: product,
          };
          return res.status(200).send(response);
        }
      );
    }
  });    

// @desc  Get all products
// @route GET /api/v1/products
// @access Public
exports.getAllProduct = async (req, res, next) => {
  try {
    const product = await products.find();

    return res.status(200).json({
      success: true,
      count: product.length,
      data: product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// @desc  Get  products by id
// @route GET /api/v1/products
// @access Public
exports.getProduct = async (req, res, next) => {
    try {
      const product = await products.find({_id: req.body.id});
  
      return res.status(200).json({
        success: true,
        data: product
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
// @desc  Get  products by state
// @route GET /api/v1/products
// @access Public

// @desc Search  products 
// @route GET /api/v1/products
// @access Public
exports.productSearch = async (req, res) => {
  try{
    const {brand,category,dist,name,sort,long,lat, maxprice,}=req.body;
    const queryObject={};
    const page = Number(req.body.page) || 1;
    const limit = Number(req.body.limit) || 10;
    const skip = (page - 1) * limit;

    if(brand)
    {
        queryObject.brand=brand;
    }
    if(category)
    {
        queryObject.category=category;
    }
    if(name)
    {
        queryObject.name={$regex:name,$options:'i'}
    }
    if(long)
    {
        queryObject.location= {$near: {$maxDistance: dist, $geometry: {type: "Point", coordinates: [long, lat]}}}
    }

    let result=products.find(queryObject);
    result = result.skip(skip).limit(limit);

    if(sort)
    {
        const sortList=sort.toString().split(',').join(' ');
        result=result.sort(sortList);
    }
    else{
        result=result.sort('createdAt');
    }

    let total = await products.countDocuments(queryObject);
    

    
    const product=await result;
    return res.send({
      message: "Search successful",
      data:{
        product: product,
        total: total,
        currentpage: page,
        totalpages: Math.ceil(total/limit)
      }
    })
  } catch(err){
    console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
  }
    


// @desc  Create a product
// @route POST /api/v1/product
// @access Public
exports.addProduct = async (req, res, next) => {
  const image = req.file;
    let store = await stores.findOne({ _id: req.body.storeid });
    if (store.prototal > 0){
      if (store.procount >= store.prototal){
        return res.status(400).send('Product limit is reached');
      } else {
        const product = new products({
          name: req.body.name,
          category: req.body.category,
          subcategory: req.body.subcategory,
          ptype: req.body.ptype,
          brand: req.body.brand,
          price: req.body.price,
          storeid: req.body.storeid,
          desc: req.body.desc,
          stock: req.body.stock,
          location: req.body.location,
    });
  const result = await product.save();
    return res.status(201).json({
      success: true,
      data: result
    });
      }
    } else {
      return res.status(400).send('No Subscription found');
    }
      };  

  
// @desc  Patch product details
// @route GET /api/v1/product
// @access Public
exports.upProduct = async (req, res, next) => {
  try {
    const product = await products.findByIdAndUpdate(req.body.id,{$set: req.body},{ new: true });

    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}; 
// @desc  Patch product details
// @route GET /api/v1/product
// @access Public
exports.upProductLoc = async (req, res, next) => {
  try {
    const product = await products.updateMany({category: req.body.cat},{ $set: { storeid : req.body.sid }});

    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// @desc  delete a product
// @route POST /api/v1/expired
// @access Public
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await products.deleteOne({_id: req.body.id});

    return res.status(201).json({
      success: true
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'product not found' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};
