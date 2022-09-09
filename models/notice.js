const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
      }, 
    senderid: {
        type: String,
        required: true,
      },    
    time: {
        type: String,
        required: true,
      },
    date: {
        type: String,
        required: true,
      },
    createdAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Notice', NoticeSchema);
