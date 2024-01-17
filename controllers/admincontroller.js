const User = require('../models/User');
const Video = require('../models/Video');
const Ebook = require('../models/E_books');
const Subscription = require('../models/Subscription');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email } = req.body;

    await User.findByIdAndUpdate(userId, { username, email });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllVideosByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userVideos = await Video.find({ userId });
    res.status(200).json({ videos: userVideos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllEbooksByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userEbooks = await Ebook.find({ userId });
    res.status(200).json({ ebooks: userEbooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    await Video.findByIdAndDelete(videoId);
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEbook = async (req, res) => {
  try {
    const ebookId = req.params.ebookId;
    const ebook = await Ebook.findById(ebookId);

    if (!ebook) {
      return res.status(404).json({ error: 'Ebook not found' });
    }

    await Ebook.findByIdAndDelete(ebookId);
    res.status(200).json({ message: 'Ebook deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSubscription = async (req, res) => {
  try {
    const { name, price, includesLive } = req.body;
    const newSubscription = new Subscription({ name, price, includesLive });

    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    const { name, price, includesLive } = req.body;

    await Subscription.findByIdAndUpdate(subscriptionId, { name, price, includesLive });
    res.status(200).json({ message: 'Subscription updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    await Subscription.findByIdAndDelete(subscriptionId);
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllUsers,
  getUserDetails,
  createUser,
  updateUser,
  deleteUser,
  getAllVideosByUser,
  getAllEbooksByUser,
  deleteVideo,
  deleteEbook,
  getAllSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};