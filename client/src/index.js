/* Webpack automatically knows this is in node_modules folder. installed this external CSS file.  we dont need to import to a variable 
    Webpack can work with css extension also
*/
import 'materialize-css/dist/css/materialize.min.css'
/* In server code, we use NodeJS which doesnt have ES15 support, hence we use "require" statement at top
    But in Client code, we have "import" which comes with Babel ES15 support
*/
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/App'
import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'
import axios from 'axios';
const store = createStore(
    reducers, 
    {},
    applyMiddleware(reduxThunk)
    );
    /*type () => [],combinedReducer = authReducer(decide whether user is logged in )+surveysReducer(Records a list of all surveys user has created) */

ReactDOM.render(
    <Provider store ={store}>
        <App />
    </Provider>, /* Provider is the top component which watches for the state change in store, it then rerenders App component which in turn 
        cause all children component to be rerendered    */
    document.querySelector('#root')
);


window.axios = axios;