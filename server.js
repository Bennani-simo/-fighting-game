const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const game_route = require('./routes/game.route');

app.set('view engine', 'ejs');

// Set up mongoose connection
const mongoose = require('mongoose');
let mongoDB = "mongodb+srv://benten:benten@cluster0-mzln8.mongodb.net/fighting-game?retryWrites=true&w=majority";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Routes */
app.use('/', game_route);

// Listen to server
app.listen(3000, function () {
    console.log('listening on 3000')
})
