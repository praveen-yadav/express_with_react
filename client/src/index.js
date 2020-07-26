/* In server code, we use NodeJS which doesnt have ES15 support, hence we use "require" statement at top
    But in Client code, we have "import" which comes with Babel ES15 support
*/
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/App'
import {createStore, applyMiddleware} from 'redux'

import reducers from './reducers'

const store = createStore(
    reducers, 
    {},
    applyMiddleware()
    );
    /*type () => [],combinedReducer = authReducer(decide whether user is logged in )+surveysReducer(Records a list of all surveys user has created) */

ReactDOM.render(
    <Provider store ={store}>
        <App />
    </Provider>, /* Provider is the top component which watches for the state change in store, it then rerenders App component which in turn 
        cause all children component to be rerendered    */
    document.querySelector('#root')
);