const express = require('express');
const { getAllAdmin, getAdminp, getAdmin,addAdminImage, upAdmin, upAdminPass, upAdminAdPass, addAdmin, logAdmin} = require('../controllers/admin');

const router = express.Router();
//get
router
  .route('/')
  .get(getAllAdmin)
  .post(addAdmin)
  .patch(addAdminImage);
  //post
  
router
  .route('/id')
  .get(getAdminp)
  .post(getAdmin)
  .patch(upAdmin);

router
  .route('/login')
  .post(logAdmin);  
  
router
    .route('/pass')
    .patch(upAdminPass);
    
router
    .route('/adpass')
    .patch(upAdminAdPass);
module.exports = router;
