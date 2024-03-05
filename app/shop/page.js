"use client";

import React from "react";
import ProductCard from "@/components/product/ProductCard";
import ProductFilter from "@/components/product/ProductFilter";
import Pagination from "@/components/product/Pagination";

async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: searchParams?.page || 1,
    minPrice: searchParams?.minPrice || "",
    maxPrice: searchParams?.maxPrice || "",
    ratings: searchParams?.ratings || "",
    category: searchParams?.category || "",
    tag: searchParams?.tag || "",
    brand: searchParams?.brand || "",
  }).toString();

  try {
    const response = await fetch(
      `${process.env.API}/product/filters?${searchQuery}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.products)) {
      throw new Error("No products returned");
    }

    return data;
  } catch (err) {
    console.log(err);
    return { products: [], currentPage: 1, totalPages: 1 };
  }
}

const Page = ({ searchParams }) => {
  const fetchData = async () => {
    try {
      const data = await getProducts(searchParams);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return { products: [], currentPage: 1, totalPages: 1 };
    }
  };

  const [productsData, setProductsData] = React.useState({
    products: [],
    currentPage: 1,
    totalPages: 1,
  });

  React.useEffect(() => {
    fetchData().then((data) => setProductsData(data));
  }, [searchParams]);

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="lg:w-1/4">
        <ProductFilter searchParams={searchParams} />
      </div>
      <div className="lg:flex-grow">
        <div className="gap-4 flex-wrap flex justify-center">
          {productsData.products.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={productsData.currentPage}
          totalPages={productsData.totalPages}
          pathname="/shop"
        />
      </div>
    </div>
  );
};

export default Page;
