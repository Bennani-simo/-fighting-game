const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PersonnageSchema = new Schema({
    pseudo: { type: String, required: true },
    lvl: { type: Number, required: true },
    xp: { type: Number, required: true },
    vie: { type: Number, required: true },
    mana: { type: Number, required: true },
    vigueur: { type: Number, required: true },
    force: { type: Number, required: true },
    defense: { type: Number, required: true },
    name_class: { type: String, required: true },
    image: { type: String, required: true }

});


// Export the model
module.exports = mongoose.model('Personnage', PersonnageSchema);

