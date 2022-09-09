const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
  },
  password: {
    required: true,
    type: String,
  },
  category: {
    type: String,
  },
  owner: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  state: {
    type: String,
  },
  town: {
    type: String,
  },
  address: {
    type: String,
  },
  desc: {
    type: String,
    default: "",
  },
  procount: {
      type: Number,
      default: 0,
  },
  prototal: {
      type: Number,
      default: 0,
  },
  balance: {
      type: Number,
      default: 0,
  },
  status: {
      type: String,
      default: "active",
  },
  subid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Sub' },
    vertype: {
        type: String,
        default: "",
    },
    vernumber: {
        type: String,
        default: "",
    },
    verified: {
        type: String,
        default: "no",
    },
  simage: {
      type: String,
  },
  oimage: {
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
  ratings: [
    {
      review: String,
      user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
      rating: String,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Store', StoreSchema);
