import {FETCH_USER} from '../actions/types'
export default function(state = null/*default value of state var */, action){
    console.log(action)
    switch(action.type){
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}