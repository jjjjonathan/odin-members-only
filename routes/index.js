const express = require('express');
const controller = require('../controllers/indexController');

const router = express.Router();

router.get('/', controller.getIndex);

router.get('/add-message', controller.getAddMessage);
router.post('/add-message', controller.postAddMessage);

module.exports = router;
