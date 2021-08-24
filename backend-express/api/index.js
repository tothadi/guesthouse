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

const getAllMW = require('./controllers/getAll');
const getOneMW = require('./controllers/getOne');
const createMW = require('./controllers/create');
const updateMW = require('./controllers/update');
const deleteMW = require('./controllers/delete');

router.get('/all-:model', getAllMW(objRep));
router.get('/one-:model/:id', getOneMW(objRep), (req, res, next) => res.json(res.locals.document));
router.put('/new-:model', auth, createMW(objRep));
router.patch('/update-:model/:id', auth, getOneMW(objRep), updateMW(objRep));
router.delete('/delete-:model/:id', auth, getOneMW(objRep), deleteMW(objRep));

module.exports = router