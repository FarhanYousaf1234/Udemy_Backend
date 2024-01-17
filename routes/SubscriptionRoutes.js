const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/Subscriptioncontroller');
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/', authMiddleware, subscriptionController.getAllSubscriptions);
router.get('/user', authMiddleware, subscriptionController.getSubscriptionsByUser);
router.post('/subscribe', authMiddleware, subscriptionController.subscribeUserToPlan);
router.post('/unsubscribe', authMiddleware, subscriptionController.unsubscribeUser);

// Add other subscription-related routes as needed

module.exports = router;
