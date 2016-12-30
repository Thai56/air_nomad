// ====================================================================================================
// VARIABLES/CONSTANTS
// ====================================================================================================
const express = require('express'),
    app = module.exports = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    session = require('express-session'),
    port = 3000,
    massive = require('massive'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser')
session = require('express-session'),
    config = require('./config');

// ==================================================================================================
// DATABASE
// ==================================================================================================
const massiveInstance = massive.connectSync({
    connectionString: 'postgres://localhost/air-nomad'
})
app.set('db', massiveInstance);

const db = app.get('db');

const Ctrl = require('./controllers/controller');

app.use(session({
        secret: config.secret_Key,
        saveUninitialized: false,
        resave: true
    }))
    /**
     * Local Auth
     */
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.getUserByUsername([username], function(err, user) {
      user = user[0];
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    })
  }
))

passport.serializeUser(function(user, done) {
    done(null, user.userid);
})

passport.deserializeUser(function(id, done) {
    db.getUserById([id], function(err, user) {
        user = user[0];
        if (err) console.log(err);
        else console.log('RETRIEVED USER');
        console.log(user);
        done(null, user);
    })
})

// ====================================================================================================
// MIDDLEWARE
// ====================================================================================================
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + '/../public'))
    // app.use('/dist',express.static(__dirname + '/../dist'))
app.use('/lib', express.static(__dirname + '/../node_modules'))

// ====================================================================================================
// ENDPOINTS
// ====================================================================================================

app.post('/login', passport.authenticate('local'), function(req, res, next) {
    console.log(req.body);
    res.status(200).redirect('/#/')
})

app.get('/auth/me', function(req, res) {
  if (req.user) {
    console.log(req.user);
    res.status(200).send(req.user);
  } else {
    console.log('NO user!')
    res.status(200).send();
  }
})

app.get('/rooms/search/:keyword', Ctrl.findLocationByKeyword)

app.get('/rooms/listings', Ctrl.getListingsForHome)

app.get('/rooms/img/:room_id', Ctrl.getRoomListingMainPic)

app.get('/rooms/desc/:room_id', Ctrl.getRoomListingMainDesc)

app.get('/rooms/about/:room_id', Ctrl.getRoomListingMainAccessories)

app.get('/rooms/carousel/:room_id', Ctrl.getRoomListMainCarousel)

app.get('/rooms/profile-pic/:room_id', Ctrl.getRoomListingProfilePic)

app.get('/rooms/nightly_price/:room_id', Ctrl.getRoomListingNightlyPrice)

app.post('/rooms/reservations', Ctrl.reserveDate)

app.get('/rooms/locations/:room_id', Ctrl.getRoomListingCoordinates)

app.post('/rooms/reviews', Ctrl.addReview)

app.get('/rooms/reviews/:room_id', Ctrl.getReviews)

app.get('/users/profile-pic/:user_id', Ctrl.getUsersProfilePic)

app.get('/users/desc-header/:user_id', Ctrl.getHostDesc)

app.get('/users/listings/:user_id', Ctrl.getHostListings)
    // ====================================================================================================
    // WATCH/LISTEN FUNCTION
    // ====================================================================================================
app.listen(port, () => console.log('You are now listening on port', port))
