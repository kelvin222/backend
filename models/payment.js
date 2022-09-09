const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    subname: {
        type: String,
        required: true,
      },
    subid: {
          type: String,
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);
