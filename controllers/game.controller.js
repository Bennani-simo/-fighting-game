const Product = require('../models/personnage.model'),
    Classe = require('../models/classe.model');

exports.main = function (req, res) {
    res.render('main', { name: 'Akashdeep' });
};

exports.create_new_personnage = function (req, res) {
    res.render('main', { name: 'Akashdeep' });
};