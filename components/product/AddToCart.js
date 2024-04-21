"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart";
import { BiShoppingBag } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddToCart({ product }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data, status } = useSession();
  const { addToCart, updateQuantity, removeFromCart, cartItems } = useCart();

  // find the product in cartItems if it exist
  const existingProduct = cartItems?.find(
    (item) => item?.product?._id === product?._id
  );
  const initialQuantity = existingProduct ? existingProduct?.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(existingProduct ? existingProduct?.quantity : 1);
  }, [existingProduct]);

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (status !== "authenticated") {
      toast.error("Please login before adding items to the cart");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }

    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(newQuantity, product);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (status !== "authenticated") {
      toast.error("Please login before adding items to the cart");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }

    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(newQuantity, product);
    } else {
      removeFromCart(product._id);
      setQuantity(1);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (status !== "authenticated") {
      toast.error("Please login before adding items to the cart");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }

    addToCart(product, quantity);
  };

  return (
    <div>
      {cartItems?.some((item) => item?.product?._id === product?._id) ? (
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
