//SurveyNew shows survey form and survey form review 
import React, {Component} from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import {reduxForm } from 'redux-form';

class SurveyNew extends Component{

    state = {showFormReview : false};

    renderContent(){
        if(this.state.showFormReview){
            return <SurveyFormReview onCancel={()=>this.setState({showFormReview: false})}/>
        }
        return <SurveyForm onSurveySubmit = {()=>this.setState({showFormReview: true})} />
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }

}

/* This is the parent component which shows one of two child component. if we switch between the child components, 
we will retain the form value, because in surveyForm.js we made destroyOnUnmount=false.

Here, if we dismount this parent component, we want the value to be destroyed, which is default behaviour.
*/
export default reduxForm(
    {
        form: 'surveyForm'
    }
)(SurveyNew);