const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const shortid = require('shortid');

const db = low(adapter);

// Set some defaults
db.defaults({ Users: [] })
    .write();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index', {
        name: 'AAA'
    });
});
app.get('/Users', function (req, res) {
    res.render('Users/index', {
        Users: db.get('Users').value()
    });
});
app.get('/Users/search', function (req, res) {
    let q = req.query.q;
    let matchedUsers = Users.filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
    res.render('Users/index', {
        Users: matchedUsers
    });
});

app.get('/Users/Create', function (req, res) {
    res.render('Users/Create');
});

app.get('/Users/:id', function (req, res) {

    let id = req.params.id;
    let user = db.get('Users').find({ id: id }).value();

    res.render('Users/view', {
        user: user
    });
});

app.post('/Users/Create', function (req, res) {
    req.body.id = shortid.generate();
    db.get('Users').push(req.body).write();
    res.redirect('/Users');
    // console.log(req.body);
    // res.json(req.body)
});

app.listen(port, function () {
    console.log('Server listening on port ' + port);
})
