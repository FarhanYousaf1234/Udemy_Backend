const Ebook = require('../models/E_books');
const User=require('../models/User');
const getAllEbooks = async (req, res) => {
  try {
    const ebooks = await Ebook.find().populate('userId', 'username');
    res.status(200).json(ebooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const readEbook = async (req, res) => {
    try {
        const userId = req.user._id;
        const ebookId = req.params.ebookId;
    
        // Check if the ebook exists
        const ebook = await Ebook.findById(ebookId);
        if (!ebook) {
        return res.status(404).json({ error: 'Ebook not found' });
        }
    
        // Check if the user has the necessary subscription to read the ebook
        const user = await User.findById(userId).populate('subscriptionId');
        if (!user.isSubscribed || !user.subscriptionId.includes(ebook.subscriptionRequired)) {
        return res.status(403).json({ error: 'Subscription required to read this ebook' });
        }
    
        // Update ebook view count or perform any other analytics
        ebook.viewCount += 1;
        await ebook.save();
    
        res.status(200).json({ message: 'Ebook read successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postEbook = async (req, res) => {
  try {
    const { title, fileLink, subscriptionRequired } = req.body;
    const userId = req.user._id;

    const newEbook = new Ebook({
      title,
      fileLink,
      userId,
      subscriptionRequired: subscriptionRequired || false,
    });

    await newEbook.save();
    res.status(201).json(newEbook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    getAllEbooks,
    readEbook,
    postEbook,
}