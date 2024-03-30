import React from "react";
import { useCart } from "@/context/cart";
import Image from "next/image";
import AddToCart from "../product/AddToCart";
import Link from "next/link";
import OrderSummary from "./OrderSummary";

const StepOne = ({ onNextStep }) => {
  const { cartItems, clearCart } = useCart();
  // Function to truncate description to 160 characters
  const truncateDescription = (description) => {
    return description.length > 260
      ? description.substring(0, 260) + "..."
      : description;
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex mt-16 justify-between gap-8">
        <div className="flex flex-col gap-1">
          {cartItems?.map((product) => (
            <div
              key={product._id}
              className="flex border p-2 w-[50rem] justify-center items-center rounded-md border-slate-200"
            >
              <div className="m-2">
                <Image
                  src={product.product.images[0].secure_url}
                  width={300}
                  height={200}
                  alt="Product Image"
                />
              </div>
              <div className="flex flex-col">
                <Link
                  href={`/shop/${product.product.slug}`}
                  className="text-xl font-semibold"
                >
                  {product.product.title}
                </Link>
                <p>{truncateDescription(product.product.description)}</p>
                <div className=" m-8">
                  <AddToCart product={product.product} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <OrderSummary />
      </div>
      <button
        className="w-48 h-10  bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-800"
        onClick={onNextStep}
      >
        Next
      </button>
      <button
        className="w-48 h-10  bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-800"
        onClick={() => {
          clearCart();
        }}
      >
        clear
      </button>
    </div>
  );
};

export default StepOne;
