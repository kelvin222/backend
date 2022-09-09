const express = require('express');
const { getAllAgent, getAgentp, getAgent,addAgentImage, upAddAgentBal, upMinusAgentBal, upAddAgentReg, upAgent, upAgentPass, upAgentAdPass, addAgent, logAgent} = require('../controllers/agent');

const router = express.Router();
//get
router
  .route('/')
  .get(getAllAgent)
  .post(addAgent)
  .patch(addAgentImage);
  //post
  
router
  .route('/id')
  .get(getAgentp)
  .post(getAgent)
  .patch(upAgent);

router
  .route('/login')
  .post(logAgent);  
  
router
    .route('/pass')
    .patch(upAgentPass);
    
router
    .route('/adpass')
    .patch(upAgentAdPass);

router
    .route('/adbal')
    .patch(upAddAgentBal);
    
router
    .route('/minbal')
    .patch(upMinusAgentBal);
    
router
    .route('/regadd')
    .patch(upAddAgentReg);
module.exports = router;
