const mongoose = require('mongoose');
/*To parse webhook data*/
const _ = require('lodash');
const { Path } = require('path-parser');
/*Node has url integerated*/
const {URL} = require('url'); 
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
    app.get('/api/surveys/', requireLogin,requireCredits, async(req,res)=>{
        const surveys = await Survey.find({_user: req.user.id}).select({
            recipients: false
        });
        res.send(surveys);
        
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    /*     
    Run "npx ngrok http 5000" , copy the address, paste it in 
    https://app.sendgrid.com/settings/mail_settings
    add /api/surveys/webhook

    o/p:
    {
[0]   {
[0]     email: 'mailmeonlypraveen@gmail.com',
[0]     event: 'click',
[0]     ip: '183.83.142.35',
[0]     sg_event_id: 'bDbgpetXSlW7NdpWzvc8tQ',
[0]     sg_message_id: 'l1zI4ZAAQf6itgHcGFI9KA.filterdrecv-p3las1-b89975484-zt95q-20-5F5704A7-39.0',
[0]     timestamp: 1599538365,
[0]     url: 'http://localhost:3000/api/surveys/5f5704a75237ce46a06a0163/yes',
[0]     url_offset: { index: 0, type: 'html' },
[0]     useragent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36'
[0]   }
    */
    app.post('/api/surveys/webhook',(req,res)=>{
        console.log("webhook handle");
     
         /*it will extract the value in variable name surveyId and choice*/
        const p = new Path('/api/surveys/:surveyId/:choice');

        /*In lodash, we can chain multiple operation, to avoid using redundant variable
        O/P of one operation is automatically passed to another function in chain*/
        _.chain(req.body)
            .map(({email, url})=>{
                /*
                map is intended to be a functional mapping method: 
                its function argument should return a value, 
                but is not expected to have any side-effects.*/

                /*if maliciously post junk data, destructuring will fail, for example no url key in the post object*/
                if(!url) return {};
                
                /*extract the path from url*/                       
                const match = p.test(new URL(url).pathname);            
                
                if(match){
                    /* 
                    I/P->match obj :{surveyId:xyz, choice:'yes'} 
                    O/P->return object->{email:email, surveyId:xyz, choice:'yes'/'no'}
                    */
                    return {email, surveyId:match.surveyId, choice:match.choice};
                }               
            })
            .compact(/*The _.compact() function is used to creates an array with all falsey values removed in JavaScript. */)
            .uniqBy('email', 'surveyId')
            /*Creates a duplicate-free version of an array, using SameValueZero for equality comparisons,
             in which only the first occurrence of each element is kept. 
             The order of result values is determined by the order they occur in the array.*/
            .each(({surveyId, email, choice})=>{
                /*each is just a functional replacement for an imperative for loop: 
                its purpose is to have an effect, and it is not expected to return any value.*/

                /*****RUN MONGO QUERY */
                Survey.updateOne(
                    {
                        /*Seach for document with this id, and matching subdocument with this email and !responded*/
                        _id: surveyId,
                        /*recipients is an array of object. seach for one item in array with given email and responded as false */
                        recipients:{
                            $elemMatch: {email: email, responded:false}
                        }
                    },
                    {
                        $inc: { [choice]:1}, /*increment the recipients[elemMatch]['yes']+=1*/
                        $set: {'recipients.$.responded':true}, /*$->refers to eleMatch index in recipients array of object*/
                        lastResponded: new Date()
                    }
                ).exec();

            })
            .value(); /*.value return the final array from chain function */

        res.send({});
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            await survey.save();
            req.user.credits-=1;
            const updatedUser = await req.user.save();
            res.send(updatedUser);
            
        }catch(exception){
            res.status(422).send(exception);    
        }

    });
};
