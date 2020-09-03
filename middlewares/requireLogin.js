module.exports = (req,res,next)=> {
    /*Passport middleware always add user property to req object.        
    Passport looks at the cookie, if there is user id , attache the user model
    */    
    if(!req.user){
        return res.status(401).send({error: "user must log in"}); /*HTTP401: forbidden to access the resource*/
    }    
    next();
}