const mongoose = require('mongoose');
const { PicturesSchema } = require('./pictures');
const { SectionsSchema } = require('./sections');

const ActualitiesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    sections: { type: [SectionsSchema], required: true },
    pics: { type: [PicturesSchema], required: false },
    updatedAt: { type: Date, default: Date.now },
});

mongoose.model('Actualities', ActualitiesSchema);