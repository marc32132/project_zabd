const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classSchema = new Schema({
    className: {
        type: String,
        required: true,
        trim: true,
    },
    groupNumber: {
        type: String,
        required: true,
        trim: true,
    },
    maxParticip: {
        type: Number, min: 15, max: 40,
        required: true,
    },
    participants: [String],
        
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;