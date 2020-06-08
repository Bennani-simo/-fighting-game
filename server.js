const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://benten:benten@cluster0-mzln8.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });



client.connect(/* ... */)
    .then(client => {
        // ...
        const db = client.db('fighting-game')
        const personnagesCollection = db.collection('personnages')

        app.post('/heroes', (req, res) => {
            personnagesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
        })

        // ...
    })

app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/heroes', (req, res) => {
    console.log(req.body)
})

app.listen(3000, function () {
    console.log('listening on 3000')
})
