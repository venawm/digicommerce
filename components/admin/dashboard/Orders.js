import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import Pagination from "@/components/product/Pagination";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  //   Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/orders?page=${page}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setOrders(data.orders);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
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

  const handleStatusChange = async (newStatus, orderId) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/orders/${orderId}`,
        {
          method: "PUT",
          body: JSON.stringify({ delivery_status: newStatus }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error("Something went wrong. Please try again.");
      } else {
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o._id === orderId ? { ...o, delivery_status: newStatus } : o
          )
        );
        toast.success("Order status updates");
        fetchOrders();
      }
      setOrders(data);
      // window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("failed to update order status");
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
                    Customer:{" "}
                    <Link href={"/anon"} className=" text-violet-700">
                      {order.userId?.name}
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
                            ></span>
                          </>
                        )}
                    </td>
                  </span>
                </div>
              </div>
              <div className="p-8 ">
                {" "}
                <ul className="flex items-center gap-36">
                  <div className="flex flex-col gap-4 ">
                    {" "}
                    {/* Adjusted width to 3/4 */}
                    {order.cartItems.map((product) => (
                      <li
                        key={product._id}
                        className="flex gap-36 items-center justify-between"
                      >
                        <div className="flex gap-2 items-center min-w-60 max-w-60">
                          <Image src={product.image} width={60} height={40} />
                          <span
                            className="text-slate-800 font-semibold cursor-pointer"
                            onClick={() => router.push(`/shop/${product.slug}`)}
                          >
                            {product.title}
                          </span>
                        </div>
                        <span className="bg-slate-200 px-2 text-sm rounded-lg text-slate-700">
                          Qty:{product.quantity}
                        </span>
                      </li>
                    ))}
                  </div>
                  <div className="flex gap-36">
                    <span className="bg-slate-200 p-2 rounded-lg text-sm text-slate-700">
                      <select
                        onChange={(e) =>
                          handleStatusChange(e.target.value, order._id)
                        }
                        value={order.delivery_status}
                        disabled={order?.refunded}
                      >
                        <option value="Not Processed">Not Processed</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        {order?.delivery_status === "Cancelled" && (
                          <option value="Cancelled">Cancelled</option>
                        )}
                        <option value="Delivered">Delivered</option>
                      </select>
                    </span>
                    <span className="font-bold text-slate-800 px-2 rounded-lg  text-md  ">
                      Total Charge: ${order.amount_captured / 100} USD
                    </span>
                  </div>
                </ul>
              </div>
            </div>
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pathname={pathname}
      />
    </div>
  );
};

export default Orders;
