import * as mongoose from 'mongoose';

export const GreetSchema = new mongoose.Schema({
    greet: { type: String, required: true, },
    motto: { type: String, required: true, },
    pic: { type: String, required: true, },
    updatedAt: { type: Date, default: Date.now },
});