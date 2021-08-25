const mongoose = require('mongoose');
const { PicturesSchema } = require('./pictures');

const ActualitiesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    pics: { type: [PicturesSchema], required: false },
    updatedAt: { type: Date, default: Date.now },
});

mongoose.model('Actualities', ActualitiesSchema);