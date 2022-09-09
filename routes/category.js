const express = require('express');
const { getallCategory, addCategory, addCateImage, deleteCategory} = require('../controllers/category');

const router = express.Router();

router
  .route('/')
  .get(getallCategory)
  .post(addCategory)
  .patch(addCateImage)
  .delete(deleteCategory);

module.exports = router;
