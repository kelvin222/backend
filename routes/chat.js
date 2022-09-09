const express = require('express');
const { getStoreChat, getUserChat, getOrderChat, addChat, deleteChat, deleteChatmess} = require('../controllers/chat');

const router = express.Router();
//get
router
  .route('/')
  .get(getOrderChat)
  .post(addChat)
  .delete(deleteChat);
  //post
  
router
  .route('/mess')
  .delete(deleteChatmess);

router
  .route('/user')
  .get(getUserChat); 

router
  .route('/store')
  .get(getStoreChat);  
    
module.exports = router;
