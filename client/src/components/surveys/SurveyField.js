//contains logic to render a single lable and its associated text

//Shows a form to the user to add input
import React, {Component} from 'react';
//import { reduxForm, Field } from 'redux-form';

class SurveyField extends Component{
    render() {

        /*
        console.log(this.props); 
        if we print out the props , inside input key, we have different properties available with us
        input:
            name: "title"
            onBlur: ƒ (event)
            onChange: ƒ (event)
            onDragStart: ƒ (event)
            onDrop: ƒ (event)
            onFocus: ƒ (event)
            value: ""
        type:"text"
        meta: 
        */
        return (
            <div>
                <label>{this.props.labelToShow}</label>
                <input {...this.props.input} />
            </div>
        )
    }

} 

export default SurveyField;

/* To the input component we want to pass the object this.props.input
<input {...this.props.input} /> is equivalent to <input onBlur={this.props.input.onBlue} onChange={this.props.input.onChange} etc />
*/