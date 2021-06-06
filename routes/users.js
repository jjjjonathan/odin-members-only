const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

/* GET users listing. */
router.get('/sign-up', controller.getSignUp);
router.post('/sign-up', controller.postSignUp);

router.get('/sign-in', controller.getSignIn);
router.post('/sign-in', controller.postSignIn);

module.exports = router;
