const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var userRoute = require('./routes/user.route');
var cookieParser = require('cookie-parser');
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middlewares/auth.middleware');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser('gdhasgd3152ajs'));

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index', {
        name: 'KODEINE'
    });
});

app.use('/Users', authMiddleware.requireAuth, userRoute);
app.use('/auth/', authRoute);

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});


