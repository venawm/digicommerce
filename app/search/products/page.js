"use client";
import React, { useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useProduct } from "@/context/product";

const page = () => {
  const {
    setProductSearchQuery,
    fetchProductSearchResults,
    setProductSearchResults,
    productSearchResults,
  } = useProduct();
  const productSearchParams = useSearchParams();
  const query = productSearchParams.get("productSearchQuery");

  const onLoadSearchResults = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/search/products?productSearchQuery=${query}`,
        { method: "GET" }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Error while searching product");
      }
      const data = await response.json();
      console.log(data);
      setProductSearchResults(data);
    } catch (error) {
      toast.error("Unable to search for the product try again later");
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) {
      setProductSearchQuery(query);
      onLoadSearchResults();
    }
  }, [query]);
  return (
    <div>
      <div>
        <p className="mb-4">
          <span className="text-xl  font-semibold">
            Search result for: {query}
          </span>{" "}
          <span className="text-slate-500">
            ({productSearchResults?.length} total results)
          </span>
        </p>
        <div className="gap-4 flex-wrap flex justify-center">
          {productSearchResults?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
