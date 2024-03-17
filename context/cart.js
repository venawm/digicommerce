"use client";

import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  // coupons
  const [couponCode, setCouponCode] = useState("");
  const [percentOff, setPercentOff] = useState(0);
  const [validCoupon, setValidCoupon] = useState(false);

  // load cart items from local storage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  // save cart items to local storage when cart items change

  // add to cart
  const addToCart = async (product, quantity) => {
    const data = {
      product: product._id,
      quantity: quantity,
      userId: session?.user?._id,
    };
    try {
      const response = await fetch(`${process.env.API}/user/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toast.error("Error while adding to cart");
        return;
      }
      toast.success("Item added to cart sucessfully");
    } catch (error) {
      console.log(error);
    }
    // const existingProduct = cartItems?.find(
    //   (item) => item?._id === product?._id
    // );
    // if (existingProduct) {
    //   const updatedCartItems = cartItems?.map((item) =>
    //     item?._id === product?._id
    //       ? { ...item, quantity: item?.quantity + quantity }
    //       : item
    //   );
    //   setCartItems(updatedCartItems);
    // } else {
    //   setCartItems([...cartItems, { ...product, quantity }]);
    //   const newCartItems = [...cartItems, { ...product, quantity }];
    //   setCartItems(newCartItems);
    //   localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    // }
  };
  const getCart = async () => {
    const userId = session?.user?._id;

    try {
      const response = await fetch(
        `${process.env.API}/user/cart?userId=${userId}`,
        {
          method: "GET",
        }
      );
      // if (!userId) {
      //   setTimeout(getCart, 1000);
      // }
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // remove from cart
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems?.filter(
      (item) => item?._id !== productId
    );
    setCartItems(updatedCartItems);
    // update local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  // update quantity
  const updateQuantity = (product, quantity) => {
    const updatedItems = cartItems?.map((item) =>
      item?._id === product?._id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleCoupon = async (coupon) => {
    try {
      const response = await fetch(`${process.env.API}/stripe/coupon`, {
        method: "POST",
        body: JSON.stringify({ couponCode: coupon }),
      });
      if (!response.ok) {
        setPercentOff(0);
        setValidCoupon(false);
        toast.error("Invalid coupon code");
        return;
      } else {
        const data = await response.json();
        setPercentOff(data.percent_off);
        setValidCoupon(true);
        toast.success(`${data?.name} applied successfully`);
      }
    } catch (err) {
      console.log(err);
      setPercentOff(0);
      setValidCoupon(false);
      toast.error("Invalid coupon code");
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        couponCode,
        setCouponCode,
        handleCoupon,
        percentOff,
        validCoupon,
        clearCart,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
