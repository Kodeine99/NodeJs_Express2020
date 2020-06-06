var db = require('../db');
const shortid = require('shortid');


// Đưa logic xử lí của hàm vào trong file controller theo mô hình MVC (design pattern)
module.exports.index = function (req, res) {
    res.render('Users/index', {
        Users: db.get('Users').value()
    })
};

module.exports.search = function (req, res) {
    let q = req.query.q;
    let matchedUsers = db.get('Users').value().filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('Users/index', {
        Users: matchedUsers
    });
};

module.exports.create = function (req, res) {
    console.log(req.cookies);
    res.render('Users/Create');
};

module.exports.get = function (req, res) {

    let id = req.params.id;
    let user = db.get('Users').find({ id: id }).value();

    res.render('Users/view', {
        user: user
    });
};

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();

    console.log(res.locals);
    
    db.get('Users').push(req.body).write();
    res.redirect('/Users');
    // console.log(req.body);
    // res.json(req.body)
};
