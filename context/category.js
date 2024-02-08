"use client";

import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  // to create category
  const [name, setName] = useState("");

  //   for fetching all categories
  const [categories, setCategories] = useState([]);
  //   for update and delete
  const [updatingCategory, setUpdatingCategory] = useState(null);

  //   to create a category
  const createCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        const data = response.json;
        toast.error(data.error);
      } else {
        toast.success("Category Created");
        setName("");
        setCategories([data, ...categories]);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured try again");
    }
  };

  //   Fetching all the categories
  const fetchCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured try again");
    }
  };

  //   Updating the categories
  const updateCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category.${updatingCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success("Category updated");
        setUpdatingCategory(null);
        setCategories(
          categories.map((category) => {
            category._id === updateCategory._id ? data : category;
          })
        );
        setUpdatingCategory(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured try again");
    }
  };

  //   Deleting the categories
  const deleteCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category.${updatingCategory._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success("Category Deleted");
        setCategories(
          categories.filter((category) => {
            category._id !== updatingCategory._id;
          })
        );
        setUpdatingCategory(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured try again");
    }
  };

  //   Return the context
  return (
    <CategoryContext.Provider
      value={{
        name,
        setName,
        categories,
        setCategories,
        createCategory,
        updateCategory,
        fetchCategory,
        deleteCategory,
        updatingCategory,
        setUpdatingCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Custom Hook
export const useCategory = () => useContext(CategoryContext);
