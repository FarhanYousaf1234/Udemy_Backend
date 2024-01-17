const Video = require('../models/Video');
const User = require('../models/User');
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('userId', 'username');
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const watchVideo = async (req, res) => {
  try {
    const userId = req.user._id;
    const videoId = req.params.videoId;

    // Check if the video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Check if the user has the necessary subscription to watch the video
    const user = await User.findById(userId).populate('subscriptionId');
    if (!user.isSubscribed || !user.subscriptionId.includes(video.subscriptionRequired)) {
      return res.status(403).json({ error: 'Subscription required to watch this video' });
    }

    // Update video view count or perform any other analytics
    video.viewCount += 1;
    await video.save();

    res.status(200).json({ message: 'Video watched successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postVideo = async (req, res) => {
  try {
    const { title, videoLink, subscriptionRequired } = req.body;
    const userId = req.user._id;

    const newVideo = new Video({
      title,
      videoLink,
      userId,
      subscriptionRequired: subscriptionRequired || false,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllVideos,
  watchVideo,
  postVideo,
}