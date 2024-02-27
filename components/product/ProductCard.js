"use client";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Stars from "./Ratings";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
dayjs.extend(relativeTime);
export default function ({ product }) {
  const router = useRouter();
  const [like, setLike] = useState(false);
  const clickLike = () => {};
  return (
    <div
      onClick={() => {
        router.push(`/shop/${product?.slug}`);
      }}
      key={product?._id}
      className="w-[20rem] h-[30rem]  p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between border border-slate-200 "
    >
      <div className="">
        {like ? (
          <FaHeart
            className=" text-3xl absolute fill-red-600"
            onClick={() => {
              setLike(!like);
            }}
          />
        ) : (
          <CiHeart
            className=" text-3xl absolute fill-slate-600"
            onClick={() => {
              setLike(!like);
            }}
          />
        )}

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
            ${product?.price}
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

            <small>{dayjs(product?.createdAt).fromNow()}</small>
          </div>
          <div className="">
            {/* <small className="flex gap-2 items-center">
              <FaHeart className="text-slate-800" />
              <p>0 Likes</p>
            </small> */}
          </div>
          <div className="flex justify-center items-center">
            <Stars rating={4.5} />
          </div>
        </div>
      </div>

      <div className="m-2 flex justify-center items-center">
        <button className="text-white bg-violet-700 px-3 py-1 rounded-md hover:bg-purple-700 flex justify-center items-center gap-2  h-10 w-full">
          <FaShoppingCart className="text-2xl" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
