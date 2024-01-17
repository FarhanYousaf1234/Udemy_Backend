const express = require('express');
const router = express.Router();
const ebookController = require('../controllers/E_bookscontroller');
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/', authMiddleware, ebookController.getAllEbooks);
router.get('/read/:ebookId', authMiddleware, ebookController.readEbook);
router.post('/', authMiddleware, ebookController.postEbook);


module.exports = router;
