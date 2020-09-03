const keys = require('./../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey); /*https://stripe.com/docs/api/charges/create?lang=node*/

/*Parse incoming request bodies  in a middleware before your handler, available under req.body property  */
module.exports = app => {
    app.post('/api/stripe',async (req,res)=>{

        /*Passport middleware always add user property to req object.        
        Passport looks at the cookie, if there is user id , attache the user model
        */
        if(!req.user){
            return res.status(401).send({error: "user must log in"}); /*HTTP401: forbidden to access the resource*/
        }

        const charge = await stripe.charges.create({
            amount: 500, /* On front-end, we send AJAX request that max upto 5$ deduction, but now we specifiy exact amount to be deducted */
            currency: 'inr',
            description: '$5 for 5 credits',
            source: req.body.id            
        });
        
        //console.log(charge);
        req.user.credits+=5; 
        const updatedUserModel = await req.user.save();
        res.send(updatedUserModel);
    });
};