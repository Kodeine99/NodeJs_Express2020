var express = require('express');

var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');

router.get('/', controller.index);

router.get('/cookie', function (req, res, next) {
    res.cookie('User-id', 12345);
    res.send('Hello');
})

router.get('/search', controller.search);

router.get('/Create', controller.create);

router.get('/:id', controller.get);

router.post('/Create', validate.postCreate, controller.postCreate);

module.exports = router;


