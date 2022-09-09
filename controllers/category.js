const categorys = require('../models/category');
const path = require("path");
const fileHelper = require('../util/file');

exports.addCateImage = async (req, res, next) => {
    const image = req.file;
    if(!image){
      return res.status(400).send('image upload error');
    } else {
      categorys.findOneAndUpdate(
        { name: req.body.name },
        {
          $set: {
            image: image.path,
          },
        },
        { new: true },
        (err, category) => {
          if (err) return res.status(500).send(err);
          const response = {
            message: "category image successfully updated",
            data: category,
          };
          return res.status(200).send(response);
        }
      );
    }
  };

// @desc  Get all categorys
// @route GET /api/v1/categorys
// @access Public
exports.getallCategory = async (req, res, next) => {
  try {
    const category = await categorys.find();

    return res.status(200).json({
      success: true,
      count: category.length,
      data: category
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// @desc  Create a category
// @route POST /api/v1/category
// @access Public
exports.addCategory = async (req, res, next) => {
  try {
    const category = await categorys.create(req.body);

    return res.status(201).json({
      success: true,
      data: category
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This category already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  delete a category
// @route POST /api/v1/category
// @access Public
exports.deleteCategory = async (req, res, next) => {
    try {
      const category = await categorys.deleteOne({_id: req.body.id});
  
      return res.status(201).json({
        success: true,
        data: category
      });
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'category doesnt exist' });
      }
      res.status(500).json({ error: 'Server error' });
    }
  };
