const jwt = require('../utils/jwt.js');

const User = require('../models/User.js');
const { JWT_SECRET } = require('../constants.js');

exports.login = async ({ username, password }) => {
    let user = await User.findOne({ username });
    console.log(user);
    if (!user) {
        throw new Error('Inavalid username or password!');
    }

    let isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Inavalid username or password!');
    }

    let payload = {
        _id: user._id,
        username: user.username,
    }

    let token = await jwt.sign(payload, JWT_SECRET);

    return token;
};

exports.register = (userData) => User.create(userData);