const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

/* GET users listing. */
router.get('/sign-up', controller.getSignUp);
router.post('/sign-up', controller.postSignUp);

module.exports = router;
