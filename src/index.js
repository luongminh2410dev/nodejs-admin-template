const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');
const db = require('./config/database');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const sort = require('./app/middlewares/sort');
const hbsHelper = require('./ultilities/handlebars-helper');
require('dotenv').config();

// Session & Passport
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session());

// Connect to database
db.connect();
// Set static path
app.use(express.static(path.join(__dirname, 'public')))
// Help parse body (same as body-parser package)
app.use(express.urlencoded({
    extended: true
}));
// 
app.use(express.json());
// HTTP logger
app.use(morgan('combined'));
// Template engine
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: hbsHelper
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Custom middlewares
app.use(sort);

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Route init
route(app);

// 127.0.0.1 -> localhost
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
