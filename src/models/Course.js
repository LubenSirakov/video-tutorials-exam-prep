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
        //todo: fix it to work wit true only
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    usersEnrolled: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

// courseSchema.method()

let Course = mongoose.model('Course', courseSchema);

module.exports = Course;