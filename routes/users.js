const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const roles = require('../models/roles');
const checkPermissions = require('../auth');

router.post('/', controller.create);
router.get('/', checkPermissions(['user', 'admin']), controller.list);
router.delete('/:id', checkPermissions(['admin']), controller.destroy);


module.exports = router;