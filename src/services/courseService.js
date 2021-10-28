const Course = require('../models/Course.js');

exports.getAll = () => Course.find({}).lean();

exports.getOne = (courseId) => Course.findById(courseId).populate('usersEnrolled');

exports.create = (courseData) => Course.create(courseData);

exports.updateOne = (courseId, courseData) => Course.findByIdAndUpdate(courseId, courseData);

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);