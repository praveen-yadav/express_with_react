const passport = require('passport')

module.exports = app => {
    app.get('/',(request, response)=>{
        response.send({hi : 'there'});
    })    

    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/surveys');
    }
    );

    app.get('/api/logout',(req,res) =>{
        req.logout(); //req.logout is a function that is attach automattically to req by passport. kills the cookie
        //res.send(req.user); //empty object send back to test taht we are log out now
        res.redirect('/');
    })

    app.get('/api/current_user',(req, res)=>{
        //http://localhost:5000/api/current_user to test the cookie
        // passport attaches req.user property as well as req.logout property
        //res.send(req.user);
        res.send(req.user)
        /* res.send(req.session) 
        output: {"passport":{"user":"5f149c11f6d71478e4c21af7"}}

        DB object for example:
        {
            _id : 5f149c11f6d71478e4c21af7
            googleId:"107397729791432288402"
            name:"praveen yadav"
            email:"sudomailpraveen@gmail.com"
        }
        */
    })
}
