const express = require('express');
const { getallPayment,getagPayment, addPayment} = require('../controllers/payment');

const router = express.Router();
//get
router
  .route('/')
  .get(getallPayment)
  .post(addPayment);
//post

router
  .route('/ag')
  .post(getagPayment);

module.exports = router;