"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiAuctionFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import AuctionTable from "./AuctionTable";

const AuctionButton = ({ product }) => {
  const { data, status, update } = useSession();
  const [bid, setBid] = useState(0);
  const [bids, setBids] = useState([]);
  const [highest, setHighest] = useState();

  const fetchBid = async () => {
    const response = await fetch(
      `${process.env.API}/product/auctions/bid?id=${product._id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return;
    }
    const arr = data.bids.sort((a, b) => b.amount - a.amount);
    console.log(arr);

    console.log(arr);
    setBids(arr);
    setHighest(arr[0].amount);

    if (bid < arr[0].amount) {
      setBid((prevBid) => {
        if (prevBid < arr[0].amount) {
          return arr[0].amount;
        }
        return prevBid;
      });
    }
  };

  useEffect(() => {
    // Perform the initial fetch immediately
    fetchBid();

    // Set up an interval to fetch data every 1.5 seconds
    const interval = setInterval(fetchBid, 1500);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const placeBid = async () => {
    const body = JSON.stringify({
      productId: product._id,
      bid: bid,
      userId: data?.user?._id,
    });
    console.log(body);
    const response = await fetch(`${process.env.API}/product/auctions/bid`, {
      method: "PUT",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = response.json();
    if (!response.ok) {
      toast.error("Error placing bid please try again later");
      return;
    }
    toast.success("Bid sucessfully placed");
  };

  const handleIncrement = () => {
    setPrice(highest);
    if (!status) {
      toast.error("Please Login to bid");
      return;
    }
    setBid((prev) => prev + 1000);
  };

  const handleDecrement = () => {
    if (!status) {
      toast.error("Please Login to bid");
      return;
    }
    if (bid === highest) {
      toast.error(
        "Attempting to reduce the price below the highest bid is not allowed."
      );
      return;
    }
    setBid((prev) => prev - 1000);
  };

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
        <RiAuctionFill
          className="text-4xl "
          onClick={() => {
            placeBid();
          }}
        />
        <p className="text-xl ">Place Bid</p>
      </button>
      <AuctionTable data={bids} />
    </div>
  );
};

export default AuctionButton;
