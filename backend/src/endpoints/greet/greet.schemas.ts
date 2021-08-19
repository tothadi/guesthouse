import * as mongoose from 'mongoose';

export const GreetSchema = new mongoose.Schema({
    motto: { type: String, required: true, },
    paragraphs: { type: Array, required: true, },
    updatedAt: { type: Date, default: Date.now },
});