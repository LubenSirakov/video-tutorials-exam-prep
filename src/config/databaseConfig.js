const mongoose = require('mongoose');

const { DB_CONNECTION_STRING } = require('../constants.js');

exports.initDb = function() {
    return mongoose.connect(DB_CONNECTION_STRING);
};  