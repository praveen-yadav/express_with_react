/*
  Are we in Dev or Prod:
  If prod: use env variables <- commit this 
  If Dev: config/dev.js <- dont commit this
*/

if( process.env.NODE_ENV == 'production')
{
    module.exports = require('./prod')
}else{
    module.exports = require('./dev')
}
