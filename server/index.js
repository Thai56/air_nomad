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
  connectionString:'postgres://localhost/air-nomad'
})
app.set('db',massiveInstance );

const db = app.get('db');

app.use(session({
  secret:config.secret_Key,
  saveUninitialized: false,
  resave:true
}))
/**
 * Local Auth
 */
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true
  },
  function(email, password, done) {
    db.users.findOne({email: email}, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    })
  }
))

passport.serializeUser(function(user, done) {
  return done(null, user);
})

passport.deserializeUser(function(user, done) {
  return done(null, user);
})
app.get('/test', function(req,res){
  console.log(req.user);
})
app.post('/auth/local', passport.authenticate('local'), function(req, res) {
  console.log('req.user',req.user);
  res.status(200).send('you made it')
});
// ====================================================================================================
// MIDDLEWARE
// ====================================================================================================
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + '/../public'))
// app.use('/dist',express.static(__dirname + '/../dist'))
app.use('/lib',express.static(__dirname + '/../node_modules'))

// ====================================================================================================
// ENDPOINTS
// ====================================================================================================
app.post('/users/edit', function(req,res,next) {
  console.log(req.body);
  console.log('req.body',req.body);
  const regObj = req.body
  db.registerUser([regObj.email,regObj.firstname,regObj.lastname,regObj.password],function(err,user){
    if(!err){
      console.log(user)
      res.status(200).send('you have been added!')
    }
    else {
      res.status(422).send(err)
    }
  })
})
app.post('/users/auth/local',passport.authenticate('local'),function(req,res,next){
  console.log(req.body);
  res.status(200).redirect('/#/')
})

// ====================================================================================================
// WATCH/LISTEN FUNCTION
// ====================================================================================================
app.listen(port, () => console.log('You are now listening on port',port))
