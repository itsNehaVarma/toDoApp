const express = require("express");
const app = express();
var path = require('path');
const bodyParser = require('body-parser');
var index = require('./routes/index');
var mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
mongoose.set('debug', true);
//app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//mongoose.connect('mongodb://127.0.0.1/employee');
mongoose.connect('mongodb://127.0.0.1/employee', function() { /* dummy function */ })
    .then(() => {
        console.log("connected to employee database");
    })
    .catch(err => { // mongoose connection error will be handled here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });
mongoose.Promise = global.Promise;

app.use('/', index);
// catch 404 and forward to error handler
  
app.listen(3000, () => console.log('App listening on port 3000!'))

module.exports = app;
