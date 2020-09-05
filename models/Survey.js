const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const SurveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: {type:Number , default:0},
    no:  {type:Number, default:0},
    _user: {type:Schema.Types.ObjectId, ref:'users'},
    dateSent: Date,
    lastResponded: Date /*To check if survey is still active*/
});

mongoose.model('surveys',SurveySchema);

/*
chapter127: There were two ways for schema:
1. Each user has subcolection of multiple surveys object, and each surveys has multiple collection of recipents
2. Survey has subcollection of recepient but User entity is not coupled, just a foriegn key from survey is in user collection
We are going with 2nd approach becaues:
Mongo size limit of single record: 4MB
Email average bytes: 20
Number of emails can be stored: 200,000 <-limitation

*/