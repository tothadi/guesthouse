const mongoose = require('mongoose');
const { PicturesSchema } = require('./pictures');
const { SectionsSchema } = require('./sections');

const RoomsSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  menu: { type: String, required: true },
  title: { type: String, required: true },
  sections: { type: [SectionsSchema], required: true },
  link: { type: String, required: true },
  pics: { type: [PicturesSchema], required: true },
  updatedAt: { type: Date, default: Date.now },
});

mongoose.model('Rooms', RoomsSchema);
