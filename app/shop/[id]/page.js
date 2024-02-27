"use client";

import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ImageGallery from "react-image-gallery";

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
  const image = product.images;
  const images = image.map((e) => {
    return {
      original: e.secure_url,
      thumbnail: e.secure_url,
    };
  });
  const productDetailItem = {
    title: "BIG ITALIAN SOFA",
    reviews: "150",
    availability: true,
    brand: "apex",
    category: "Sofa",
    sku: "BE45VGTRK",
    price: 450,
    previousPrice: 599,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem exercitationem voluptate sint eius ea assumenda provident eos repellendus qui neque! Velit ratione illo maiores voluptates commodi eaque illum, laudantium non!",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["gray", "violet", "red"],
  };
  const plusMinuceButton =
    "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";
  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      {/* image gallery */}
      <div className="container mx-auto px-4">
        <ImageGallery
          lazyLoad
          items={images}
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
        />

        {/* /image gallery  */}
      </div>
      {/* description  */}

      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">{product.title}</h2>
        <div className="flex gap-2">
          <p className="mt-5 font-bold">
            Availability:
            {productDetailItem.availability ? (
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
          Cathegory:{" "}
          <span className="font-normal">{product.category.name}</span>
        </p>
        <p className="font-bold">
          Tags: <span className="font-normal">Implement tags later</span>
        </p>
        <p className="mt-4 text-4xl font-bold text-violet-900">
          ${product.price}{" "}
          <span className="text-xs text-gray-400 line-through">
            ${product?.previousPrice}
          </span>
        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {product.description}
        </p>
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Size</p>
          <div className="flex gap-1">
            {productDetailItem.size.map((x, index) => {
              return (
                <div
                  key={index}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                >
                  {x}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Color</p>
          <div className="flex gap-1">
            {productDetailItem.color.map((x, index) => {
              return (
                <div
                  key={index}
                  className={`h-8 w-8 cursor-pointer border border-white bg-${x}-600 focus:ring-2 focus:ring-${x}-500 active:ring-2 active:ring-${x}-500`}
                />
              );
            })}
          </div>
        </div>
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Quantity</p>
          <div className="flex">
            <button className={`${plusMinuceButton}`}>−</button>
            <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
              1
            </div>
            <button className={`${plusMinuceButton}`}> +</button>
          </div>
        </div>
        <div className="mt-7 flex flex-row items-center gap-6">
          <button className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800">
            <BiShoppingBag className="mx-2" />
            Add to cart
          </button>
          <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
            <AiOutlineHeart className="mx-2" />
            Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
