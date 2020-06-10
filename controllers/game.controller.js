const Personnage = require('../models/personnage.model'),
    Classe = require('../models/classe.model'),
    Monstre = require('../models/monstre.model');

exports.main = async function (req, res) {
    const classes = await get_classes()
    res.render('main', { name: 'Accueil', classes: classes });
};

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
exports.get_personnage_by_pseudo = async (pseudo) => {
    const personnage = await Personnage.findOne({ 'pseudo': pseudo })
    return personnage;
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

/* Monstre methodes */
exports.get_monstres = async () => {
    const monstres = await Monstre.find()
    return monstres;
}
exports.get_monstre_by_name = async (name) => {
    const monstre = await Monstre.findOne({ 'name': name })
    return monstre;
}


exports.create_new_personnage = async (personnageData) => {
    let pseudoExist = await Personnage.findOne({ "pseudo": personnageData.pseudo })

    if (pseudoExist == null) {
        let currentClasse = await get_classes_by_name(personnageData.name_class);

        let personnageToSave = new Personnage({
            pseudo: personnageData.pseudo,
            lvl: 1,
            xp: 1400,
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

