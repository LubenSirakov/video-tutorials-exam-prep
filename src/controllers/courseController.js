const router = require('express').Router();

const courseService = require('../services/courseService.js');
const { isAuth } = require('../middlewares/authMiddleware.js');

router.get('/', async (req, res) => {
    let courses = await courseService.getAll();

    res.render('home', { courses });
});

router.get('/create', isAuth, (req, res) => {
    res.render('course/create');
});

module.exports = router;