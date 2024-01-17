const express = require('express');
const router = express.Router();
const videoController = require('../controllers/Videocontroller');
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/', authMiddleware, videoController.getAllVideos);
router.get('/watch/:videoId', authMiddleware, videoController.watchVideo);
router.post('/', authMiddleware, videoController.postVideo);

module.exports = router;
