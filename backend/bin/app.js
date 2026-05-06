if (process.env.NODE_ENV === 'development') {
    require('../config/config');
}
const express = require('express');
const { GridFSBucket } = require('mongodb');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const db = require('../api/db/db');
const startServer = require('./startServer');

db().then((fileDB) => {
    require('../config/passport');

    const bucket = new GridFSBucket(fileDB, {
        bucketName: 'images'
    });

    const app = express();

    app.use(cookieParser());
    app.use(cors({
        origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [],
        credentials: true,
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize());

    require('../api/index')(app, { bucket });

    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            return res.status(401).json({ message: err.name + ': ' + err.message });
        }
        const status = err.status || 500;
        const body = app.get('env') === 'development'
            ? { message: err.message, error: err }
            : { message: err.message };
        res.status(status).json(body);
    });

    startServer(app);

}).catch((err) => {
    console.log(err);
    process.exit(1);
})
