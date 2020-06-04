const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var userRoute = require('./routes/user.route');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index', {
        name: 'AAA'
    });
});

app.use('/Users', userRoute);
app.listen(port, function () {
    console.log('Server listening on port ' + port);
})
