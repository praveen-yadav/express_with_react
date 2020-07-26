# express_with_react

Getting my hands dirty with ES6 based fullstack project.
Technologies used:
1. Oauth with passport(only Google strategy for now)
2. Connecting to Atlas hosted MongoDB collections as well as local collection
3. NodeJS+Express with cookie-session to track the user
4. React and Redux in front-end to maintain user session and for GUI

Few Shortcut links:
Google Oauth:https://console.cloud.google.com/home/dashboard?project=cool-discipline-280617
MongDb cluster here: https://cloud.mongodb.com/v2/5f095dbcb77bc27db34f8d2a#clusters/detail/GoogleCloudCluster2020July 
Local mongod: open terminal->type mongod->copy the port 127.0.0.1:27017
Heroku app hosted here: https://powerful-caverns-04805.herokuapp.com/

Git commands:
git pull origin master
git add .
git status
git commit -m "<msg>"
git push origin master
git remote -V

Heroku commands:
https://dashboard.heroku.com/
open git bash and type
    cli>heroku login
    It will open web-browser and logged-in.

    cli>heroku open 
    will open the project in browser

Deploy the code to Production server:
    cli>cd "C:\Users\PRAVYADA\OneDrive - Qualcomm\Desktop\ReactPractice\express_with_react"
    cli>git push heroku master

Date:20thJuly'20
Changes: 
1. Install react app called client using "npx create-react-app client"
2. Because react will run its own server, so we need to start two server every time we make a fix. Hence modified the script to to use 
    npm module concurrenly which will start both server
