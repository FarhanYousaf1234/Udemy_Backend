const express = require('express');
const router = express.Router();
const userController = require('../controllers/Usercontroller');
const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);
router.put('/change-password', authMiddleware, userController.changePassword);
router.post('/subscribe', authMiddleware, userController.subscribeToPlan);

module.exports = router;
