var express = require('express');
var controller = require('../controllers/auth.controller');

var router = express.Router();
// var validate = require('../validate/user.validate');
router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;
