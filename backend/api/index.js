const express = require('express');
const router = express.Router();
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

const Actualities = mongoose.model('Actualities');
const Contact = mongoose.model('Contact');
const Greet = mongoose.model('Greet');
const Pictures = mongoose.model('Pictures');
const Reservations = mongoose.model('Reservations');
const Rooms = mongoose.model('Rooms');
const User = mongoose.model('User');

const objRep = {
  Models: {
    'actualities': Actualities,
    'contact': Contact,
    'greet': Greet,
    'pictures': Pictures,
    'rooms': Rooms,
  },
  Restricted: {
    'reservations': Reservations,
    'user': User,
  }
}

const isValidRouteMW = require('./middlewares/validate-route');
const rolesMW = require('./middlewares/roles.js');
const registerMW = require('./middlewares/register')(objRep);
const loginMW = require('./middlewares/login');

const getAllMW = require('./middlewares/get-all')(objRep);
const getOneMW = require('./middlewares/get-one')(objRep);
const createMW = require('./middlewares/create-new');
const specialEditMW = require('./middlewares/edit-new');
const saveMW = require('./middlewares/save-new')(objRep);
const updateOneMW = require('./middlewares/update-one')(objRep);
const deleteOneMW = require('./middlewares/delete-one')(objRep);
const addPicMW = require('./middlewares/add-pics')(objRep);
const updatePicMW = require('./middlewares/update-pics')(objRep);
const rmPicMW = require('./middlewares/rm-pics')(objRep);


/**
 * Sends all documents from model - /api/all-rooms
 */
router.get(
  '/all-:model',
  isValidRouteMW(objRep),
  getAllMW
);

/**
 * Sends one document of model - /api/one-rooms/idOfRoom
 */
router.get(
  '/one-:model/:id',
  isValidRouteMW(objRep),
  getOneMW,
  (req, res, next) => res.json(res.locals.document)
);

/**
 * Creates a new document - /api/new-rooms
 */
router.put('/new-:model',
  isValidRouteMW(objRep),
  auth,
  createMW(objRep),
  saveMW
);

/**
 * Adds a new pic to the pics array of a document - /api/rooms/add-pics/idOfRoom
 */
router.put(
  '/:model/add-pics/:id',
  isValidRouteMW(objRep),
  //auth,
  getOneMW,
  upload.array('pics'),
  addPicMW
);

/**
 * Updates the requested properties of a document - /api/update-rooms/idOfRoom
 */
router.patch(
  '/update-:model/:id',
  isValidRouteMW(objRep),
  //auth,
  getOneMW,
  updateOneMW
);

/**
 * Updates the caption of a picture in the pics array of a document - /api/rooms/update-pics/idOfRoom/idOfPic
 */
router.patch(
  '/:model/pics-update/:id/:picid',
  isValidRouteMW(objRep),
  auth,
  getOneMW,
  updatePicMW
);

/**
 * Deletes a picture from the pics array of a document - /api/rooms/rm-pics/idOfRoom/idOfPic
 */
router.delete(
  '/:model/rm-pics/:id/:picid',
  isValidRouteMW(objRep),
  auth,
  getOneMW,
  rmPicMW
);

/**
 * Deletes a document - /api/delete-rooms/idOfRoom
 */
router.delete(
  '/delete-:model/:id',
  isValidRouteMW(objRep),
  auth,
  getOneMW,
  deleteOneMW
);

/**
 * Registers a new admin user
 */
router.post(
  '/signup',
  auth,
  rolesMW(),
  registerMW
);

router.post('/signin', loginMW(passport));

module.exports = router;