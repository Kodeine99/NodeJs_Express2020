require('dotenv').config();

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var userRoute = require('./routes/user.route');
var cookieParser = require('cookie-parser');
var authRoute = require('./routes/auth.route');
var authMiddleware = require('./middlewares/auth.middleware');
var productRoute = require('./routes/product.route');   

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));

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

app.listen(port, function () {
    console.log('Server listening on port ' + port);
});


