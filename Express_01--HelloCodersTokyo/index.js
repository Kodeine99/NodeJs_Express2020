require('dotenv').config();

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');


var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');
  

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

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
app.use('/Products', productRoute);
app.use('/Cart', cartRoute);
app.use('/Transfer', authMiddleware.requireAuth, transferRoute);

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});


