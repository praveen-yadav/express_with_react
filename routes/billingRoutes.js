const keys = require('./../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey); /*https://stripe.com/docs/api/charges/create?lang=node*/
const requireLogin = require('../middlewares/requireLogin');

/*Parse incoming request bodies in a middleware before your handler, available under req.body property  */
module.exports = app => {
    /*express will automatically call the middleware function requireLogin before handling request 
        Actually, express can take n number of variable arguements(each one is middleware) like requireLogin, but only condition is
        that atleast one middleware should be able to send the response back.
    */
    app.post('/api/stripe',requireLogin,async (req,res)=>{ 
        const charge = await stripe.charges.create({
            amount: 500, /* On front-end, we send AJAX request that max upto 5$ deduction, but now we specifiy exact amount to be deducted */
            currency: 'inr',
            description: '$5 for 5 credits',
            source: req.body.id            
        });
        
        //console.log(charge);
        /*Passport middleware always add user property to req object.        
        Passport looks at the cookie, if there is user id , attache the user model
        */
        req.user.credits+=5; 
        const updatedUserModel = await req.user.save();
        res.send(updatedUserModel);
    });
};