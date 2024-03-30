import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCart } from "@/context/cart";
import OrderSummary from "./OrderSummary";

const StepTwo = ({ onNextStep, onPrevStep }) => {
  const { data, status, update } = useSession();
  return (
    <div>
      <div className="flex flex-col gap-4 mt-10">
        <div className="flex gap-8">
          <div className="w-1/2  flex flex-col gap-1">
            <input
              type="email"
              className="border bg-violet-700 py-2 px-4 focus:outline-none text-slate-50 font-semibold focus:border-primary"
              placeholder="Email"
              value="Contact Details"
              disabled
            />
            <input
              type="email"
              className="border bg-violet-50 py-2 px-4 focus:outline-none focus:border-primary"
              placeholder="Email"
              value={data.user.name}
              disabled
            />
            <input
              type="email"
              className="border bg-violet-50 py-2 px-4 focus:outline-none focus:border-primary"
              placeholder="Email"
              value={data.user.email}
              disabled
            />
            <input
              type="email"
              className="border bg-violet-50 py-2 px-4 focus:outline-none focus:border-primary"
              placeholder="Email"
              value={data.user.email}
              disabled
            />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
        <div>
          <button
            className="w-48 h-10  bg-red-500 text-white font-semibold rounded-l-lg hover:bg-red-700"
            onClick={onPrevStep}
          >
            Previous
          </button>
          <button
            className="w-48 h-10  bg-violet-600 text-white font-semibold rounded-r-lg hover:bg-violet-800"
            onClick={onNextStep}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
