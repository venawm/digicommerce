"use client";

import React, { useState } from "react";

import colorPicker from "@/utils/colorPicker";
import ImageGallery from "react-image-gallery";
import ProductLike from "@/components/product/ProductLike";
import Rating from "@/components/Rating/ProductReviews";
import Stars from "@/components/Rating/Ratings";
import { calculateAverage } from "@/utils/helper";
import UserReviews from "@/components/product/UserReviews";
import AddToCart from "@/components/product/AddToCart";
import { useAuction } from "@/context/auction";
import AuctionButton from "@/components/auction/AuctionButton";

async function getProduct(slug) {
  const response = await fetch(`${process.env.API}/product/${slug}`, {
    method: "GET",
    next: { revalidate: 1 },
  });
  if (!response.ok) {
    console.log("jeje");
  } else {
    const data = await response.json();
    return data;
  }
}

const page = async ({ params }) => {
  const product = await getProduct(params.id);

  const average = calculateAverage(product?.ratings);
  const image = product.images;
  const images = image.map((e) => {
    return {
      original: e.secure_url,
      thumbnail: e.secure_url,
    };
  });

  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  return (
    <div>
      <section className="container flex-grow mx-auto max-w-[1200px] py-5 lg:grid lg:grid-cols-2 lg:py-10">
        {/* image gallery */}
        <div className="container mx-auto px-4 w-full">
          <ImageGallery
            lazyLoad
            items={images}
            showBullets={false}
            showFullscreenButton={false}
            showPlayButton={false}
            className={"min-h-44"}
          />

          {/* /image gallery  */}
          {/* <div className="">
            <UserReviews reviews={product?.ratings} />
          </div> */}
        </div>
        {/* description  */}

        <div className="mx-auto px-5 lg:px-5">
          <h2 className="pt-3 text-2xl font-bold lg:pt-0">{product.title}</h2>
          <div className="flex justify-centers items-center text-sm">
            <Stars rating={average} />
            <p className="text-slate-400">({product?.ratings.length})</p>
          </div>
          <div className="flex gap-2">
            <p className="mt-5 font-bold">
              Availability:
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock </span>
              ) : (
                <span className="text-red-600">Expired</span>
              )}
            </p>
            <p className="mt-5"> ({product.stock})</p>
          </div>
          <p className="font-bold">
            Brand: <span className="font-normal">{product.brand}</span>
          </p>
          <p className="font-bold">
            Category:{" "}
            <span className="font-normal">{product.category.name}</span>
          </p>
          <ProductLike product={product} />
          <p className="mt-4 text-4xl font-bold text-purple-700">
            ${product.price}{" "}
            <span className="text-xs text-gray-400 line-through">
              ${product?.previousPrice}
            </span>
          </p>
          <p className="pt-5 text-sm leading-5 text-gray-500">
            {product.description}
          </p>
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Tags</p>
            <div className="flex gap-1">
              {product.tags.map((x, index) => {
                return (
                  <div
                    key={index}
                    className="flex h-8 w-auto p-2 rounded-md cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                  >
                    {x.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6">
            <p className="pb-2 text-xs text-gray-500">Color</p>
            <div className="flex gap-1 w-full">
              <div
                style={{
                  backgroundColor: colorPicker(product.color) || "#000000",
                }}
                className="h-8 w-8 cursor-pointe rounded-full"
              ></div>

              {product.color}
            </div>
          </div>
          {/* 
          <Rating product={product} /> */}
          <AuctionButton product={product} />
        </div>
      </section>
    </div>
  );
};

export default page;
