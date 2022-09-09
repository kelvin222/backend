const express = require('express');
const { getStoreCoschat, getUserCoschat, getAgentCoschat, getCoschat, addCoschat, upCoschat, deleteCoschat} = require('../controllers/coschat');

const router = express.Router();
//get
router
  .route('/')
  .get(getCoschat)
  .post(addCoschat)
  .patch(upCoschat)
  .delete(deleteCoschat);
  //post
  
router
  .route('/user')
  .get(getUserCoschat); 

router
  .route('/agent')
  .get(getAgentCoschat); 

router
  .route('/store')
  .get(getStoreCoschat);  
    
module.exports = router;
