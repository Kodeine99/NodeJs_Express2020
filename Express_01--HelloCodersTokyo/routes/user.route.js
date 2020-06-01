var express = require('express');

const shortid = require('shortid');

var router = express.Router();
var db = require('../db');

router.get('/', function (req, res) {
    res.render('Users/index', {
        Users: db.get('Users').value()
    });
});

router.get('/search', function (req, res) {
    let q = req.query.q;
    let matchedUsers = Users.filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('Users/index', {
        Users: matchedUsers
    });
});

router.get('/Create', function (req, res) {
    res.render('Users/Create');
});

router.get('/:id', function (req, res) {

    let id = req.params.id;
    let user = db.get('Users').find({ id: id }).value();

    res.render('Users/view', {
        user: user
    });
});

router.post('/Create', function (req, res) {
    req.body.id = shortid.generate();
    db.get('Users').push(req.body).write();
    res.redirect('/Users');
    // console.log(req.body);
    // res.json(req.body)
});

module.exports = router;


