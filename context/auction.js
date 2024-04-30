"use client";

import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const auctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const router = useRouter();

  const fetchProducts = async (page = 1) => {
    try {
      const response = await fetch(
        `${process.env.API}/product/auctions?page=${page}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error);
      } else {
        setProducts(data?.products);
        setCurrentPage(data?.currentPage);
        setTotalPage(data?.totalProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
