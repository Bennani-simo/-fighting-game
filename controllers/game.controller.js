const Personnage = require('../models/personnage.model'),
    Classe = require('../models/classe.model');



exports.main = async function (req, res) {
    const classes = await getClasses()
    res.render('main', { name: 'Akashdeep', classes: classes });
};

exports.recup_personnage = async (req, res) => {
    try{
        const personnage = await Personnage.find()
        res.json(personnage)
    }catch(err){
        res.send('Error' + err)
    }
}


exports.recup_classes = async (req, res) => {
    try{
        const classes = await Classe.find()
        res.json(classes)
    }catch(err){
        res.send('Error ' + err)
    }
}





exports.create_new_personnage = async (req, res) => {
    // console.log('body:' + JSON.stringify(req.body));

    const classes = await getClasses();
    // console.log('classes:' + classes );

    const currentClasse = classes.find(function(val){
        // console.log("val:" + val);
        return val.name === req.body.name_class;
        
    })
    if (!currentClasse) {
        res.status(400).send("Name classe does not exist")
        return 
    }

    const personnageToSave = new Personnage({
        pseudo: req.body.pseudo,
        lvl: 1,
        xp: 0,
        vie: currentClasse.vie,
        mana: currentClasse.mana,
        vigueur: currentClasse.vigueur,
        force: currentClasse.force,
        defense: currentClasse.defense,
        name_class: req.body.name_class
    })

    try{
        const personnage = await personnageToSave.save()
        res.json(personnage)
    }catch(err){
        console.error(err)
        res.send('Error')
    }

};

async function getClasses(){
    let classes
    try{
        classes = await Classe.find()
    }catch(err){
        console.error('Error ' + err)
        return [];
    
    }
    return classes;
}



/* exports.create_new_personnage = function (req, res) {
    res.render('main', { name: 'Akashdeep' }); */







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
