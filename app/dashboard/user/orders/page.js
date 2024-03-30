"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/orders`, {
        method: "GET",
      });
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${process.env.API}/user/orders/refund?orderId=${orderId}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error("Something went wrong. Please try again.");
      } else {
        toast.success("Order cancelled");
        fetchOrders();
      }
      setOrders(data);
    } catch (err) {
      console.log(err);
      toast.error("Order cancellation failed. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-700">
        LOADING...
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4">Order Details</h4>
              <ul className="divide-y divide-gray-200">
                <li className="py-2">
                  <span className="font-bold">Charge ID:</span> {order.chargeId}
                </li>
                <li className="py-2">
                  <span className="font-bold">Created:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </li>
                <li className="py-2">
                  <span className="font-bold">Payment Intent:</span>{" "}
                  {order.payment_intent}
                </li>
                <li className="py-2">
                  <span className="font-bold">Refunded:</span>{" "}
                  {order.refunded ? "Yes" : "No"}
                </li>
                <li className="py-2">
                  <span className="font-bold">Status:</span> {order.status}
                </li>
                <li className="py-2">
                  <span className="font-bold">Total Charged:</span> $
                  {(order.amount_captured / 100).toFixed(2)} {order.currency}
                </li>
              </ul>
            </div>
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4">Shipping Address</h4>
              <p>
                {order.shipping.address.line1}
                {order.shipping.address.line2 &&
                  `, ${order.shipping.address.line2}`}
              </p>
              <p>
                {order.shipping.address.city}, {order.shipping.address.state},{" "}
                {order.shipping.address.postal_code}
              </p>
              <p>{order.shipping.address.country}</p>
            </div>
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4">Ordered Products</h4>
              <ul>
                {order.cartItems.map((product) => (
                  <li key={product._id}>
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => router.push(`/shop/${product.slug}`)}
                    >
                      {product.quantity} x {product.title} - $
                      {(product.price * product.quantity).toFixed(2)}{" "}
                      {order.currency}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6">
              <h4 className="text-lg font-semibold mb-4">Delivery Status</h4>
              <p>
                {order.delivery_status}
                {order.delivery_status === "Not Processed" &&
                  !order.refunded && (
                    <span
                      className="text-red-500 cursor-pointer ml-4"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Cancel the order
                    </span>
                  )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
