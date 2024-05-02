import calculateRemainingTime from "@/utils/calculateRemainingTime";
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ endTime }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  calculateRemainingTime(endTime);

  return (
    <div>
      <div className="flex gap-1">
        <p className="w-auto h-auto bg-violet-700 text-slate-50">
          {remainingTime.days} D
        </p>
        <p>{remainingTime.hours} H</p>
        <p>{remainingTime.minutes} M</p>
        <p>{remainingTime.seconds} S</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
