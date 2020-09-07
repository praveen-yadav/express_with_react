import axios from 'axios'
/*AXIOS library is for AJAX request to server. 
Check file server/routes/authRoutes.js which is connected via middleware setupProxy.js .
Any call to /api is transferred to backend server which will return user object if already logged in .
*/

/*
React Component
    calls a 
Action creater
    Return a 
Action
    Sent to Dispatch function(implemented by ReduxThunk library)
Reducers
    Update state in 
Store
    State sent back to components , causing them to re-render
*/

import {FETCH_USER} from './types'

/*fetch_user is a function that returns a function which takes dispatch as arg. It then request NodeServer with AJAX. when result come back, it dispatches action to redux*/
export const fetch_user = () => async dispatch => {
        const res = await axios.get('/api/current_user');
        dispatch({type: FETCH_USER , payload:res.data});
    };
/*
console.log(res) => 
    type: "fetch_user", 
    payload: {
        config: {url: "/api/current_user", method: "get", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), …}
        data:
            passport: {user: "5f1585a26afab9434c0cf631"}
            __proto__: Object
        headers: {connection: "close", content-length: "48", content-type: "application/json; charset=utf-8", date: "Tue, 18 Aug 2020 17:29:17 GMT", etag: "W/"30-eTGRB/raxhdy5ExJXJnYcrpR4sw"", …}
        request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
        status: 200
        statusText: "OK"
        __proto__: Object
        type: "fetch_user"
        __proto__: Object
    }
*/

/* Send the token from front end to backend. Backend process the payment, and send back user model with updated new credits field . 
    Then we update the user model in the redux store, update the frontend "CUrrent credits" button
*/
export const handleToken = (token) => async (dispatch)=>{
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload:res.data});
};


export const submitSurvey = (values) =>async(dispatch)=>{
    const res = await axios.post('/api/surveys', values);

    /*note above api return updated user object, so we update all the components with below. for ex: updated credits*/
    dispatch({type:FETCH_USER , payload:res.data});
};