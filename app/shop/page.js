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
      <div className="w-full min-h-screen gap-4 flex-wrap flex justify-center items-center">
        {data.products.map((e) => {
          return <ProductCard key={e?._id} product={e} />;
        })}
      </div>

      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalProducts}
        pathname="/shop"
      />
    </div>
  );
};

export default page;
