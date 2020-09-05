const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session'); //To access/modify the cookie 
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/user');
require('./models/product');
require('./models/Survey');
require('./services/passport')
require('https').globalAgent.options.rejectUnauthorized = false;
mongoose.connect(keys.dbURL,{useNewUrlParser: true, useUnifiedTopology: true })

const app = express();
/* app.use is to set middleware. we have put 4 middleware below. 
    Middleware are small function which modify the request, before it is being given to route handler.
    All 4 middleware are connected serially. request object is passsed from one function to another
*/

/* it will parse the body of GET/POST/PUT.., and put the content under property "req.body" */
app.use(bodyParser.json());

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
/*5th middleware is requireLogin which will be called only on selected APIs, for example in billingRoutes */

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === "production")
{
    /*
    Inside client directory , if we run the command "npm run build", which is a script provided by create-react-app, it generates /client/build,
     inside this we have static/js/, static/css, index.html.
    In the production build, express server has to handle all the routes, so it first send index.html if no routes are matching.
    Then browser again ask for embeded .js and .css. Express send JS and CSS now.
    Now browser has got the React component, so it know how to handle the react routes. It will serve the browser, any component it requires.
    */


    //Express will serve up production assests
    //like our main.js file, or main.css file
    app.use(express.static('client/build'));

    //Express will serve up index.html if it doesnt recognize the path
    const path = require('path');
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    });
}


const PORT = process.env.PORT || 5000 //process.env.PORT will be set automatically by Heroku server
app.listen(PORT);