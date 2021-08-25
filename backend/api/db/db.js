const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let gracefulShutdown;
const dbURI = process.env.DB_HOST;

mongoose.set('useCreateIndex', true);

function connectMongoose() {
  mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DB server connect"))
    .catch(e => console.log("DB error", e));
};

connectMongoose();

const db = mongoose.connection;

// Added check for DB connection

if (!db)
  console.log("Error connecting db")
else
  console.log("Db connected successfully")

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
  setTimeout(() => {
    connectMongoose();
  }, 3000);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app termination', () => {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./models/actualities');
require('./models/contact');
require('./models/greet');
require('./models/pictures');
require('./models/reservations');
require('./models/rooms');
require('./models/users');