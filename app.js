const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./route');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', route);
app.set('port', 8081);
app.use(express.static('static'));
app.use(function(req, res) {
    const err = new Error('Not Found');
    err.status = 404;
    res.json(err);
});


const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Connected to MongoDb', db);
    app.listen(app.get('port'), function() {
        console.log(`Server listening on ${app.get('port')}`);
    });
});



