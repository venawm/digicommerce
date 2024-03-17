import React from "react";

const StepThree = ({ onPrevStep }) => {
  return (
    <div>
      <div>
        <button onClick={onPrevStep}>Previous</button>
      </div>
    </div>
  );
};

export default StepThree;
