"use client";
import HomePage from "@/app/shop/page";
import { useProduct } from "@/context/product";
import ProductCard from "@/components/product/ProductCard";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }) {
  const { fetchProducts, products } = useProduct();
  console.log();
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="flex flex-col gap-12">
      <div className="relative bg-gradient-to-r from-sky-400 to-violet-700 flex-col">
        <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
          <div className="mb-8 md:mb-0 text-center">
            <h1 className="text-4xl md:text6xl font-bold text-white mb-4">
              Summer Sale
            </h1>
            <p className="text-lg md:text-xl text-white mb-2">
              Enjoy discounts on selected items
            </p>
            <p className="text-2xl md:text-5xl text-yellow-300 font-bold">
              GET UPTO 50% OFF
            </p>
          </div>
          <div className="w-1/3 relative aspect-video">
            <Image
              src="/images/banner-image.png"
              fill
              alt="banner image"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex items-center justify-center mb-8">
          <Link
            href={"/shop"}
            className="text-2xl  md:text-5xl text-yellow-300 font-bold underline "
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="lg:flex-grow flex-col items-center justify-center">
        <p>Recent Products</p>
        <div className="gap-4 flex-wrap flex justify-center">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
