const Personnage = require('../models/personnage.model'),
    Classe = require('../models/classe.model');

exports.main = function (req, res) {
    res.render('main', { name: 'Akashdeep' });
};

exports.create_new_personnage = function (req, res) {
    res.render('main', { name: 'Akashdeep' });

    /* exports.create_new_personnage = function (req, res) {
        let name_class = req.body.name_class;
        // vérifié si le pseudo
        res.send({"success": false, "message": "pseudo oblogatire"});
        Classe.find({"name": "test"}, function (err, object) {});
        // faut récupérer les infos de la classe demandé
        // faut affecter les info de la classe au personnage
        // faut affecter le pseudo au personnage
        // faut savegaurde le personnage dans la bdd
    
        let personnage = new Personnage(
            {
                pseudo: req.body.pseudo,
                lvl: 100,
                xp: 100,
                vie: 200,
                mana: 200,
                vigueur: 200,
                force: 200,
                defense: 200,
                name_class: "rzerze",
            }
        );
    
        personnage.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('Product Created successfully')
        }) */
};