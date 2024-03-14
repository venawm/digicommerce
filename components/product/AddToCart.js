"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart";
import { BiShoppingBag } from "react-icons/bi";
import Link from "next/link";

export default function AddToCart({ product }) {
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();

  // find the product in cartItems if it exist
  const existingProduct = cartItems?.find((item) => item?._id === product?._id);
  const initialQuantity = existingProduct ? existingProduct?.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(existingProduct ? existingProduct?.quantity : 1);
  }, [existingProduct]);

  const handleIncrement = (e) => {
    e.stopPropagation();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product, newQuantity);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product, newQuantity);
    } else {
      removeFromCart(product._id);
      setQuantity(1);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, quantity);
  };

  return (
    <div>
      {cartItems?.some((item) => item?._id === product?._id) ? (
        <div>
          <div
            className="text-violet-700 border border-violet-700 px-3 py-1 rounded-md flex justify-evenly items-center gap-2  h-10 w-full text-xl font-semibold"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className="text-3xl"
              type="button"
              onClick={handleDecrement}
            >
              -
            </button>

            <input
              type="number"
              className=" text-violet-70-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center w-[50%]"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />

            <button
              className="text-3xl"
              type="button"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <div className="m-2 flex justify-center items-center">
          <button
            className="text-white bg-violet-700 px-3 py-1 rounded-md hover:bg-purple-700 flex justify-center items-center gap-2  h-10 w-full"
            onClick={handleAddToCart}
          >
            <BiShoppingBag className="mx-2" />
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}
