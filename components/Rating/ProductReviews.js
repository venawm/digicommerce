"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useProduct } from "@/context/product";
import Stars from "./Ratings";
import { calculateAverage } from "@/utils/helper";
import { useSession } from "next-auth/react";

const Rating = ({ product }) => {
  const { comment, setComment, currentRating, setCurrentRating } = useProduct();

  const { productRatings, setProductRatings } = useState(product?.rating || []);
  const [averageRating, setAverageRating] = useState(0);

  //Current User
  const { data, status } = useSession();

  alreadyRated = productRatings?.find((rate) => {
    rate?.postedBy?._id === data?.user?._id;
  });

  useEffect(() => {
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

  return (
    <div>
      <h1 className=" font-bold text-2xl text-slate-800">Reviews</h1>
    </div>
  );
};

export default Rating;
