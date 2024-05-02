"use client";

import React, { useEffect } from "react";
import { useAuction } from "@/context/auction";
import AuctionCard from "@/components/product/AuctionCard";

const Page = () => {
  const { fetchProducts, products } = useAuction();

  useEffect(() => {
    fetchProducts();
  }, []); // Run once on component mount

  console.log(products);
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center text-3xl font-semibold text-slate-800">
        Auctions
      </div>

      <div className="gap-4 flex-wrap flex justify-center">
        {products?.map((product) => (
          <AuctionCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Page;
