"use client";

import React, { useState, useEffect } from "react";
import { BiShoppingBag } from "react-icons/bi";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useProduct } from "@/context/product";
import Stars from "./Ratings";
import { calculateAverage } from "@/utils/helper";
import { useSession } from "next-auth/react";
import { FaRegStar, FaStar } from "react-icons/fa";

const Rating = ({ product }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { comment, setComment, currentRating, setCurrentRating } = useProduct();

  const [productRatings, setProductRatings] = useState(product?.ratings || []);

  const [averageRating, setAverageRating] = useState(0);

  //Current User
  const { data, status } = useSession();

  const alreadyRated = productRatings?.find((rate) => {
    if (rate?.postedBy?._id === data?.user?._id) {
      return rate;
    }
  });

  useEffect(() => {
    console.log(alreadyRated);
    if (alreadyRated) {
      setCurrentRating(alreadyRated?.rating);
      setComment(alreadyRated?.comment);
    } else {
      setCurrentRating(0);
      setComment("");
    }
  }, [alreadyRated]);

  useEffect(() => {
    if (productRatings) {
      const average = calculateAverage(productRatings);
      setAverageRating(average);
    }
  }, [product?.ratings]);

  const submitRating = async () => {
    if (status !== "authenticated") {
      toast.error("You must be logged in to leave a review");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }
    try {
      const response = await fetch(`${process.env.API}/user/product/rating`, {
        method: "POST",
        body: JSON.stringify({
          productId: product?._id,
          rating: currentRating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to leave a rating");
      }
      setProductRatings(data?.ratings);
      toast.success("Thanks for leaving a rating");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Error while leaving a review");
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-center flex-col gap-4">
        <h1 className=" font-bold text-2xl text-slate-800">Reviews</h1>
        <div className="flex text-2xl">
          {Array(5)
            .fill()
            .map((_, index) => {
              const ratingValue = index + 1;
              return (
                <span
                  key={ratingValue}
                  className={
                    ratingValue <= currentRating ? "text-yellow-400" : ""
                  }
                  onClick={() => setCurrentRating(ratingValue)}
                >
                  {ratingValue <= currentRating ? <FaStar /> : <FaRegStar />}
                </span>
              );
            })}
        </div>
        <textarea
          className="block p-2.5 text-sm text-slate-800 bg-gray-50 rounded-lg border border-gray-300 "
          cols={10}
          rows={2}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="Write a review"
        ></textarea>
        <button
          className="flex h-12 w-1/3  items-center justify-center bg-yellow-400 text-white duration-100 hover:bg-yellow-500 rounded-md"
          onClick={submitRating}
        >
          {alreadyRated ? "Update" : "Post"}
        </button>
      </div>
    </div>
  );
};

export default Rating;
