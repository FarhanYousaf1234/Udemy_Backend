const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isSubscribed: { type: Boolean, default: false },
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
