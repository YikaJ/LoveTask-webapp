var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LoveTask');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

exports.mongoose = mongoose;