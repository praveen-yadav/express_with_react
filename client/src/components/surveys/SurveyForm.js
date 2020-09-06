//Shows a form to the user to add input
import _ from 'lodash';
import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import {Link } from 'react-router-dom';

const FIELDS = [
    {label: "Survey Title", name:"title" },
    {label: "Subject Line", name: "subject"},
    {label: "Email body", name: "body"},
    {label: "Recipient List", name: "recipientList"},
]
class SurveyForm extends Component{

    renderFields(){
        return _.map(FIELDS, ({label, name})=>{
            return <Field component={SurveyField} type="text" labelToShow={label} name={name} key={name} />
        });
    }

    render() {
        return (
            <div>
                SurveyForm!
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}> 
                    {this.renderFields()}                    
                    <Link to="/surveys" className="red btn-flat left white-text">
                        Cancel
                    </Link>

                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }

} 

function validateFunction(values)
{
    /* values object is a structure with key=field name and value and we need to return an object */
    /*if redux form get the error object as empty, that means no probelm were found*/
    const errors={}
    if(!values.title){
        errors.title = "You must provide a title";
    }
    if(!values.subject){
        errors.subject = "you must provide a subject";
    }
    if(!values.body){
        errors.body = "you must provide a body";
    }    
    
    return errors;
    
}
export default reduxForm({
    validate:validateFunction,
    form:'surveyForm'
})(SurveyForm); //reduxForm is adding some additional props to pass to SurveyForm, one of that props is handleSubmit which is called above on form submission