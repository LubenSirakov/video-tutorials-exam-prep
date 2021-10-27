const router = require('express').Router();

const authService = require('../services/authService.js');
const { AUTH_COOKIE_NAME } = require('../constants.js');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         let token = await authService.login({ username, password });

//         res.cookie(AUTH_COOKIE_NAME, token);

//         res.redirect('/');

//     } catch (error) {
//         console.log(err);
//         res.end();
//     }
// })

router.post('/login', async (req, res) => {
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

router.get('/register', (req, res) => {
    res.render('auth/register');
});

// router.post('/register', async (req, res) => {
//     const { username, password, repeatPassword } = req.body;
//     console.log(req.body);
//     if (password !== repeatPassword) {
//         res.locals.error = 'Password mismatch';

//         return res.render('auth/register');
//     }

//     try {
//         await authService.register({
//             username,
//             password,
//         });

//         let token = await authService.login({
//             username,
//             password,
//         });

//         res.cookie(AUTH_COOKIE_NAME, token);

//         res.redirect('/');
//     } catch (error) {
//         // console.log(error);
//     }
// });

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.locals.error = 'Password mismatch'
        console.log('no');
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
        console.log('yes');
        res.redirect('/');
    } catch (error) {
        //todo return err
        console.log(error);
        res.end();
    }
    // = req.body
});

module.exports = router;