const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session'); //To access/modify the cookie 
const passport = require('passport');
const keys = require('./config/keys')
require('./models/user')
require('./models/product')
require('./services/passport')

mongoose.connect(keys.dbURLLocal)

const app = express();
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000, //30 days
        keys:[keys.cookieKeyToEncrpyt] //Array of random keys. it pick any key in random from array to encrpt the cookie
    })
)

/* Below 2 lines tell, telling passport to use cookies for authentication 
Browser request comes in -> cookieSession extracts the cookie data by decrypting, and pass to the passport object. 
passport object call the deserializeUser to retreive the actual user instance in DB. 
*/
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

/*
    Google Oauth:https://console.cloud.google.com/home/dashboard?project=cool-discipline-280617
    Heroku app hosted here: https://powerful-caverns-04805.herokuapp.com/
    MongDb cluster here: https://cloud.mongodb.com/v2/5f095dbcb77bc27db34f8d2a#clusters/detail/GoogleCloudCluster2020July 
    Local mongod: open terminal->type mongod->copy the port 127.0.0.1:27017

*/

const PORT = process.env.PORT || 5000
app.listen(PORT);