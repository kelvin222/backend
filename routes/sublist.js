const express = require('express');
const { getallSublist, addSublist, deleteSublist} = require('../controllers/sublist');

const router = express.Router();

router
  .route('/')
  .get(getallSublist)
  .post(addSublist)
  .delete(deleteSublist);

module.exports = router;
