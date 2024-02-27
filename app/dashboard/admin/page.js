"use client";
import AdminNav from "@/components/nav/AdminNav";
import React, { useEffect, useState } from "react";
import Category from "@/components/admin/dashboard/Category";
import Tag from "@/components/admin/dashboard/Tag";
import CreateProduct from "@/components/admin/dashboard/CreateProduct";
import Products from "@/components/admin/dashboard/Products";
import { useProduct } from "@/context/product";

const page = () => {
  const [dashboardItem, setDashboardItem] = useState("0");
  const {
    product,
    setProduct,
    updatingProduct,
    setUpdatingProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploading,
    setUploading,
    uploadImages,
    deleteImage,
  } = useProduct();

  const renderer = () => {
    if (dashboardItem === "0") {
      return <h1>hel</h1>;
    } else if (dashboardItem === "1") {
      return <Category />;
    } else if (dashboardItem === "2") {
      return <Tag />;
    } else if (dashboardItem === "3") {
      return <CreateProduct />;
    } else if (dashboardItem === "4") {
      return <Products setDashboardItem={setDashboardItem} />;
    }
  };
  useEffect(() => {
    if (!(dashboardItem == 3 || dashboardItem == 4)) {
      // Code block to execute when dashboardItem is not equal to both 3 and 4
      setUpdatingProduct(null);
      setProduct({
        title: "",
        price: "",
        color: "",
        brand: "",
        stock: "",
        category: null,
        description: "",
        tags: [],
        images: [],
      });
    }
  }, [dashboardItem]);

  return (
    <main className="flex gap-12">
      <AdminNav
        dashboardItem={dashboardItem}
        setDashboardItem={setDashboardItem}
      />
      <div className="mt-2 lg:ml-[14rem] w-full sm:ml-[10rem]">
        {renderer()}
      </div>
    </main>
  );
};

export default page;
