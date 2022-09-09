const express = require('express');
const { getallWithdrawal, getagWithdrawal, upWithdrawal, addWithdrawal } = require('../controllers/withdrawal');

const router = express.Router();

router
  .route('/')
  .get(getallWithdrawal)
  .post(addWithdrawal)
  .patch(upWithdrawal);

router
  .route('/ag')
  .post(getagWithdrawal);

module.exports = router;
