const Course = require('../models/Course.js');

exports.getAll = () => Course.find({}).lean();

exports.getOne = (courseId) => Course.findById(courseId).populate('usersEnrolled');

exports.create = (courseData) => Course.create(courseData);