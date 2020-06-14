const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user-model');

mongoose.set('useCreateIndex', true); //avoid deprecation

const app = express();
const port = 3000;

// Configure MongoDB
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

// Configure passport and sessions
// app.use(session({
// 	secret: "this is my secret hush hush",
// 	resave: false,
// 	saveUninitialized: false,
// }));

app.use(passport.initialize());
// app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mount routes
app.use('/', indexRouter);

app.listen(port, () => console.log(`Dear diary is running on ${port}`));