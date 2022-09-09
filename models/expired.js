const mongoose = require('mongoose');

const ExpiredSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    subid: {
          type: String,
          required: true,
        },     
    sublistid: {
            type: String,
            required: true,
          },     
    sdate: {
          type: String,
          required: true,
        },
    edate: {
          type: String,
          required: true,
        },    
    time: {
            type: String,
            required: true,
          },
    agentid: {
            type: String,
            required: true,
          },    
    storeid: {
              type: String,
              required: true,
            },
    Transref: {
              type: String,
              required: true,
            },
    amount: {
        type: Number,
        required: true,
      },
});

module.exports = mongoose.model('Expired', ExpiredSchema);
