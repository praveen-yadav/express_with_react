
export default function(state={}/*default value of state var */, action){
    console.log(action)
    switch(action.type){
        default:
            return state;
    }
}