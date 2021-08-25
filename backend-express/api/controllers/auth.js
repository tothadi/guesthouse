const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

module.exports.register = (req, res) => {

    if (typeof req.body == 'undefined') {
        res.status(400).json({ saved: false, error: 'Request data missing.' });
        return;
    }

    const newUserName = req.body.username;
    const newUserEmail = req.body.email;

    User.findOne({ $or: [{ username: newUserName }, { email: newUserEmail },] }, ((err, user) => {
        if (err) {
            sendJSONresponse(res, 500, {
                'error': err.message
            });
            return;
        }
        if (user) {
            sendJSONresponse(res, 400, {
                'message': 'User already exists!'
            });
            return;
        }

        const newUser = new User();

        newUser.username = newUserName;
        newUser.email = newUserEmail;
        newUser.fullname = req.body.fullname;
        newUser.role = req.body.role;
        newUser.setPassword(req.body.password);

        newUser.save((err) => {
            if (err) {
                sendJSONresponse(res, 500, {
                    'error': err.message
                });
                return;
            }
            let token;
            token = newUser.generateJwt();
            res.status(200).json({ 'token': token });
        });
    }));

};

module.exports.login = (req, res) => {

    if (!req.body.username || !req.body.password) {
        sendJSONresponse(res, 400, {
            'message': 'All fields required'
        });
        return;
    }

    passport.authenticate('local', (err, user, info) => {
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json({ error: err.message });
            return;
        }

        // If user is not found
        if (!user) {
            res.status(401).json({ info });
            return;
        }

        const token = user.generateJwt();
        res.status(200).json({ 'token': token });

    })(req, res);
};