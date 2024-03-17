import React from "react";

const StepOne = ({ onNextStep }) => {
  return (
    <div>
      <div>
        <button onClick={onNextStep}>Next</button>
      </div>
    </div>
  );
};

export default StepOne;
