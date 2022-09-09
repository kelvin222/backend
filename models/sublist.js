const mongoose = require('mongoose');

const SublistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      }, 
    price: {
        type: Number,
        required: true,
      },    
    size: {
        type: Number,
        required: true,
      },
    duration: {
        type: String,
        required: true,
      },
});

module.exports = mongoose.model('Sublist', SublistSchema);
