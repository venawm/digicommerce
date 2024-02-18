import Pagination from "@/components/product/Pagination";
import React from "react";
import ProductCard from "@/components/product/ProductCard";

async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: searchParams?.page || 1,
  }).toString();

  const response = await fetch(`${process.env.API}/product?${searchQuery}`, {
    method: "GET",
    next: { revalidate: 1 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();

  return data;
}

const page = async ({ searchParams }) => {
  const data = await getProducts(searchParams);
  return (
    <div>
      <div></div>
      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalProducts}
        pathname="/shop"
      />
    </div>
  );
};

export default page;
