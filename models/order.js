const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    storeid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Store' },
    total: {
          type: Number
        },
    status: {
          type: String,
        },
        products: [
          {
            productid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
            quantity: Number,
            proname: String,
            amount: Number,
            price: Number
          }
      ],
    createdAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Order', OrderSchema);
