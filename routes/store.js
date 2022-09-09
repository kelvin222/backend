const express = require('express');
const { getAllStore, getStorep, getStore, getStoreSt, getStoreLoc, getStoreTw, addStoreImage, addOwnerImage, deleteStore, upStore, upStorePass, upStoreAdPass, addStore, logStore, addStoreRating, deleteStoreRating} = require('../controllers/store');
//upAddStoreBal, upMinusStoreBal, upAddStoreProCount, upMinStoreProCount, upStoreSub, upStoreVerify, upStoreVerified, 
const router = express.Router();
//get
router
  .route('/')
  .get(getAllStore)
  .post(addStore);
  //post
  
router
  .route('/id')
  .get(getStorep)
  .post(getStore)
  .patch(upStore)
  .delete(deleteStore);
  

  router
  .route('/upown')
  .patch(addOwnerImage, express.static("upown"));

  router
  .route('/upst')
  .patch(addStoreImage, express.static("upst"));

router
  .route('/st')
  .post(getStoreSt);
    
router
  .route('/loc')
  .post(getStoreLoc);
    
router
  .route('/tw')
  .post(getStoreTw);

router
  .route('/login')
  .post(logStore);  
  
router
    .route('/pass')
    .patch(upStorePass);
    
router
    .route('/adpass')
    .patch(upStoreAdPass);

router
    .route('/addrating')
    .patch(addStoreRating);
    
router
    .route('/delrating')
    .patch(deleteStoreRating);
/*
router
    .route('/adbal')
    .patch(upAddStoreBal);
    
router
    .route('/minbal')
    .patch(upMinusStoreBal);
    
router
    .route('/addpro')
    .patch(upAddStoreProCount);
router
    .route('/minuspro')
    .patch(upMinStoreProCount);
    
router
    .route('/stsub')
    .patch(upStoreSub);

router
    .route('/vfy')
    .patch(upStoreVerify);
    
router
    .route('/vfied')
    .patch(upStoreVerified);*/
    
module.exports = router;
