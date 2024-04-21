import React from "react";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { TbCategoryPlus } from "react-icons/tb";
import { LiaTagSolid } from "react-icons/lia";
import { MdOutlineCreate } from "react-icons/md";
import { CiBoxes } from "react-icons/ci";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const AdminNav = ({ dashboardItem, setDashboardItem }) => {
  console.log(dashboardItem);
  return (
    <nav>
      <aside className="fixed z-40 lg:w-[15vw] h-[85vh]  lg:ml-[0rem] mt-2 sm:ml-[-1rem] sm:w-[13rem] ">
        <div className="h-full px-4 py-2 overflow-y-auto bg-secondary rounded-md">
          <ul className=" mt-2 space-y-2 font-medium flex flex-col gap-2">
            <li>
              <p
                className={`flex items-center p-2 rounded-md hover:bg-white hover:text-slate-600 hover:cursor-pointer ${
                  dashboardItem === "0"
                    ? "text-slate-800 bg-white "
                    : " text-white"
                }`}
                onClick={() => {
                  setDashboardItem("0");
                }}
              >
                <RxDashboard className="text-2xl" />
                <span className="ms-3">Dashboard</span>
              </p>
            </li>

            <li>
              <p
                className={`flex items-center p-2 rounded-md hover:bg-white hover:text-slate-600 hover:cursor-pointer ${
                  dashboardItem === "1"
                    ? "text-slate-800 bg-white "
                    : " text-white"
                }`}
                onClick={() => {
                  setDashboardItem("1");
                }}
              >
                <TbCategoryPlus className="text-2xl" />
                <span className="ms-3">Categories</span>
              </p>
            </li>
            <li>
              <p
                className={`flex items-center p-2 rounded-md hover:bg-white hover:text-slate-600 hover:cursor-pointer ${
                  dashboardItem === "2"
                    ? "text-slate-600 bg-white "
                    : " text-white"
                }`}
                onClick={() => {
                  setDashboardItem("2");
                }}
              >
                <LiaTagSolid className="text-2xl " />
                <span className="ms-3">Tags</span>
              </p>
            </li>
            <li>
              <p
                className={`flex items-center p-2 rounded-md hover:bg-white hover:text-slate-600 hover:cursor-pointer ${
                  dashboardItem === "3"
                    ? "text-slate-600 bg-white "
                    : " text-white"
                }`}
                onClick={() => {
                  setDashboardItem("3");
                }}
              >
                <MdOutlineCreate className="text-2xl " />
                <span className="ms-3">Create Products</span>
              </p>
            </li>
            <li>
              <p
                className={`flex items-center p-2 rounded-md hover:bg-white hover:text-slate-600 hover:cursor-pointer ${
                  dashboardItem === "4"
                    ? "text-slate-600 bg-white "
                    : " text-white"
                }`}
                onClick={() => {
                  setDashboardItem("4");
                }}
              >
                <CiBoxes className="text-2xl " />
                <span className="ms-3">Products</span>
              </p>
            </li>
            <li>
              <p
                className={`flex items-center p-2 rounded-md hover:bg-white hover:text-slate-600 hover:cursor-pointer ${
                  dashboardItem === "5"
                    ? "text-slate-600 bg-white "
                    : " text-white"
                }`}
                onClick={() => {
                  setDashboardItem("5");
                }}
              >
                <MdOutlineProductionQuantityLimits className="text-2xl " />
                <span className="ms-3">Orders</span>
              </p>
            </li>
          </ul>
        </div>
      </aside>
    </nav>
  );
};

export default AdminNav;
