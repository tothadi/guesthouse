const mongoose = require('mongoose');
const PicturesSchema = new mongoose.Schema({
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  caption: { type: String, required: false },
});

module.exports.PicturesSchema = PicturesSchema;

mongoose.model('Pictures', PicturesSchema);
