const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
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
  contact: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  regcount: {
      type: Number,
      default: 0,
  },
  status: {
      type: String,
      default: "active",
  },
    bvn: {
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
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Agent', AgentSchema);
