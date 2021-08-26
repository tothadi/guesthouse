const express = require('express');
const { join } = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');

require('../api/db/db');
require('../config/passport');

const API = require('../api/index');

const client = express();
const admin = express();

client.use(cookieParser());
client.use(cors());
client.use(express.json());
client.use(express.urlencoded({
    extended: true
}));
client.use('/api', API);
client.use(express.static(join(__dirname, 'frontend/client')));
client.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'frontend/client/index.html'));
});

admin.use(cookieParser());
admin.use(cors());
admin.use(express.json());
admin.use(express.urlencoded({
    extended: true
}));
admin.use(passport.initialize());
admin.use('/api', API);
admin.use(express.static(join(__dirname, 'frontend/admin')));
admin.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'frontend/admin/index.html'));
});

// catch 404 and forward to error handler
admin.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

client.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
admin.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

client.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

// development error handler
// will print stacktrace
if (admin.get('env') === 'development') {
    admin.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

if (client.get('env') === 'development') {
    client.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
admin.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
})

client.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
})


module.exports.client = client;
module.exports.admin = admin;
