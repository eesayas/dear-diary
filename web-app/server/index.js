const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://deardiary:deardiary@deardiary-4hhbl.gcp.mongodb.net/posts?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('you are connected to the Dear Diary database...');
});

const indexRouter = require('./routes/index-router');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Hello app!');
// });

app.use('/', indexRouter);

app.listen(port, () => console.log(`Dear diary is running on ${port}`));

