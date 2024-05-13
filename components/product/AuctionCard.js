"use client";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Stars from "../Rating/Ratings";
import { BiShoppingBag } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculateAverage } from "@/utils/helper";
import AddToCart from "./AddToCart";
import CountdownTimer from "../auction/CountDown";
import calculateRemainingTime from "@/utils/calculateRemainingTime";
import { useAuction } from "@/context/auction";

dayjs.extend(relativeTime);
export default function ({ product }) {
  const router = useRouter();
  const average = calculateAverage(product?.ratings);
  const remainingTime = calculateRemainingTime(product.bidEndTime);
  return (
    <div
      onClick={() => {
        router.push(`/auction/${product?.slug}`);
      }}
      key={product?._id}
      className="w-[20rem] h-[30rem]  p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between border border-slate-200 "
    >
      {/* <CountdownTimer endTime={product.bidEndTime} /> */}
      <div className="">
        <div>
          <p className="bg-red-500 text-slate-50 w-10 text-[12px] font-bold text-center rounded-full">
            Live
          </p>
        </div>

        <div className="h-[250px] overflow-hidden flex justify-center items-center ">
          <Image
            src={product?.images?.[0]?.secure_url || "/images/not-found.jpg"}
            width={200}
            height={200}
            alt={product?.title}
            className=" object-scale-down"
          />
        </div>
        <div>
          <h2 className=" text-lg font-semibold text-slate-800 mb-2 h-12">
            {product?.title}
          </h2>
          <h2 className="font-bold text-xl text-slate-800 mb-2 ">
            ${product.bids[product.bids.length - 1].amount}
          </h2>
        </div>
        <div>
          {/* <div
            className=" text-xs"
            dangerouslySetInnerHTML={{
              __html:
                product?.description?.length > 160
                  ? `${product?.description?.substring(0, 160)}..`
                  : product?.description,
            }}
          /> */}
        </div>
        <div className=" flex flex-col gap-2 mt-2">
          <div className="flex justify-between">
            <div className="flex gap-1">
              <p className="text-slate-800 text-xs p-1 font-bold bg-violet-100 rounded-md w-auto">
                {product?.category?.name}
              </p>
              <p className="text-slate-800 text-xs p-1 font-bold bg-violet-100 rounded-md w-auto">
                {product?.brand}
              </p>
            </div>

            <small> Ends {dayjs(product?.bidEndTime).fromNow()}</small>
          </div>
          <div className="">
            {/* <small className="flex gap-2 items-center">
              <FaHeart className="text-slate-800" />
              <p>0 Likes</p>
            </small> */}
          </div>
          <div className="flex justify-center items-center text-2xl">
            <Stars rating={average} />
            <p className="text-slate-400 text-xs">
              ({product?.ratings.length})
            </p>
          </div>
        </div>
      </div>
      <div className="text-center text-xl font-semibold text-violet-700 mb-4">
        0 Total Bids
      </div>
    </div>
  );
}
