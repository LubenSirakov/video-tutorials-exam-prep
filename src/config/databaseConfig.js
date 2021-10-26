const mongoose = require('mongoose');

const { DB_CONNECTON_STRING } = require('../constants.js');

exports.initDatabase = function() {
    return mongoose.connect(DB_CONNECTON_STRING);
};