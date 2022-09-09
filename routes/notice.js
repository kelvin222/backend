const express = require('express');
const { getallNotice, addNotice, deleteNotice} = require('../controllers/notice');

const router = express.Router();

router
  .route('/')
  .get(getallNotice)
  .post(addNotice)
  .delete(deleteNotice);

module.exports = router;
