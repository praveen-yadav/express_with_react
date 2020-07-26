/* We created another index.js file in reducers folder beacuse by JS convention 
now we can directly import the "reducers" directly, instead of importing each file
*/
import {combineReducers} from 'redux'
import authReducer from  './authReducer'

export default combineReducers({
    auth:authReducer,
});
