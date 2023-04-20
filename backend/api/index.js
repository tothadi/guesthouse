const jwt = require('express-jwt');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['RS256', 'HS256'],
  userProperty: 'payload',
});

const parseLinkToken = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['RS256', 'HS256'],
  requestProperty: 'newReservation',
  getToken: (req) => req.query.payload
});

const Actualities = mongoose.model('Actualities');
const Contact = mongoose.model('Contact');
const Greet = mongoose.model('Greet');
const Pictures = mongoose.model('Pictures');
const Reservations = mongoose.model('Reservations');
const Rooms = mongoose.model('Rooms');
const User = mongoose.model('User');


module.exports = function (app, { bucket }) {
  const objRep = {
    bucket,
    Models: {
      'actualities': Actualities,
      'contact': Contact,
      'greet': Greet,
      'pictures': Pictures,
      'rooms': Rooms,
      'reservations': Reservations,
    },
    Restricted: {
      'user': User,
    }
  }

  const isValidRouteMW = require('./middlewares/validate-route');
  const rolesMW = require('./middlewares/roles.js');
  const registerMW = require('./middlewares/register')(objRep);
  const loginMW = require('./middlewares/login');

  const getAllMW = require('./middlewares/get-all')();
  const getOneMW = require('./middlewares/get-one')();
  const createMW = require('./middlewares/create-new');
  const specialEditMW = require('./middlewares/edit-new');
  const saveMW = require('./middlewares/save-new')();
  const updateOneMW = require('./middlewares/update-one')();
  const deleteOneMW = require('./middlewares/delete-one')();

  const getPicsMW = require('../api/middlewares/get-pics');
  const addPicMW = require('./middlewares/add-pics')(objRep);
  const updatePicMW = require('./middlewares/update-pics')();
  const rmPicMW = require('./middlewares/rm-pics')(objRep);

  /**
   * Sends all documents from model - /api/all-rooms
   */
  app.get(
    '/api/all-:model',
    isValidRouteMW(objRep),
    auth.unless((req, res, next) => !Object.keys(objRep.Restricted).includes(req.params.model)),
    getAllMW
  );

  /**
   * Sends one document of model - /api/one-rooms/idOfRoom
   */
  app.get(
    '/api/one-:model/:id',
    isValidRouteMW(objRep),
    auth.unless((req, res, next) => !Object.keys(objRep.Restricted).includes(req.params.model)),
    getOneMW,
    (req, res, next) => res.json(res.locals.document)
  );

  /**
   * Creates a new document - /api/new-rooms
   */
  app.put(
    '/api/new-:model',
    auth.unless((req, res, next) => req.params.model=== 'reservations'),
    isValidRouteMW(objRep),
    createMW(objRep),
    saveMW
  );

  app.get(
    '/api/:model/confirmation',
    parseLinkToken,
    isValidRouteMW(objRep),
    createMW(objRep),
    saveMW
  )

  app.use(
    '/image/:fileName',
    getPicsMW(objRep)
  );

  /**
   * Adds a new pic to the pics array of a document - /api/rooms/add-pics/idOfRoom
   */
  app.put(
    '/api/:model/add-pics/:id',
    auth,
    isValidRouteMW(objRep),
    getOneMW,
    upload.array('pics'),
    addPicMW
  );

  /**
   * Updates the requested properties of a document - /api/update-rooms/idOfRoom
   */
  app.patch(
    '/api/update-:model/:id',
    auth,
    isValidRouteMW(objRep),
    getOneMW,
    updateOneMW
  );

  /**
   * Updates the caption of a picture in the pics array of a document - /api/rooms/update-pics/idOfRoom/idOfPic
   */
  app.patch(
    '/api/:model/pics-update/:id/:picid',
    auth,
    isValidRouteMW(objRep),
    getOneMW,
    updatePicMW
  );

  /**
   * Deletes a picture from the pics array of a document - /api/rooms/rm-pics/idOfRoom/idOfPic
   */
  app.delete(
    '/api/:model/rm-pics/:id/:fileName',
    auth,
    isValidRouteMW(objRep),
    getOneMW,
    rmPicMW
  );

  /**
   * Deletes a document - /api/delete-rooms/idOfRoom
   */
  app.delete(
    '/api/delete-:model/:id',
    auth,
    isValidRouteMW(objRep),
    getOneMW,
    deleteOneMW
  );

  /**
   * Registers a new admin user
   */
  app.post(
    '/api/signup',
    auth,
    rolesMW(),
    registerMW
  );

  app.post('/api/signin', loginMW(passport));

}
