const express = require('express');
const { getStoreOrder, getUserOrder, getOrder, addOrder, deleteOrder} = require('../controllers/order');

const router = express.Router();
//get
router
  .route('/')
  .get(getOrder)
  .post(addOrder)
  .delete(deleteOrder);
  //post
  
router
  .route('/store')
  .get(getStoreOrder);

router
  .route('/user')
  .get(getUserOrder);  
    
module.exports = router;
