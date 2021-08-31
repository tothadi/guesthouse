const mongoose = require('mongoose');
const { SectionsSchema } = require('./sections');

const GreetSchema = new mongoose.Schema({
    order: { type: Number, required: true },
    motto: { type: String, required: true, },
    sections: { type: [SectionsSchema], required: true },
    updatedAt: { type: Date, default: Date.now },
});

mongoose.model('Greet', GreetSchema);