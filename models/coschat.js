const mongoose = require('mongoose');

const CoschatSchema = new mongoose.Schema({
  topic: {type: String},
  desc: {type: String},
  status: {type: String},
  cosid: {type: String},
  cate: {type: String},
  Admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
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

module.exports = mongoose.model('Coschat', CoschatSchema);
