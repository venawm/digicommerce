import React from "react";
import Link from "next/link";
import { MdDashboard, MdCategory } from "react-icons/md";

const AdminNav = ({ dashboardItem, setDashboardItem }) => {
  console.log(dashboardItem);
  return (
    <nav>
      <aside className="z-40 lg:w-[15vw] h-[85vh]  lg:ml-[-6.5rem] mt-2 sm:ml-[-1rem] sm:w-[25vw] ">
        <div className="h-full px-4 py-2 overflow-y-auto bg-secondary rounded-md">
          <ul className=" mt-2 space-y-2 font-medium flex flex-col gap-2">
            <li>
              <p
                className={`flex items-center p-2 rounded-md hover:bg-white hover:text-slate-600 hover:cursor-pointer ${
                  dashboardItem === "0"
                    ? "text-slate-600 bg-white "
                    : " text-white"
                }`}
                onClick={() => {
                  setDashboardItem("0");
                }}
              >
                <MdDashboard className="text-2xl" />
                <span className="ms-3">Dashboard</span>
              </p>
            </li>

            <li>
              <p
                className={`flex items-center p-2 rounded-md hover:bg-white hover:text-slate-600 hover:cursor-pointer ${
                  dashboardItem === "1"
                    ? "text-slate-600 bg-white "
                    : " text-white"
                }`}
                onClick={() => {
                  setDashboardItem("1");
                }}
              >
                <MdCategory className="text-2xl" />
                <span className="ms-3">Categories</span>
              </p>
            </li>
          </ul>
        </div>
      </aside>
    </nav>
  );
};

export default AdminNav;
