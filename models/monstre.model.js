const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MonstreSchema = new Schema({
    name: { type: String, required: true },
    lvl: { type: Number, required: true },
    vie: { type: Number, required: true },
    force: { type: Number, required: true },
    defense: { type: Number, required: true },
    xp: { type: String, required: true }
});


// Export the model
module.exports = mongoose.model('Monstre', MonstreSchema);