import * as mongoose from 'mongoose';

export const PicturesSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    caption: { type: String, required: false }
})

export const GalleriesSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    folder: { type: String, required: true, unique: true },
    text: { type: String, required: false },
    pics: { type: PicturesSchema, required: false },
    updatedAt: { type: Date, default: Date.now },
});