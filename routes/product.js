const express = require('express');
const { addProductImage, getProduct,upProductLoc, productSearch, upProduct, deleteProduct, getAllProduct, addProduct } = require('../controllers/product');

const router = express.Router();

router
  .route('/')
  .get(getAllProduct)
  .post(addProduct)
  .patch(addProductImage)
  .delete(deleteProduct);

router
  .route('/id')
  .post(getProduct)
  .patch(upProduct);
router
    .route('/search')
    .get(productSearch);

    router
    .route('/loc')
    .patch(upProductLoc);
module.exports = router;
