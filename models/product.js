const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  brand: {
    type: String,
  },
  ptype: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  storeid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Store' },
  desc: {
    type: String,
  },
  image: {
    type: String,
  },
  stock: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
