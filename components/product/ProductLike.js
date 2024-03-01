"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useRouter, usePathname } from "next/navigation";

export default function ProductLike({ product }) {
  const { data, status } = useSession();
  const [likes, setLikes] = useState(product?.likes);

  const router = useRouter();
  const pathname = usePathname();

  const isLiked = likes?.includes(data?.user?._id);

  const handleLike = async () => {
    if (status !== "authenticated") {
      toast.error("Please sign in to like");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }

    try {
      if (isLiked) {
        const answer = window.confirm("Are you sure to unlike?");
        if (answer) {
          handleUnlike();
        }
      } else {
        const response = await fetch(`${process.env.API}/user/product/like`, {
          method: "PUT",
          body: JSON.stringify({ productId: product?._id }),
        });

        if (!response.ok) {
          throw new Error("Failed to unlike");
        } else {
          const data = await response.json();
          setLikes(data?.likes);
          toast.success("Product liked");
          router.refresh();
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to like");
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/product/unlike`, {
        method: "PUT",
        body: JSON.stringify({ productId: product?._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to unlike");
      }

      const data = await response.json();
      setLikes(data?.likes);
      toast.success("Product unliked");
      router.refresh();
    } catch (err) {
      console.log(err);
      toast.error("Failed to unlike");
    }
  };

  return (
    <div className=" hover:cursor-pointer" onClick={handleLike}>
      {!likes.length ? (
        <div className="flex items-center gap-2">
          <CiHeart className=" text-3xl  fill-slate-600" />
          <span>Be the first person to like</span>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            {isLiked ? (
              <>
                <FaHeart
                  className=" text-2xl  fill-red-600"
                  onClick={handleLike}
                />
              </>
            ) : (
              <>
                <CiHeart
                  className=" text-3xl  fill-slate-600"
                  onClick={handleLike}
                />
              </>
            )}

            <span onClick={handleLike}>{likes?.length} likes</span>
          </div>
        </>
      )}
    </div>
  );
}
