import React from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import Header from './Header'

/*
index.js is data driven layer
app.js is rendering related layer

App will have 4 child component:
Header, Lading, Dashboard(->SurveyList->SurveyListItem), SurveyNew(->SurveyField)
*/

/*Demo Components*/

const DashBoard = () =><h2>DashBoard</h2>;
const SurveyNew = () =><h2>SurveyNew</h2>;
const Landing = () =><h2>Landing</h2>;

const App = () =>{
    return (
    <div>
        <BrowserRouter> 
            <Header />
            <Route path="/" exact={true} component={Landing}></Route> 
            <Route path="/surveys" exact component={DashBoard} />
            <Route path="/surveys/new" component={SurveyNew} />
        </BrowserRouter>
    </div>
    /*  BrowserRouter Can have atmost 1 child 
        Header always visible
        Rest are component child
        writing just exact instead of exact={true} as per JSX convinence 
    */
    );
}

export default App; 