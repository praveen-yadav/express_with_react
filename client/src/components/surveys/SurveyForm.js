//Shows a form to the user to add input
import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

class SurveyForm extends Component{

    renderFields(){
        return (
            <div>
                <Field labelToShow="Survey Title" type="text" name="title" component={SurveyField} />                
                <Field labelToShow="Subject Line" type="text" name="subject" component={SurveyField} />                
                <Field labelToShow="Email body" type="text" name="body" component={SurveyField} />                
                <Field labelToShow="Recipient List" type="text" name="recipientList" component={SurveyField} />                
            </div>
        );
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