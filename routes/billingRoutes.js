const keys = require('./../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

/*Parse incoming request bodies  in a middleware before your handler, available under req.body property  */
module.exports = app => {
    app.post('/api/stripe',(req,res)=>{
        console.log(req.body);
        stripe.charges.create({
            amount: 500, /* On front-end, we send AJAX request that max upto 5$ deduction, but now we specifiy exact amount to be deducted */
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
    });
};