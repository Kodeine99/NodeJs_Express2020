var express = require('express');

var router = express.Router();
var controller = require('../controllers/user.controller');

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/Create', controller.create);

router.get('/:id', controller.get);

router.post('/Create', controller.postCreate);

module.exports = router;


