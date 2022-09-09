const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
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
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  image: {
      type: String,
  },
  town: {
    type: String,
  },
  contact: {
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
  cart: [{
    storeid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Store' },
        pack: [{
          productid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
          quantity: Number,
          proname: String,
          amount: Number,
          price: Number
        }]
      }
    ],
});


module.exports = mongoose.model("User", userSchema);
