const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  storeid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Store' },
  orderid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
  capsule: [{
    senderid: {type: String},
    message: {
            type: String,
            required: true,
          },    
    
      },
      { timestamps: true }
    ],
    createdAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Chat', ChatSchema);
