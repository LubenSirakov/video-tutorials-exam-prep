const router = require('express').Router();

const courseService = require('../services/courseService.js');
const { isAuth } = require('../middlewares/authMiddleware.js');

//---CREATE PAGE---
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

//---DETAILS PAGE---
router.get('/:courseId/details', async (req, res) => {
    let course = await courseService.getOne(req.params.courseId);
    let courseData = await course.toObject();

    let isCreator = courseData.creator == req.user?._id;

    res.render('course/details', { ...courseData, isCreator });
});

//---DELETE COURSE---
router.get('/:courseId/delete', notCreator, async (req, res) => {
    try {
        let courseId = req.params.courseId;
    
        await courseService.delete(courseId);
    
        res.redirect('/');
        
    } catch (error) {
        console.log(error);
    }
})

//---EDIT PAGE---
router.get('/:courseId/edit', notCreator, async (req, res) => {
    try {
        let course = await courseService.getOne(req.params.courseId);
        let courseData = await course.toObject();
    
        res.render('course/edit', { ...courseData });
        
    } catch (error) {
        console.log(error);
    }
});

router.post('/:courseId/edit', async (req, res) => {
    try {
        let courseId = req.params.courseId;
        let courseData = req.body;
    
        await courseService.updateOne(courseId, courseData);
    
        res.redirect(`/course/${courseId}/details`);
        
    } catch (error) {
        console.log(error);
    }
});

async function isCreator(req, res, next) {
    let course = await courseService.getOne(req.params.courseId);
    
    if (course.creator == req.user._id) {
        res.redirect(`course/${req.params.courseId}/details`);
    } else {
        next();
    }
};

async function notCreator(req, res, next) {
    let course = await courseService.getOne(req.params.courseId);
    
    if (course.creator !== req.user._id) {
        next();
    } else {
        res.redirect(`/course/${req.params.courseId}/details`)
    }
}

module.exports = router;