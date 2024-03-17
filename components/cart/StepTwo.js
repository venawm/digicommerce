import React from "react";

const StepTwo = ({ onNextStep, onPrevStep }) => {
  return (
    <div>
      <div>
        <button onClick={onNextStep}>Next</button>
        <button onClick={onPrevStep}>Previous</button>
      </div>
    </div>
  );
};

export default StepTwo;
