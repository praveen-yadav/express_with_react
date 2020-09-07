import React from 'react';

/*Function component is used only to display some data*/
const SurveyFormReview = ({onCancel}) =>{
    return (
        <div>
            <h5>Please confirm your entry</h5>
            <button 
              className="yellow darken-3 btn-flat"
              onClick={onCancel}
              >
                  Back
              </button>
        </div>
    );
}

export default SurveyFormReview;