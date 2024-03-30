import React from "react";
import { useState } from "react";
import { useCart } from "@/context/cart";
import OrderSummary from "@/components/cart/OrderSummary";
import toast from "react-hot-toast";

const StepThree = ({ onPrevStep }) => {
  const { cartItems, validCoupon, couponCode } = useCart();
  // state
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const payload = {};

      const cartData = cartItems?.map((item) => ({
        _id: item.product._id,
        quantity: item.quantity,
      }));
      console.log(cartItems);
      console.log(cartData);

      payload.cartItems = cartData;
      if (validCoupon) {
        payload.couponCode = couponCode;
      }

      const response = await fetch(`${process.env.API}/user/stripe/session`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        window.location.href = data.url;
      } else {
        toast.error(data.err);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occured, please try again");
      setLoading(false);
    }
  };
  return (
    <div className="flex gap-8 mt-12">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4">
          <p className=" bg-slate-100 p-12 font-semibold">
            Clicking 'Place Order' will securly redirect you to our trusted
            payment partner, Stripe to complete your order.
            <p>$5 shipping fee will apply for all orders</p>
          </p>

          <div className="">
            <button
              className="w-48 h-10  bg-red-500 text-white font-semibold rounded-l-lg hover:bg-red-700"
              onClick={onPrevStep}
            >
              Previous
            </button>
            <button
              className="w-48 h-10  bg-violet-600 text-white font-semibold rounded-r-lg hover:bg-violet-800"
              onClick={handleClick}
              disabled={loading}
            >
              Place Order
            </button>{" "}
          </div>
        </div>
      </div>

      <div>
        <OrderSummary />
      </div>
    </div>
  );
};

export default StepThree;
