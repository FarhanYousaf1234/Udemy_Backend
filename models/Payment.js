const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
  transactionId: { type: String, required: true },
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
