/* We created another index.js file in reducers folder beacuse by JS convention 
now we can directly import the "reducers" directly, instead of importing each file
*/
import {combineReducers} from 'redux'
import authReducer from  './authReducer'
import { reducer as reduxForm} from 'redux-form'; /*Rename to reduxForm to not cause confusion*/

export default combineReducers({
    auth:authReducer, /*key is auth; we access like state.auth.variable*/
    form: reduxForm, /*all the form data will be access from store as state.form.*/
});
