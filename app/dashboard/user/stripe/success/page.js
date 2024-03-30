"use client";
import Link from "next/link";
import { useCart } from "@/context/cart";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function UserStripeSuccess() {
  const { clearCart } = useCart();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      clearCart(); // Call getCart only if user is authenticated
    }
  });

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-center">
        <div className="text-center mt-14">
          <p className="text-lg mb-4">
            Thank you for your purchase. You can now check your order status in
            the dashboard.
          </p>
          <hr className="border border-gray-300 my-6" />
          <Link
            href="/dashboard/user/orders"
            className="inline-block bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded"
          >
            View Order Status
          </Link>
        </div>
      </div>
    </div>
  );
}
