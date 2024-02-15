"use client";

import React, { useEffect } from "react";
import { useProduct } from "@/context/product";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Products = ({ setDashboardItem }) => {
  const {
    products,
    currentPage,
    totalPages,
    fetchProducts,
    setUpdatingProducts,
  } = useProduct();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  useEffect(() => {
    fetchProducts(page);
  }, [page]);
  return (
    <div className=" flex flex-wrap">
      {products?.map((product) => {
        return (
          <div key={product?._id}>
            <div>
              <Image
                src={product?.images[0]?.secure_url || "/public/login.png"}
                width={300}
                height={150}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
