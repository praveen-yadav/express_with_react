const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose')
const User = mongoose.model('users')
const product = mongoose.model('product')

passport.serializeUser((user, done)=>{
  done(null,user.id);
  /*
    call the done function which is a parameter . 
    remember "user" is a mongoose document. mongoose provide unique id to each document inserted in any collection. _id is added by default. 
    we can directly get this unique id by calling user.id
    {
    _id: 5f149007ad8b7384741c5f41
    googleId : 107625030125200728376
    }

    we used user.id instead of user.googleId because we can use multiple strategise like facebook also, hence _id is unque for all the strategies
  */
});

passport.deserializeUser((id, done)=>{
  User.findById(id).then(user => done(null, user))
  /* 1.  Search the mongoose model "User", with key and returned the user object
    2. then() is a promise. all the DB related functions are async
  */
});

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        
        // new product({name:"Wallet", value:1}).save();
        const existinguser = await User.findOne({googleId: profile.id })
      
        if(exisitinguser){
          return done(null, exisitinguser);
        }
        // Save the new model instance, passing a callback
        const user = await new User({ googleId: profile.id, name:profile.displayName, email:profile.emails[0].value }).save()
        return done(null,user);
      }
    )
  );

  exports.passportObj = passport;
  
/*
accessToken : KQxWJk3ZJHTAkHraZL9NfJs8wU
refreshToken: undefined
profile {
  id: '107625030125200728376',
  displayName: 'praveen yadav',
  name: { familyName: 'yadav', givenName: 'praveen' },
  emails: [ { value: 'mailmeonlypraveen@gmail.com', verified: true } ],
  photos: [
    {
      value: 'https://lh3.googleusercontent.com/a-/AOh14Giol_jILDXPWnwnYx_BM5eplPMqacXl-z-ntYCDTg'
    }
  ],
  provider: 'google',
  _raw: '{\n' +
    '  "sub": "107625030125200728376",\n' +
    '  "name": "praveen yadav",\n' +
    '  "given_name": "praveen",\n' +
    '  "family_name": "yadav",\n' +
    '  "picture": "https://lh3.googleusercontent.com/a-/AOh14Giol_jILDXPWnwnYx_BM5eplPMqacXl-z-ntYCDTg",\n' +
    '  "email": "mailmeonlypraveen@gmail.com",\n' +
    '  "email_verified": true,\n' +
    '  "locale": "en"\n' +
    '}',
  _json: {
    sub: '107625030125200728376',
    name: 'praveen yadav',
    given_name: 'praveen',
    family_name: 'yadav',
    picture: 'https://lh3.googleusercontent.com/a-/AOh14Giol_jILDXPWnwnYx_BM5eplPMqacXl-z-ntYCDTg',
    email: 'mailmeonlypraveen@gmail.com',
    email_verified: true,
    locale: 'en'
  }
}*/