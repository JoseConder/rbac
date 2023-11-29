const express = require('express');
const controller = require('../controllers/login.js')
const router = express.Router();

/* GET home page. */
router.get('/', controller.home);

router.post('/login', controller.login);

module.exports = router;