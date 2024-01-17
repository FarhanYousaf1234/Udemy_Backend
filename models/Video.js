const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoLink: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subscriptionRequired: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
