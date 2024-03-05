"use client";
import React from "react";
import { priceRanges } from "@/utils/filterData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImCross } from "react-icons/im";
import Stars from "../Rating/Ratings";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";
import { useProduct } from "@/context/product";

export default function ProductFilter({ searchParams }) {
  const pathname = "/shop";
  const { minPrice, maxPrice, ratings, category, tag, brand } = searchParams;

  // Context
  const { fetchCategoriesPublic, categories } = useCategory();
  const { fetchTagsPublic, tags } = useTag();
  const { fetchBrands, brands } = useProduct();

  React.useEffect(() => {
    fetchCategoriesPublic();
    fetchTagsPublic();
    fetchBrands();
  }, []);

  const router = useRouter();

  const handleRemoveFilter = (filterName) => {
    const updatedSearchParams = { ...searchParams };

    if (typeof filterName === "string") {
      delete updatedSearchParams[filterName];
    }

    if (Array.isArray(filterName)) {
      filterName?.forEach((name) => {
        delete updatedSearchParams[name];
      });
    }

    updatedSearchParams.page = 1;
    const queryString = new URLSearchParams(updatedSearchParams).toString();
    const newUrl = `${pathname}?${queryString}`;
    router.push(newUrl);
  };
  const activeButton =
    "p-1 rounded-md block text-center w-2/3 bg-slate-100 border border-slate-200 hover:bg-slate-300";
  const button =
    "p-1 rounded-md block text-center w-2/3 border border-slate-100 hover:bg-slate-100";

  return (
    <div className="w-[20vw] max-h-[75vh] overflow-scroll text-slate-800  border p-6 border-slate-200 rounded-md scrollbar-hide">
      <div className="">
        <p className="text-xl font-bold">Filter Products</p>
        <Link href={"/shop"} className="text-violet-700 hover:text-violet-800">
          Clear Products
        </Link>
      </div>
      <p className=" mt-4 font-semibold ">Price</p>
      <div className="flex flex-col gap-2">
        {priceRanges?.map((range) => {
          const url = {
            pathname,
            query: {
              ...searchParams,
              minPrice: range?.min,
              maxPrice: range?.max,
              page: 1,
            },
          };
          const isActive =
            minPrice === String(range?.min) && maxPrice === String(range?.max);
          return (
            <div key={range?.label} className="flex items-center gap-2">
              <Link href={url} className={isActive ? activeButton : button}>
                {range?.label}
              </Link>
              {isActive && (
                <span
                  onClick={() => handleRemoveFilter(["minPrice", "maxPrice"])}
                  className="cursor-pointer text-red-500"
                >
                  <ImCross />
                </span>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-4 font-semibold">Ratings</p>
      <div className="flex flex-col">
        {[5, 4, 3, 2, 1].map((ratingValue) => {
          const isActive = String(ratings) === String(ratingValue);
          const url = {
            pathname,
            query: {
              ...searchParams,
              ratings: ratingValue,
              page: 1,
            },
          };
          return (
            <div key={ratingValue} className="flex items-center">
              <Link
                href={url}
                className={`${
                  isActive
                    ? "h-6 p-2 flex justify-center items-center rounded-md bg-slate-50 shadow-sm border border-slate-200 w-2/3"
                    : "h-8 p-2 flex justify-center items-center w-2/3"
                }`}
              >
                <div className="flex text-xl">
                  <Stars rating={ratingValue} />
                </div>
              </Link>
              {isActive && (
                <span
                  onClick={() => handleRemoveFilter("ratings")}
                  className="hover:cursor-pointer ml-2"
                >
                  <ImCross className="text-[10px]  text-red-600" />
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <p className="mt-4">Categories</p>
        <div className="mt-4 flex flex-col gap-2 shrink-0">
          {categories?.map((c) => {
            const isActive = category === c._id;
            const url = {
              pathname,
              query: {
                ...searchParams,
                category: c?._id,
                page: 1,
              },
            };
            return (
              <div key={c._id} className="w-full flex gap-2 items-center">
                <Link
                  href={url}
                  className={`${isActive ? activeButton : button} `}
                >
                  {c?.name}
                </Link>
                {isActive && (
                  <span
                    onClick={() => handleRemoveFilter("category")}
                    className="pointer text-red-600"
                  >
                    <ImCross />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {category && (
          <>
            <p className="">Tags</p>
            <div className="flex gap-1 ">
              {tags
                ?.filter((t) => t?.parentCategory === category)
                ?.map((t) => {
                  const isActive = tag === t._id;
                  const url = {
                    pathname,
                    query: {
                      ...searchParams,
                      tag: t?._id,
                      page: 1,
                    },
                  };
                  return (
                    <div key={t._id} className="flex items-center gap-2">
                      <Link
                        href={url}
                        className={
                          isActive
                            ? "border p-1 rounded-md"
                            : "border p-1 rounded-md"
                        }
                      >
                        {t?.name}
                      </Link>
                      {isActive && (
                        <span
                          onClick={() => handleRemoveFilter("tag")}
                          className="pointer text-xs text-red-600"
                        >
                          <ImCross />
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
