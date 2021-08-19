import * as mongoose from 'mongoose';

export const ActualitiesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    pics: { type: Array, required: false },
    updatedAt: { type: Date, default: Date.now },
});