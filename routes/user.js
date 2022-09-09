const express = require('express');
const { getallUser, getUserp, getUser, upUser, addUserImage, upUserPass, upUserAdPass, addUser, logUser, deleteCartPro, deleteCart, postCart} = require('../controllers/user');

const router = express.Router();
//get
router
  .route('/')
  .get(getallUser)
  .post(addUser)
  .patch(addUserImage, express.static("uploads"));
  //post
  
router
  .route('/id')
  .get(getUserp)
  .post(getUser)
  .patch(upUser);

router
  .route('/login')
  .post(logUser);  
  
router
    .route('/pass')
    .patch(upUserPass);
    
router
    .route('/adpass')
    .patch(upUserAdPass);

router
    .route('/cart')
    .post(postCart)
    .delete(deleteCart);
router
    .route('/cartpd')
    .delete(deleteCartPro);
module.exports = router;
