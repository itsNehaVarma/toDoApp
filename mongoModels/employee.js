var mongoose = require("mongoose");

var employee = mongoose.Schema({
    firstName: String,
    lastName: String,
    address: String,
    contact: Number
});


module.exports = mongoose.model('Employee', employee);

