"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

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

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
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
      // window.location.reload();
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
      <div className="flex flex-col gap-4">
        {orders?.length > 0 &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-md  border border-slate-200 overflow-hidden text-sm"
            >
              <div className=" p-2 border-b border-slate-100 flex justify-between">
                <div>
                  <p>
                    Order{" "}
                    <Link href={"/djdj"} className=" text-violet-700">
                      #{order._id}
                    </Link>
                  </p>
                  <p className="text-slate-300">
                    Placed on {formatDate(new Date(order.createdAt))}
                  </p>
                </div>
                <div>
                  <span className="text-red-500 font-semibold cursor-pointer ml-4">
                    <td>
                      {order?.delivery_status === "Cancelled" ? (
                        <>Cancelled</>
                      ) : (
                        <></>
                      )}
                      {order?.delivery_status === "Not Processed" &&
                        !order.refunded && (
                          <>
                            <br />
                            <span
                              className="text-danger pointer"
                              onClick={() => handleCancelOrder(order?._id)}
                            >
                              Cancel the order
                            </span>
                          </>
                        )}
                    </td>
                  </span>
                </div>
              </div>
              <div className="p-8 ">
                {" "}
                <ul className="flex flex-col gap-4">
                  {order.cartItems.map((product) => (
                    <li
                      key={product._id}
                      className="flex gap-2 items-center justify-between "
                    >
                      <div className="flex gap-2 items-center min-w-60 max-w-60">
                        <Image src={product.image} width={60} height={40} />
                        <span
                          className="text-slate-800 font-semibold  cursor-pointer "
                          onClick={() => router.push(`/shop/${product.slug}`)}
                        >
                          {product.title}
                        </span>
                      </div>
                      <span className="bg-slate-200 px-2 text-sm rounded-lg text-slate-700">
                        Qty:{product.quantity}
                      </span>
                      <span className="bg-slate-200 px-2 rounded-lg  text-sm text-slate-700">
                        {order.delivery_status}
                      </span>
                      <span className=" font-semibold text-slate-600 px-2 rounded-lg  text-sm ">
                        Estimated Delivery:{" "}
                        {formatDate(addDays(new Date(order.createdAt), 5))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
