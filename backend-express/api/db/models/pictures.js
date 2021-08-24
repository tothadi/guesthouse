const mongoose = require('mongoose');
const PicturesSchema = new mongoose.Schema({
    base64: { type: String, required: true },
    caption: { type: String, required: false },
});

module.exports.PicturesSchema = PicturesSchema;

mongoose.model('Pictures', PicturesSchema);