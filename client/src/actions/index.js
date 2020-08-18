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
import axios from 'axios'
import {FETCH_USER} from './types'

export const fetch_user = () =>{
    return function(dispatch){
        axios
        .get('/api/current_user')
        .then(res=>dispatch({type: FETCH_USER , payload:res}))
    }
    
    /*AXIOS library is for AJAX request to server. 
    Check file server/routes/authRoutes.js which is connected via middleware setupProxy.js .
    Any call to /api is transferred to backend server which will return user object if already logged in .
    */
};

