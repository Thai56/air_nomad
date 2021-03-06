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
    cookieParser = require('cookie-parser'),
    config = require('./config'),
    path = require('path');
// ===========================================================================================
// socket.io angular variables
// ===========================================================================================
// var users = [];
    // ====================================================================================================
    // WATCH/LISTEN FUNCTION
    // ====================================================================================================
    var server = app.listen(3000)
    io = require('socket.io').listen(server);
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
        resave: true,
        cookie : { httpOnly: true, maxAge: 2419200000 }
    }))
    /**
     * Local Auth
     */
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('LocalStrategy username argument',username);
    console.log('LocalStrategy password argument',password);
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
  console.log('THIS IS THE USER FROM SERIALIZEUSER',user);
    done(null, user);
})

passport.deserializeUser(function(id, done) {
  console.log('this is the id',id);
    db.getUserById([id.id], function(err, user) {
        user = user[0];
        console.log('This is the User deserializeUser',user);
        if (err) {
          console.log(err);
          return done(err);
        }
        else {
        console.log('RETRIEVED USER');
        console.log(user);
        done(null, user);
      }
    })
})
// =============================================
// auth middleware
// ==========================================
function isAuthenticated(req,res,next) {
  if(req.user){
    return next();
  }
  else {
    res.status(401).send('please sign in to continue')
  }
}
// ==============================================================================================================================
// sockets.io
// ==============================================================================================================================

io.sockets.on('connection', function(socket){

  socket.on('send message',function(data) {
    io.sockets.emit('new message', data);
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
    res.status(200).send({redirect:'home'})
})

app.get('/auth/me', function(req, res) {
  console.log('this is the req.user from auth/me',req.user);
  if (!req.user) return res.sendStatus(404);
  else {
    db.getUserById(req.user.id, (err,user)=> {
      const userObj = user [0]
      req.user.first_name = userObj.first_name;
      req.user.last_name = userObj.last_name;
      for (var k in userObj){
        console.log('this is the k',k)
        console.log('this is the value',userObj[k]);
        req.user[k] = userObj[k]
      }
      console.log('!!!!!!!!!!!!!!! this is the user req.user after for loop', req.user);
      console.log('this is the req.user from /auth/me',req.user);
      res.status(200).send(req.user);
    })
  }

})

app.get('/logout',Ctrl.logSession, function(req, res) {
  console.log('LOGGING OUT NOW');
  // =========
  req.logOut();
 req.session.destroy(function (err) {
        // res.redirect('/'); //Inside a callback… bulletproof!
        res.send({redirect:'home'}); //Inside a callback… bulletproof!
    });
  // =========
  // req.logout();
  // console.log(req.user);
  // res.send({redirect:'home'});
  // res.redirect('/#/');
})

app.get('/rooms/search/:keyword', Ctrl.findLocationByKeyword)

app.get('/rooms/listings', Ctrl.getListingsForHome)

app.get('/rooms/img/:room_id', Ctrl.getRoomListingMainPic)

app.get('/rooms/desc/:room_id', Ctrl.getRoomListingMainDesc)

app.get('/rooms/about/:room_id', Ctrl.getRoomListingMainAccessories)

app.get('/rooms/carousel/:room_id', Ctrl.getRoomListMainCarousel)

app.get('/rooms/profile-pic/:room_id', Ctrl.getRoomListingProfilePic)

app.get('/rooms/nightly_price/:room_id', Ctrl.getRoomListingNightlyPrice)

app.post('/rooms/reservations',isAuthenticated, Ctrl.reserveDate)

app.get('/rooms/locations/:room_id', Ctrl.getRoomListingCoordinates)

app.post('/rooms/reviews',isAuthenticated, Ctrl.addReview)

app.get('/rooms/reviews/:room_id', Ctrl.getReviews)

app.get('/users/profile-pic/:user_id', Ctrl.getUsersProfilePic)

app.get('/users/desc-header/:user_id', Ctrl.getHostDesc)

app.get('/users/listings/:user_id', Ctrl.getHostListings)

app.get('/conversations/profile-pic/:user_id', Ctrl.getConversationProfilePic)

app.get('/conversations/username/:user_id', Ctrl.getConversationUsername)

app.get('/rooms/listings/current_location/:room_id', Ctrl.getRoomThisLocationInfo)

app.get('/rooms/listings/nearby/:room_id/:city_name', Ctrl.getRoomsNearby)

app.get('/search', Ctrl.getSearchListings)

app.post('/search/filter_listings', Ctrl.filterSearchListings)

app.get('/users/:user_id', Ctrl.getUserById)

app.post('/conversations/insert_message', isAuthenticated, Ctrl.insertMessage)

app.get('/conversations/messages/:host_id', isAuthenticated, Ctrl.getConversation)

app.post('/users/profile/edit', isAuthenticated, Ctrl.saveChanges)

app.get('/user_rooms/user_listings', isAuthenticated, Ctrl.getListingsForView)

app.post('/users/edit', Ctrl.addUser)

app.get('/user_rooms/bookings/:id',isAuthenticated, Ctrl.getUserBookingsById)

app.get('/user_rooms/reservations/rooms', isAuthenticated, Ctrl.getRoomInfoByIdForReservations)

app.delete('/user_rooms/cancel/:booking_id', Ctrl.cancelBooking)

app.delete('/account_settings/delete/:id', Ctrl.deleteAccount)

app.get('/user_rooms/user_trips/:user_id', isAuthenticated, Ctrl.getBookingsFromDBforTrips)

app.delete('/user_rooms/user_trips/:res_id', isAuthenticated, Ctrl.deleteTripFromDB)
