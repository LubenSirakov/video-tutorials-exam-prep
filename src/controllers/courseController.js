const router = require('express').Router();

const courseService = require('../services/courseService.js');
const { isAuth } = require('../middlewares/authMiddleware.js');

router.get('/', async (req, res) => {
    let courses = await courseService.getAll();

    res.render('home', { courses });
});
//CREATE PAGE
router.get('/create', isAuth, (req, res) => {
    res.render('course/create');
});

router.post('/create', isAuth, async (req, res) => {

    try {
        await courseService.create({ ...req.body, creator: req.user._id });

        res.redirect('/');
    } catch (error) {
        
        res.render('course/create')
    }
});
//DETAILS PAGE
router.get('/:courseId/details', async (req, res) => {
    let course = await courseService.getOne(req.params.courseId);
    let courseData = await course.toObject();
    console.log(courseData);
    res.render('course/details', {...courseData});
});

async function isCreator(erq, res, next) {
    let course = await courseService.getOne(req.params.courseId);

    if(course.creator == res.user._id) {
        res.redirect(`course/${req.params.courseId}/details`);
    } else {
        next();
    }
}

module.exports = router;