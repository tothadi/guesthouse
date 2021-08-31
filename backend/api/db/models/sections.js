const mongoose = require('mongoose');

const SectionsSchema = new mongoose.Schema({
    title: { type: String, required: false },
    paragraphs: { type: [String], required: true },
    updatedAt: { type: Date, default: Date.now },
});

module.exports.SectionsSchema = SectionsSchema;
mongoose.model('Section', SectionsSchema);