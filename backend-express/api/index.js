const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const mongoose = require('mongoose');
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['RS256'],
  userProperty: 'payload'
});

const Actualities = mongoose.model('Actualities');
const Contact = mongoose.model('Contact');
const Greet = mongoose.model('Greet');
const Reservations = mongoose.model('Reservations');
const Rooms = mongoose.model('Rooms');

const objRep = {
    Models: {
        'actualities': Actualities,
        'contact': Contact,
        'greet': Greet,
        'reservations': Reservations,
        'rooms': Rooms,
    },
}

const getAllMW = require('./controllers/getAll')(objRep);
const getOneMW = require('./controllers/getOne')(objRep);
const createMW = require('./controllers/create')(objRep);
const updateMW = require('./controllers/update')(objRep);
const deleteMW = require('./controllers/delete')(objRep);

router.get('/:model', getAllMW);
router.get('/:model/:id', getOneMW);
router.post('/:model', auth, createMW);
router.post('/:model/:id', auth, getOneMW, updateMW);
router.post('/:model/:id', auth, getOneMW, deleteMW);

module.exports = router