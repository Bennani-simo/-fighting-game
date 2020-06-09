const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClasseSchema = new Schema({
    name: { type: String, required: true },
    vie: { type: Number, required: true },
    mana: { type: Number, required: true },
    vigueur: { type: Number, required: true },
    force: { type: Number, required: true },
    defense: { type: Number, required: true },
});


// Export the model
module.exports = mongoose.model('Classe', ClasseSchema);