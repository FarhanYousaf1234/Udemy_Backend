const mongoose = require('mongoose');

const EbookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileLink: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subscriptionRequired: { type: Boolean, default: false },
  downloadCount: { type: Number, default: 0 },
});

const Ebook = mongoose.model('Ebook', EbookSchema);

module.exports = Ebook;
