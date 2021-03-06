const router = require('express').Router();

const courseService = require('../services/courseService.js');

router.get('/', async (req, res) => {
    let courses = await courseService.getAll();

    res.render('home', { courses });
});

module.exports = router;