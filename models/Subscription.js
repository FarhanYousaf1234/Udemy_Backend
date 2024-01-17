const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  includesLive: { type: Boolean, default: false },
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

module.exports = Subscription;
