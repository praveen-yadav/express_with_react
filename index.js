const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session'); //To access/modify the cookie 
const passport = require('passport');
const keys = require('./config/keys')
require('./models/user')
require('./models/product')
require('./services/passport')

mongoose.connect(keys.dbURL)

const app = express();
/* app.use is to set middleware. we have put 3 middleware below. 
    Middleware are small function which modify the request, before it is being given to route handler.
    All 3 middleware are connected serially. request object is passsed from one function to another
*/
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000, //30 days
        keys:[keys.cookieKeyToEncrpyt] //Array of random keys. it pick any key in random from array to encrpt the cookie
    })
)

/* Below 2 lines tell, telling passport to use cookies for authentication 
Browser request comes in -> cookieSession extracts the cookie data by decrypting, and pass to the passport object. 
passport object call the deserializeUser to retreive the actual user instance in DB. 
User model instance added to req object as 'req.user'   
*/
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000 //process.env.PORT will be set automatically by Heroku server
app.listen(PORT);