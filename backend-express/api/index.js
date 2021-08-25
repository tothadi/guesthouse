const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['RS256'],
  userProperty: 'payload'
});

const Actualities = mongoose.model('Actualities');
const Contact = mongoose.model('Contact');
const Greet = mongoose.model('Greet');
const Pictures = mongoose.model('Pictures');
const Reservations = mongoose.model('Reservations');
const Rooms = mongoose.model('Rooms');

const objRep = {
  Models: {
    'actualities': Actualities,
    'contact': Contact,
    'greet': Greet,
    'pictures': Pictures,
    'reservations': Reservations,
    'rooms': Rooms,
  },
}

const getAllMW = require('./controllers/get-all');
const getOneMW = require('./controllers/get-one');
const createMW = require('./controllers/create');
const updateOneMW = require('./controllers/update-one');
const deleteOneMW = require('./controllers/delete-one');
const addPicMW = require('./controllers/add-pics');
const updatePicMW = require('./controllers/update-pics.js');
const rmPicMW = require('./controllers/rm-pics');

router.get('/all-:model', getAllMW(objRep)); // Sends all documents from model - /api/all-rooms
router.get('/one-:model/:id', getOneMW(objRep), (req, res, next) => res.json(res.locals.document)); // Sends one document of model - /api/one-rooms/idOfRoom

router.put('/new-:model', auth, createMW(objRep)); // Creates a new document - /api/new-rooms
router.put('/:model/add-pics/:id', auth, getOneMW(objRep), upload.array('pics'), addPicMW(objRep)); // Adds a new pic to the pics array of a document - /api/rooms/add-pics/idOfRoom

router.patch('/update-:model/:id', auth, getOneMW(objRep), updateOneMW(objRep)); // Updates the requested properties of a document - /api/update-rooms/idOfRoom
router.patch('/:model/pics-update/:id/:picid', auth, getOneMW(objRep), updatePicMW(objRep)); // Updates the caption of a picture in the pics array of a document - /api/rooms/update-pics/idOfRoom/idOfPic

router.delete('/:model/rm-pics/:id/:picid', auth, getOneMW(objRep), rmPicMW(objRep)); // Deletes a picture from the pics array of a document - /api/rooms/rm-pics/idOfRoom/idOfPic
router.delete('/delete-:model/:id', auth, getOneMW(objRep), deleteOneMW(objRep)); // Deletes a document - /api/delete-rooms/idOfRoom

module.exports = router;