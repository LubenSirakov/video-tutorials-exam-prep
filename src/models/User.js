const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../constants.js');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // enrolledCourses: {

    // }
});

userSchema.pre('save', function(next) {
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;

            return next();
        })
});

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;