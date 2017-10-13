//<---- Requirements ----->
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');


const { secret } = require('./config').session;
const { dbUser, dbPass, database } = require('./config').db;
const { domain, clientID, clientSecret } = require('./config').auth0;

//<---- Define port ----->
const port = 3000;

//<---- DB connection info ----->
const connectionString = `postgres://${dbUser}:${dbPass}@localhost/${database}`;

//<---- App declaration ----->
const app = express();

//<---- Middlewares ----->
app.use(json());
app.use(cors());
app.use(express.static(`${__dirname}/../public`));

//<---- Invoke Massive----->
// massive(connectionString).then(db => app.set('db', db));

const massiveConnection = massive(connectionString)
.then(db => {
  app.set('db', db); // sets db on express
  console.log(`Connected with db at ${connectionString}`);
})
.catch(err => {
  console.log(err); // catches errors
});

//<---- Set up Express Sessions ----->
// secret: config.session.secret;
app.use(session({
    secret,
    resave: true,
    saveUninitialized: true
}));

//<---- Set up Passport ----->
app.use(passport.initialize());
app.use(passport.session());

//<---- Use Passport to access Auth0 ----->
passport.use(new Auth0Strategy({
  domain,
  clientID,
  clientSecret,
  callbackURL:  '/auth/callback'
 }, (accessToken, refreshToken, extraParams, profile, done) => {
   //Find user in database
   console.log(profile);
   const db = app.get('db');
   // .then means this is a promise
   db.getUserByAuthId([profile._json.sub]).then((user, err) => {
       console.log('INITIAL: ', user);
     if (!user[0]) { //if there isn't a user, we'll create one!
       console.log('CREATING USER');
       db.createUserByAuth([profile._json.sub]).then((user, err) => {
         console.log('USER CREATED', user[0]);
         return done(err, user[0]); // GOES TO SERIALIZE USER
       })
     } else { //when we find the user, return it
       console.log('FOUND USER', user[0]);
       return done(err, user[0]);
     }
   });
 }
));

 // put user on session
 passport.serializeUser((user, done) => {
     done(null, user);
 });

 // pull user from session for manipulation
 passport.deserializeUser((user, done) => {
     console.log(user);
     done(null, user);
 });


 //<----****** Controllers ******-----> // 
 const usersCt = require('./controllers/users'); 
 const walletsCt = require('./controllers/wallets');
 const coinsCt = require('./controllers/coins');
 const ratingsCt = require('./controllers/ratings');


//<----==== General Endpoints ===----->
app.get('/api/test', (req, res, next) => {
    app.get('db').wallets.find({}).then(response => {
      console.log("hello from test endpoint");
        res.json(response);
    });
});


//=====GET=====
app.get('/users', usersCt.getUsers);
app.get('/users/:authid', usersCt.getUserByAuthId);
app.get('/wallets', walletsCt.getWallets);
app.get('/wallets/:walletname', walletsCt.getWalletByName);
app.get('/coins', coinsCt.getCoins);
app.get('/coins/:coinname', coinsCt.getCoinByName);
app.get('/ratings', ratingsCt.getWalletRatings);

//=====PUT=====


//=====POST=====
app.post('/ratings',(req, res, next) => {
    console.log(req.body);
    next() } ,ratingsCt.postNewWalletRating);

//=====DELETE=====


//<----==== Auth0 Endpoints ===----->
// initial endpoint to fire off login
app.get('/auth', passport.authenticate('auth0'));

// redirect to home and use the resolve to catch the user
app.get('/auth/callback',
    passport.authenticate('auth0', { successRedirect: '/' }), (req, res) => {
        res.status(200).json(req.user);
});

// if not logged in, send error message and catch in resolve
// else send user
app.get('/auth/me', (req, res) => {
    if (!req.user) return res.status(401).json({err: 'User Not Authenticated'});
    res.status(200).json(req.user);
});

// remove user from session
app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//<----===== Listen =====----->
app.listen(port, ()=> {
    console.log(`Magic happened ;) on Port: ${port}`);
});