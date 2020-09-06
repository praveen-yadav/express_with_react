//Shows a form to the user to add input
import _ from 'lodash';
import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

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
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

} 

export default reduxForm({
    form:'surveyForm'
})(SurveyForm); //reduxForm is adding some additional props to pass to SurveyForm, one of that props is handleSubmit which is called above on form submission