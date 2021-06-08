const express = require('express');
const controller = require('../controllers/indexController');

const router = express.Router();

router.get('/', controller.getIndex);
router.get('/messages', controller.getMessages);

router.get('/add-message', controller.getAddMessage);
router.post('/add-message', controller.postAddMessage);

router.get('/messages/:id/delete', controller.getDeleteMessage);
router.post('/messages/:id/delete', controller.postDeleteMessage);

module.exports = router;
