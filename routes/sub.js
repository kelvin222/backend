const express = require('express');
const { getallSub, addSub, getstSub, deleteSub} = require('../controllers/sub');

const router = express.Router();
//get
router
  .route('/')
  .get(getallSub)
  .post(addSub)
  .delete(deleteSub);
//post

router
  .route('/st')
  .post(getstSub);

module.exports = router;
