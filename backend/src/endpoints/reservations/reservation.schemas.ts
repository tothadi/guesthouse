import * as mongoose from 'mongoose';

export const ReservationsSchema = new mongoose.Schema({
    confirmed: { type: Boolean, default: false },
    name: { type: String, required: true },
    companyName: { type: String, required: false },
    taxNumber: { type: String, required: false },
    placeOfBirth: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    mothersName: { type: String, required: false, },
    idType: { type: String, required: false, enum: ['id', 'pp', 'dl'] },
    idNumber: { type: String, required: false },
    zip: { type: Number, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    address: { type: Number, required: true },
    addressMisc: { type: String, required: false },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    adults: { type: Number, required: true, min: 1, max: 7 },
    infants: { type: Number, required: false },
    comment: { type: String, required: false },
    arrivalAt: { type: Date, required: true, unique: true },
    leaveAt: { type: Date, required: true, unique: true },
    currency: { type: String, required: true, enum: ['HUF', 'EUR'] },
    paymentMethod: { type: String, required: true, enum: ['atutalas', 'paypal', 'bankkartya'] },
    paymentAmount: { type: Number, required: true },
    paymentPaidAt: { type: Date, required: false },
    paymentProformNumber: { type: String, default: 'not issued' },
    paymentInvoiceNumber: { type: String, required: false },
    paymentFulfilled: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now },
});

export const OccupationSchema = new mongoose.Schema({
    dates: { type: Array, required: true },
    updatedAt: { type: Date, default: Date.now },
});