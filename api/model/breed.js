const mongoose = require('mongoose');

const CatSchema = mongoose.Schema({
    name: String,
    description: String,
    temperament: String,
    origin: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Cat', CatSchema);
