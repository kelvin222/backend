const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
  state: {
    type: String,
  },
  contact: {
    type: String,
  },
});


module.exports = mongoose.model("Admin", adminSchema);
