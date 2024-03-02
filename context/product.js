"use client";

import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Resizer from "react-image-file-resizer";
import { resolve } from "styled-jsx/css";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    color: "",
    brand: "",
    stock: "",
    category: null,
    description: "",
    tags: [],
    images: [],
  });
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  // Rating system
  const [currentRating, setCurrentRating] = useState(0);
  const [comment, setComment] = useState("");

  const router = useRouter();

  // Upload Images
  const uploadImages = (e) => {
    const files = e.target.files;

    let allUploadedFiles = updatingProduct
      ? updatingProduct?.images || []
      : product
      ? product?.images || []
      : [];

    if (files) {
      // check if the total combined images exceed 4
      const totalImages = allUploadedFiles?.length + files?.length;
      if (totalImages > 4) {
        toast.error("You can upload maximum 4 images");
        return;
      }

      setUploading(true);
      const uploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const promise = new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            1280,
            720,
            "JPEG",
            100,
            0,
            (uri) => {
              fetch(`${process.env.API}/admin/upload/image`, {
                method: "POST",
                body: JSON.stringify({ image: uri }),
              })
                .then((response) => response.json())
                .then((data) => {
                  allUploadedFiles.unshift(data);
                  resolve();
                })
                .catch((err) => {
                  console.log("image upload err => ", err);
                  resolve();
                });
            },
            "base64"
          );
        });
        uploadPromises.push(promise);
      }

      Promise.all(uploadPromises)
        .then(() => {
          updatingProduct
            ? setUpdatingProduct({
                ...updatingProduct,
                images: allUploadedFiles,
              })
            : setProduct({ ...product, images: allUploadedFiles });
          setUploading(false);
        })
        .catch((err) => {
          console.log("image upload err => ", err);
          setUploading(false);
        });
    }
  };

  const deleteImage = (public_id) => {
    setUploading(true);
    fetch(`${process.env.API}/admin/upload/image`, {
      method: "PUT",
      body: JSON.stringify({ public_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredImages = updatingProduct
          ? updatingProduct?.images?.filter(
              (image) => image?.public_id !== public_id
            )
          : product?.images?.filter((image) => image?.public_id !== public_id);

        updatingProduct
          ? setUpdatingProduct({ ...updatingProduct, images: filteredImages })
          : setProduct({ ...product, images: filteredImages });
      })
      .catch((err) => {
        console.log("image delete err => ", err);
      })
      .finally(() => setUploading(false));
  };

  //   Create Product

  const createProduct = async () => {
    try {
      // Validation checks
      const errors = [];

      // Check if title is empty
      if (product.title === "") {
        errors.push("Title is required");
      }

      // Check if price is empty or not a positive number
      if (!product.price || isNaN(product.price) || product.price <= 0) {
        errors.push("Price must be a positive number");
      }

      // Check if color is empty
      if (!product.color.trim()) {
        errors.push("Color is required");
      }

      // Check if brand is empty
      if (!product.brand.trim()) {
        errors.push("Brand is required");
      }

      // Check if stock is empty or not a positive number
      if (!product.stock || isNaN(product.stock) || product.stock <= 0) {
        errors.push("Stock must be a positive number");
      }

      // Check if category is not selected
      if (!product.category) {
        errors.push("Category is required");
      }

      // Check if description is empty
      if (!product.description.trim()) {
        errors.push("Description is required");
      }

      // Check if at least one tag is selected
      if (!product.tags || product.tags.length === 0) {
        errors.push("At least one tag must be selected");
      }

      // If there are validation errors, toast each error and stop the function
      if (errors.length > 0) {
        console.log("hehe");
        errors.forEach((error) => {
          toast.error(error);
        });
        return;
      }

      // If there are no validation errors, proceed with posting the product
      console.log("heh");
      const response = await fetch(`${process.env.API}/admin/product`, {
        method: "POST",
        body: JSON.stringify(product),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success("Product Created");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   Fetch Products
  const fetchProducts = async (page = 1) => {
    try {
      const response = await fetch(`${process.env.API}/product?page=${page}`, {
        method: "GET",
      });

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

  //   Update Procucts
  const updateProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/${updatingProduct?._id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatingProduct),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error);
      } else {
        toast.success("Product updated sucessfully");
        router.push("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/${updatingProduct?._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      if (!response) {
        toast.error(data.error);
      } else {
        toast.success("Product deleted sucessfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
        products,
        setProducts,
        currentPage,
        setCurrentPage,
        totalPage,
        setTotalPage,
        updatingProduct,
        setUpdatingProduct,
        uploading,
        setUploading,
        uploadImages,
        deleteImage,
        createProduct,
        fetchProducts,
        updateProduct,
        deleteProduct,
        currentRating,
        setCurrentRating,
        comment,
        setComment,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
