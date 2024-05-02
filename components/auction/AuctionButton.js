import React, { useState } from "react";
import toast from "react-hot-toast";
import { RiAuctionFill } from "react-icons/ri";

const AuctionButton = ({ product }) => {
  const placeBid = async () => {};

  const handleIncrement = () => {
    setBid((prev) => prev + 1000);
  };

  const handleDecrement = () => {
    if (bid === product.price) {
      toast.error(
        "Attempting to reduce the price below the highest bid is not allowed."
      );
      return;
    }
    setBid((prev) => prev - 1000);
  };

  const [bid, setBid] = useState(product.price);
  return (
    <div className="w-[50%] mt-4 flex flex-col gap-4">
      <div
        className="text-violet-700 border border-violet-700 px-3 py-1 rounded-md flex justify-evenly items-center gap-2  h-10 w-full text-xl font-semibold"
        onClick={(e) => {
          e.stopPropagation();
          handleDecrement();
        }}
      >
        <button className="text-3xl" type="button" onClick={(e) => {}}>
          -
        </button>

        <input
          type="number"
          className=" text-violet-70-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center w-[50%]"
          value={bid}
          disabled
          onChange={(e) => {}}
        />

        <button
          className="text-3xl"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleIncrement();
          }}
        >
          +
        </button>
      </div>
      <button
        className="flex items-center justify-center text-slate-50 bg-violet-700 p-1 gap-4 rounded-md hover:bg-violet-900"
        onClick={(e) => {
          placeBid();
        }}
      >
        <RiAuctionFill className="text-4xl " />
        <p className="text-xl ">Place Bid</p>
      </button>
    </div>
  );
};

export default AuctionButton;
