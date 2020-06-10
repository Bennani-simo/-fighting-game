const Personnage = require('../models/personnage.model'),
    Classe = require('../models/classe.model'),
    Monstre = require('../models/monstre.model');

/* Personnages methodes */
async function savePersonnage(personnageToSave) {
    let personnage
    try {
        personnage = await personnageToSave.save()
        return personnage;
    } catch (err) {
        console.error(err)
        return false;
    }
}

/* Classes methodes */
async function get_classes() {
    let classes
    try {
        classes = await Classe.find()
    } catch (err) {
        console.error(err)
        return [];

    }
    return classes;
}

async function get_classes_by_name(name) {
    let classe
    try {
        classe = await Classe.findOne({ 'name': name })
    } catch (err) {
        console.error(err)
        return false;

    }
    return classe;
}

exports.main = async function (req, res) {
    const classes = await get_classes()
    res.render('main', { name: 'Accueil', classes: classes });
};

exports.main2 = async function (req, res) {
    const classes = await get_classes()
    const currentPersonnage = await Personnage.findById(req.query.userId);
    const monstres = await getMonstres()


    res.render('main2', { name: 'Monstre', classes: classes, personnage: currentPersonnage, monstres: monstres });
};

exports.recup_personnage = async (req, res) => {
    try {
        const personnage = await Personnage.find()
        res.json(personnage)
    } catch (err) {
        res.send('Error' + err)
    }
}

exports.recup_classes = async (req, res) => {
    try {
        const classes = await Classe.find()
        res.json(classes)
    } catch (err) {
        res.send('Error ' + err)
    }
}

exports.recup_monstres = async (req, res) => {
    try {
        const monstres = await Monstre.find()
        res.json(monstres)
    } catch (err) {
        res.send('Error ' + err)
    }
}

exports.create_new_personnage = async (personnageData) => {
    let pseudoExist = await Personnage.findOne({ "pseudo": personnageData.pseudo })

    if (pseudoExist == null) {
        let currentClasse = await get_classes_by_name(personnageData.name_class);

        let personnageToSave = new Personnage({
            pseudo: personnageData.pseudo,
            lvl: 1,
            xp: 0,
            vie: currentClasse.vie,
            mana: currentClasse.mana,
            vigueur: currentClasse.vigueur,
            force: currentClasse.force,
            defense: currentClasse.defense,
            name_class: personnageData.name_class
        })

        let personnage = await savePersonnage(personnageToSave);
        return { "success": true, "data": personnage }
    } else {
        return { "success": false, "message": "Pseudo existant" }
    }

};

