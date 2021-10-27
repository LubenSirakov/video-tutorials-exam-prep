const mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    // usersEnrolled: {

    // }
});

let Course = mongoose.model('Course', courseSchema);

module.exports = Course;