const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http').createServer(app),
    game_route = require('./routes/game.route'),
    game_controller = require('./controllers/game.controller');

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
                data_return = { "success": true, "personnage": personnage.data };
            } else {
                data_return = { "success": false, "message": personnage.message };
            }
        }
        socket.emit('go_to_main_sreen', { data: data_return });
    });
});

