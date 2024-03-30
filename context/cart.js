"use client";

import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Session data for cart
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  // coupons
  const [couponCode, setCouponCode] = useState("");
  const [percentOff, setPercentOff] = useState(0);
  const [validCoupon, setValidCoupon] = useState(false);

  // Add items to cart
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
      getCart();
      toast.success("Item added to cart sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Items from cart
  const getCart = async () => {
    const userId = session?.user?._id;

    try {
      const response = await fetch(
        `${process.env.API}/user/cart?userId=${userId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        // toast.error("Error fetching items from cart ");
        return;
      }
      const data = await response.json();
      console.log(data);
      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    const data = { productId: productId, userId: session?.user?._id };
    try {
      const response = await fetch(`${process.env.API}/user/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toast.error("Error while removing from cart");
        return;
      }
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Update the quantiy of product in cart
  const updateQuantity = async (quantity, product) => {
    const updatedItems = cartItems?.map((item) =>
      item?._id === product?._id ? { ...item, quantity } : item
    );

    const data = {
      quantity: quantity,
      productId: product?._id,
    };
    try {
      const response = await fetch(`${process.env.API}/user/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toast.error("Error while adding to cart");
        return;
      }
      setCartItems(updatedItems);
      getCart();
    } catch (error) {
      console.log(error);
    }
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

  const clearCart = async () => {
    const data = { userId: session?.user?._id };
    try {
      const response = await fetch(`${process.env.API}/user/cart/clear`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        toast.error("Error while removing from cart");
        return;
      }
      getCart();
    } catch (error) {
      console.log(error);
    }
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
