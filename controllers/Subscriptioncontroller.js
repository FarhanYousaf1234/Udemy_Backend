const Subscription = require('../models/Subscription');
const User = require('../models/User');

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSubscriptionsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('subscriptionId');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.subscriptionId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const subscribeUserToPlan = async (req, res) => {
  try {
    const userId = req.user._id;
    const { subscriptionId } = req.body;

    // Check if the subscription exists
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Update user subscription
    await User.findByIdAndUpdate(userId, { isSubscribed: true, subscriptionId });
    res.status(200).json({ message: 'User subscribed to plan successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unsubscribeUser = async (req, res) => {
  try {
    const userId = req.user._id;

    // Remove user subscription
    await User.findByIdAndUpdate(userId, { isSubscribed: false, subscriptionId: null });
    res.status(200).json({ message: 'User unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionsByUser,
  subscribeUserToPlan,
  unsubscribeUser,
}