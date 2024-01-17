const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/users', authMiddleware, adminController.getAllUsers);
router.get('/users/:userId', authMiddleware, adminController.getUserDetails);
router.post('/users', authMiddleware, adminController.createUser);
router.put('/users/:userId', authMiddleware, adminController.updateUser);
router.delete('/users/:userId', authMiddleware, adminController.deleteUser);

router.get('/users/:userId/videos', authMiddleware, adminController.getAllVideosByUser);
router.get('/users/:userId/ebooks', authMiddleware, adminController.getAllEbooksByUser);
router.delete('/videos/:videoId', authMiddleware, adminController.deleteVideo);
router.delete('/ebooks/:ebookId', authMiddleware, adminController.deleteEbook);

router.get('/subscriptions', authMiddleware, adminController.getAllSubscriptions);
router.post('/subscriptions', authMiddleware, adminController.createSubscription);
router.put('/subscriptions/:subscriptionId', authMiddleware, adminController.updateSubscription);
router.delete('/subscriptions/:subscriptionId', authMiddleware, adminController.deleteSubscription);

// Add other admin-related routes as needed

module.exports = router;
