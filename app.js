require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport = require('./helpers/passport')
const session      = require('express-session')
const MongoStore = require("connect-mongo")(session);
let { isRole, isAdmin, isLoggedIn, isAuth } = require('./helpers/middlewares')

mongoose
  .connect(process.env.DB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Sessions
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  httpOnly: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.use(passport.initialize())
app.use(passport.session())

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));




//Static
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';
app.locals.logged = false

// Nav bar dynamic content based on session
function isLogged(req, res, next) {
  if (req.isAuthenticated()) {
    app.locals.logged = true
    next()
  } else {
    app.locals.logged = false
    next()
  }
}

const index = require('./routes/index');
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const cities = require('./routes/cities');
app.use('/', cities);
app.use('/admin', isLogged//, isLoggedIn, isAdmin
  , admin);
app.use('/', isLogged, auth);
app.use('/', isLogged, index);


module.exports = app;
