/* Creating Schema for user */
const mongoose  = require('mongoose')
const {Schema} = mongoose; //which is same as const schema = mongoose.Schema; Its called destructuring
/*Schema is class name from mongoose*/
/*Mongoose wants to know about the schema upfront. Hence it removes the MongoDB property of schemaless collection*/

const productSchema = new Schema({
    name: String,
    value: Number
});

mongoose.model('product',productSchema);
/* Function take 2 param. Param1 is the modelName, param2 is Schema obeject 
    Mongoose on bootup, check if model exists and matching. It will create if missing. 
    It wont delete anything
*/