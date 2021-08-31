const mongoose = require('mongoose');
const { SectionsSchema } = require('./sections');

const GreetSchema = new mongoose.Schema({
    motto: { type: String, required: true, },
    sections: { type: [SectionsSchema], required: true },
    updatedAt: { type: Date, default: Date.now },
});

mongoose.model('Greet', GreetSchema);