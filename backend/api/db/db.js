const Mongoose = require('mongoose');
const dbURI = process.env.DB_HOST;
const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  keepAlive: true,
};

async function main() {
  try {
    const db = await Mongoose.connect(dbURI, options);
    console.log('DB server connect');
  } catch (err) {
    console.error(err.message);
  }
}
main().catch(console.dir);

/*
function connectMongoose() {
  mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('DB server connect'))
    .catch(e => console.log('DB error', e));
};

connectMongoose();

const db = mongoose.connection;
const bucket = new mongoose


// Added check for DB connection

if (!db)
  console.log('Error connecting db')
else
  console.log('Db connected successfully')

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
*/
// BRING IN YOUR SCHEMAS & MODELS
require('./models/actualities');
require('./models/contact');
require('./models/greet');
require('./models/pictures');
require('./models/reservations');
require('./models/rooms');
require('./models/users');

/*const {readFileSync} = require('fs')

const valami = readFileSync('./api/db/base64', {encoding: 'base64'})
const buffer = Buffer.from(valami, 'base64')

const pic = new Mongoose.model('Actualities')
pic.data = buffer;
pic.contentType = 'image/jpg';

async function change() {
  try {
    return await Mongoose.model('Actualities').findByIdAndUpdate(
      { _id: '6130ce6e5278dd34ac457adc' },
      {
        $addToSet: { pics: { pic } },
      },
      { new: true }
    );
  } catch (err) {
    return err.message
  }
}

change().then(result => {
  console.log(result)
})*/
