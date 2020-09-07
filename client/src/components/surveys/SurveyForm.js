//Shows a form to the user to add input
import _ from 'lodash';
import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import {Link } from 'react-router-dom';
import validateEmails from  './../../utils/validateEmails';
import  formFields from './formFields';

class SurveyForm extends Component{

    renderFields(){
        return _.map(formFields, ({label, name})=>{
            return <Field component={SurveyField} type="text" labelToShow={label} name={name} key={name} />
        });
    }

    render() {
        return (
            <div>
                SurveyForm!
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit) /*passing the callback prop to reduxForm */}> 
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

    // if(!values.title){
    //     errors.title = "You must provide a title";
    // }
    _.map(formFields, ({name})=>{
        if(!values[name]){
            errors[name]="You must provide a "+name;
        } 
    })
        
    errors.recipients = validateEmails(values.recipients || '');
    return errors;
    
}
export default reduxForm({
    validate:validateFunction,
    form:'surveyForm', /* Check surveyFormReview file to see how we utilize "form" object which is added to redux state. */
    destroyOnUnmount:false
})(SurveyForm); //reduxForm is adding some additional props to pass to SurveyForm, one of that props is handleSubmit which is called above on form submission

/*destroyOnUnmount means that when the form component is not active, retain the values of form still in state
When next time form componnet loads, it will be filled with same values as last time
*/