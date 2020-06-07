const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/heroes', (req, res) => {
    console.log('Bonjour BenTen')
})

app.listen(3000, function () {
    console.log('listening on 3000')
})
