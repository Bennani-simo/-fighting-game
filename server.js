const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http').createServer(app),
    game_route = require('./routes/game.route'),
    game_controller = require('./controllers/game.controller'),
    ejs = require('ejs'),
    fs = require('fs');
/* Models */
const Personnage = require('./models/personnage.model'),
    Classe = require('./models/classe.model'),
    Monstre = require('./models/monstre.model');

/* View engine */
app.set('view engine', 'ejs');

/* Set up mongoose connection */
const mongoose = require('mongoose');
let mongoDB = 'mongodb+srv://benten:benten@cluster0-mzln8.mongodb.net/fighting-game?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.json())

/* Http Routes */
app.use('/', game_route);

/* Listen to server */
http.listen(3000, function () {
    console.log('||Listening on 3000')
})

/* Connection to socket.io */
const io = require('socket.io')(http);
console.log('|| Socket server on');

let levels = [0, 0, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000];

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('a user disconected');
    });


    socket.on('create_personnage', async (data) => {
        let data_return;
        if (data.pseudo == "" || data.classe_name == "") {
            data_return = { "success": false, "message": "Pseudo existant" };
        } else {
            let personnage = await game_controller.create_new_personnage(data);
            if (personnage.success) {
                let monstres = await game_controller.get_monstres();
                console.log(monstres);
                fs.readFile('./views/screens/screen_game.ejs', 'utf8', function (err, template) {
                    let nextLevelXp = levels[personnage.data.lvl + 1]
                    personnage.data.xpPercent = 100 - ((nextLevelXp - personnage.data.xp) / 10);
                    let screen_game_template = ejs.render(template, { name: 'Monstre', personnage: personnage.data, monstres: monstres });
                    data_return = { "success": true, "personnage": personnage.data, "next_screen": screen_game_template };
                    socket.emit('go_to_main_sreen', data_return);
                });
            } else {
                data_return = { "success": false, "message": personnage.message };
            }
        }
        socket.emit('go_to_main_sreen', data_return);

    });

    socket.on('attaque_monstre', async (data) => {
        let monstre = await game_controller.get_monstre_by_name(data.monstre);
        let personnage = await game_controller.get_personnage_by_pseudo(data.pseudo);
        console.log(personnage);
        fs.readFile('./views/screens/screen_combat.ejs', 'utf8', function (err, template) {
            let screen_combat_template = ejs.render(template, { name: 'Combat', personnage: personnage, monstre: monstre });
            data_return = { "success": true, "personnage": personnage, "next_screen": screen_combat_template };
            socket.emit('go_to_main_sreen', data_return);
        });

    });
});

