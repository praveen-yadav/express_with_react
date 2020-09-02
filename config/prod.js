//Make sure to commit this
module.exports = {
    dbURL : process.env.DB_URL,    
    googleClientID : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
    cookieKeyToEncrpyt : process.env.COOKIE_KEY_TO_ENCRPYT,
    stripePublishableKey : process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey : process.env.STRIPE_SECRET_KEY,
};


/*
Prod:
Prod clientID: 374448996744-099du20uvn62e38iop0od5s3fe5ph2gi.apps.googleusercontent.com
Prod clientsecret: u13nrYkFSvUZNS8FjqN9C8aN

MongoDB Production cluster: https://cloud.mongodb.com/v2/5f1572ac29c7ba11f7120b04#clusters 
mongodb+srv://pravyada:nrjZyUGXQSRYPE9N@cluster0.lgyfb.mongodb.net/DatabaseForReactNode?retryWrites=true&w=majority
*/