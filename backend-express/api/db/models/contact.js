const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    order: { type: Number, required: true },
    label: { type: String, required: true },
    data: { type: String, required: true },
    link: { type: String, required: true },
    icon: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
});

mongoose.model('Contact', ContactSchema);