import React, { useState } from "react";

const page = () => {
  const [order, setOrder] = useState([]);
  return (
    <div>
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
          {order.shipping.address.line2 && `, ${order.shipping.address.line2}`}
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
                {(product.price * product.quantity).toFixed(2)} {order.currency}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-4">Delivery Status</h4>
        <p>
          {order.delivery_status}
          {order.delivery_status === "Not Processed" && !order.refunded && (
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
  );
};

export default page;
