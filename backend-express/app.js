const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('./api/db/db')

const API = require('./api/index');

const client = express();
const admin = express();

client.use(express.urlencoded({ extended: true }));
client.use(cookieParser());
client.use(cors());
client.use(favicon(__dirname + '/assets/favicon.ico'));
client.use('/api', API);
client.use(express.static(path.join(__dirname, 'frontend/client')));
client.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'frontend/client/index.html'));
});

admin.use(express.urlencoded({ extended: true }));
admin.use(cookieParser());
admin.use(cors());
admin.use(favicon(__dirname + '/assets/favicon.ico'));
admin.use('/api', API);
admin.use(express.static(path.join(__dirname, 'frontend/admin')));
admin.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'frontend/admin/index.html'));
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
