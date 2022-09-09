const mongoose = require('mongoose');

const PayoutSchema = new mongoose.Schema({
    agentid: {
        type: String,
        required: true,
      },
    adminid: {
        type: String,
        required: true,
      },  
    amount: {
        type: Number,
        required: true,
      },
    date: {
        type: String,
        required: true,
      },    
    time: {
          type: String,
          required: true,
        },
    bankacc: {
        type: String,
        required: true,
      },
    bankname: {
          type: String,
          required: true,
        },
    transref: {
              type: String,
              required: true,
            },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payout', PayoutSchema);
