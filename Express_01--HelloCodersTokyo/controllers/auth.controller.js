var md5 = require('md5');
var db = require('../db');

// Đưa logic xử lí của hàm vào trong file controller theo mô hình MVC (design pattern)
module.exports.login = function (req, res) {
    res.render('auth/login');
};
module.exports.postLogin = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get('Users').find({ email: email }).value();
    
    if (!user) {
        res.render('auth/login', {
            errors: ['Email does not exist'],

            values: req.body
        });
        return;
    }

    var hashedPassword = md5(password);
    if (user.password !== hashedPassword) {
        res.render('auth/login', {
            errors: ['Wrong password'],

            values: req.body
        });
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/Users');
}
