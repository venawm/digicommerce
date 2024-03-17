"use client";
import React, { useState } from "react";
import StepOne from "@/components/cart/StepOne";
import StepTwo from "@/components/cart/StepTwo";
import StepThree from "@/components/cart/StepThree";
import { BiCheckCircle } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

const Page = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Animated checkmark component (reusable)
  const AnimatedCheckmark = ({ stepNumber, isActive }) => {
    return (
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <BiCheckCircle
          className={
            isActive ? "text-green-500 text-2xl" : "text-gray-500 text-xl"
          }
        />
        <p className={isActive ? "text-lg font-semibold" : "text-lg"}>
          {stepNumber}
        </p>
      </motion.div>
    );
  };

  return (
    <div className="">
      <div className="flex justify-evenly">
        <AnimatePresence>
          <AnimatedCheckmark
            stepNumber="Review Cart"
            key="step1"
            isActive={step === 1}
          />
          <AnimatedCheckmark
            stepNumber="Contact Details"
            key="step2"
            isActive={step === 2}
          />
          <AnimatedCheckmark
            stepNumber="Payment"
            key="step3"
            isActive={step === 3}
          />
        </AnimatePresence>
      </div>
      {step === 1 && <StepOne onNextStep={nextStep} />}
      {step === 2 && <StepTwo onNextStep={nextStep} onPrevStep={prevStep} />}
      {step === 3 && <StepThree onPrevStep={prevStep} />}
    </div>
  );
};

export default Page;
