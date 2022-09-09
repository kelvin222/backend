const express = require('express');
const { getallPayout,getagPayout, getadPayout, addPayout} = require('../controllers/payout');

const router = express.Router();
//get
router
  .route('/')
  .get(getallPayout)
  .post(addPayout);
//post

router
  .route('/ag')
  .post(getagPayout);

router
  .route('/ad')
  .post(getadPayout);
module.exports = router;
