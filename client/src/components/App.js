import React, {Component} from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import { connect } from 'react-redux'; /* Redux can exist without react. Hence we need this library to get more functionality */
import * as actions from '../actions'; /*import all different action creaters */

import Header from './Header'
import Landing from './Landing'

/*
index.js is data driven layer
app.js is rendering related layer

App will have 4 child component:
Header, Lading, Dashboard(->SurveyList->SurveyListItem), SurveyNew(->SurveyField)
*/

/*Demo Components*/

const DashBoard = () =><h2>DashBoard</h2>;
const SurveyNew = () =><h2>SurveyNew</h2>;

class App extends Component{
    /*We are using DidMount instead of WillMount because DidMount is called every time, global state of app is changed. It is called after component
    is rendered. WillMound is called before rendering. Ideal place for AJAX request*/
    componentDidMount(){
        this.props.fetch_user();
    }

    render(){
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
}

//export default App; 
export default connect(null, actions)(App);