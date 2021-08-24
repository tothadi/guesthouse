const mongoose = require('mongoose');

const ActualitiesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    pics: { type: Array, required: false },
    updatedAt: { type: Date, default: Date.now },
});

mongoose.model('Actualities', ActualitiesSchema);