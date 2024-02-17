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
    setUpdatingProduct,
  } = useProduct();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleClick = (product) => {
    setUpdatingProduct(product);
    setDashboardItem("3");
  };
  return (
    <div className=" flex flex-wrap justify-evenly">
      {products?.map((product) => {
        return (
          <div
            key={product?._id}
            className=" w-[23rem] hover:cursor-pointer m-2 border border-slate-100 rounded-lg shadow-sm hover:shadow-lg hover:scale "
            onClick={() => handleClick(product)}
          >
            <div className="flex flex-col items-start justify-center p-2">
              <div
                className="min-w-[300px] min-h-[300px]
            max-h-[300px]  overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={
                    product?.images[0]?.secure_url || "/images/not-found.jpg"
                  }
                  width={400}
                  height={200}
                  className=" bg-cover"
                />
              </div>
              <p className=" text-xl font-bold text-slate-800">
                {product?.title}
              </p>
              <p className=" text-xl font-bold text-slate-800">
                ${product?.price}
              </p>
              <div
                className=" flex flex-wrap mt-2"
                dangerouslySetInnerHTML={{
                  __html:
                    product?.description?.length > 160
                      ? `${product?.description?.substring(0, 160)}...`
                      : product?.description,
                }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
