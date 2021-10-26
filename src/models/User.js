const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
})

const User = mongoose.model('User', userSchema);

module.exports = User;