const mongoose = require('mongoose');

const GreetSchema = new mongoose.Schema({
    motto: { type: String, required: true, },
    paragraphs: { type: Array, required: true, },
    updatedAt: { type: Date, default: Date.now },
});

mongoose.model('Greet', GreetSchema);