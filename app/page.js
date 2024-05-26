"use client";
import HomePage from "@/app/shop/page";
import { useProduct } from "@/context/product";
import ProductCard from "@/components/product/ProductCard";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home({ searchParams }) {
  const { fetchProducts, products } = useProduct();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      router.push(`http://localhost:3000/dashboard/admin`);
    }
  }, [session, status, router]);

  return (
    <div className="flex flex-col gap-12">
      <div className="relative bg-gradient-to-r from-sky-400 to-violet-700 flex-col py-12 shadow-lg">
        <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
          <div className="mb-8 md:mb-0 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow">
              Summer Sale
            </h1>
            <p className="text-lg md:text-xl text-white mb-2">
              Enjoy discounts on selected items
            </p>
            <p className="text-2xl md:text-5xl text-yellow-300 font-bold">
              GET UP TO 50% OFF
            </p>
          </div>
          <div className="w-full md:w-1/3 relative aspect-video">
            <Image
              src="/images/banner-image.png"
              layout="fill"
              alt="banner image"
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex items-center justify-center mb-8">
          <Link
            href="/shop"
            className="text-2xl md:text-5xl text-yellow-300 font-bold underline hover:text-yellow-400 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <div className="lg:flex-grow flex-col items-center justify-center px-8">
        <p className="text-center text-3xl font-bold mb-8">Recent Products</p>
        <div className="gap-4 flex-wrap flex justify-center">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
