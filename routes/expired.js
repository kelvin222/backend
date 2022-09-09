const express = require('express');
const { getallExpired, getstExpired, addExpired, deleteExpired} = require('../controllers/expired');

const router = express.Router();
//get
router
  .route('/')
  .get(getallExpired)
  .post(addExpired)
  .delete(deleteExpired);
//post

router
  .route('/st')
  .post(getstExpired);

module.exports = router;
