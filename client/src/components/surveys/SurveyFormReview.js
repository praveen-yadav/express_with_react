import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from './../../actions';

/*Function component is used only to display some data*/
const SurveyFormReview = ({onCancel , formValues, submitSurvey}) =>{
    
    const reviewFields = _.map(formFields, ({name, label})=>{
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    });
    
    return (
        <div>
            <h5>Please confirm your entry</h5>
            
            {reviewFields}

            <button 
              className="yellow darken-3 white-text btn-flat"
              onClick={onCancel}
              >
                  Back
              </button>

            <button className='green btn-flat left ' onClick={()=>submitSurvey(formValues)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state){
    /* if we print the incoming (redux)state here, we have auth and form object. inside form we have SurveyForm only.
        Inside surveyform, values object has all the form data
    */
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps, actions)(SurveyFormReview);