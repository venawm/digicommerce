"use client";
import AdminNav from "@/components/nav/AdminNav";
import React, { useState } from "react";
import Category from "@/components/admin/dashboard/Category";
import Tag from "@/components/admin/dashboard/Tag";

const page = () => {
  const [dashboardItem, setDashboardItem] = useState("0");

  const renderer = () => {
    if (dashboardItem === "0") {
      return <h1>hel</h1>;
    } else if (dashboardItem === "1") {
      return <Category />;
    } else if (dashboardItem === "2") {
      return <Tag />;
    }
  };

  return (
    <main className="flex gap-12">
      <AdminNav
        dashboardItem={dashboardItem}
        setDashboardItem={setDashboardItem}
      />
      <div className="mt-2 w-full">{renderer()}</div>
    </main>
  );
};

export default page;
