"use client";
import AdminNav from "@/components/nav/AdminNav";
import React, { useState } from "react";
import Category from "@/components/admin/dashboard/Category";

const page = () => {
  const [dashboardItem, setDashboardItem] = useState("0");

  const renderer = () => {
    if (dashboardItem === "0") {
      return <h1>hel</h1>;
    } else if (dashboardItem === "1") {
      return <Category />;
    }
  };

  return (
    <main className="flex">
      <AdminNav
        dashboardItem={dashboardItem}
        setDashboardItem={setDashboardItem}
      />
      {renderer()}
    </main>
  );
};

export default page;
