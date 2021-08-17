import * as mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    phone: { type: String, required: true, },
    email: { type: String, required: true, },
    text: { type: String, required: true, },
    address: { type: String, required: false, },
    updatedAt: { type: Date, default: Date.now },
});