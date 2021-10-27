const router = require('express').Router();

const { isAuth, isGuest } = require('../middlewares/authMiddleware.js');
const authService = require('../services/authService.js');
const { AUTH_COOKIE_NAME } = require('../constants.js');

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password })

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/');
    } catch (err) {
        //todo; notification
        console.log(err);
        res.end();
    }
})

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.locals.error = 'Password mismatch'

        return res.render('auth/register');
    }

    try {
        await authService.register({
            username,
            password,
        });

        let token = await authService.login({
            username,
            password
        });

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/');
    } catch (error) {
        //todo return err
        console.log(error);
        res.end();
    }
    // = req.body
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);

    res.redirect('/');
});

module.exports = router;