"use client";

import React, { useEffect, useState } from "react";
import { useProduct } from "@/context/product";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Products = ({ setDashboardItem }) => {
  const {
    products,
    currentPage,
    totalPage,
    fetchProducts,
    setUpdatingProduct,
  } = useProduct();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  console.log(totalPage);
  const handleClick = (product) => {
    setDashboardItem("3");
    setUpdatingProduct(product);
  };
  return (
    <div className=" flex flex-col gap-2">
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
                    width={250}
                    height={200}
                    className=" bg-cover"
                    alt={product?.name || "error"}
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
      <div>
        <ul className="flex gap-1 mb-4">
          {Array.from({ length: totalPage }, (_, index) => {
            const p = index + 1;
            return (
              <li
                className={`${
                  page === p
                    ? "bg-slate-800  text-slate-50 hover:bg-slate-800"
                    : ""
                } hover:cursor-pointer w-8  h-8 flex justify-center items-center rounded-full hover:bg-slate-300`}
                onClick={() => setPage(p)}
                key={p}
              >
                {p}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Products;
