import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

const AuctionTable = ({ data }) => {
  const formatDate = (dateString) => {
    return dayjs(dateString).fromNow();
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[200%] my-2 h-[25rem]">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white border-b " : "bg-white"}
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.userId.name}
              </td>
              <td className="px-6 py-4">{item.amount}</td>
              <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionTable;
