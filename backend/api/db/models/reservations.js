const mongoose = require('mongoose');

const ReservationsSchema = new mongoose.Schema({
    confirmed: { type: Boolean, default: false },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: false },
    arrivalAt: { type: Date, required: true, unique: true },
    leaveAt: { type: Date, required: true, unique: true },
    updatedAt: { type: Date, default: Date.now },
});

const OccupationSchema = new mongoose.Schema({
    dates: { type: Array, required: true },
    updatedAt: { type: Date, default: Date.now },
});

mongoose.model('Reservations', ReservationsSchema);
mongoose.model('Occupation', OccupationSchema);