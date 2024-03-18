"use client";

import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [name, setName] = useState("");

  //   For fetching all categories
  const [categories, setCategories] = useState([]);
  //   For update and delete
  const [updatingCategory, setUpdatingCategory] = useState();

  //   To create a category
  const createCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Category Created");
        setName("");
        setCategories([data, ...categories]);
      }
    } catch (error) {
      toast.error("An error occured try again");
    }
  };

  //   Fetching all the categories
  const fetchCategory = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured try again");
    }
  };

  const updateCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatingCategory),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatedCategory = await response.json();
      // Update the categories state with the updated category
      setCategories((prevCategories) =>
        prevCategories.map((c) =>
          c._id === updatedCategory._id ? updatedCategory : c
        )
      );
      // Clear the categoryUpdate state
      setUpdatingCategory(null);
      toast.success("Category updated successfully");
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error occurred while updating the category");
    }
  };
  //   Deleting the categories
  const deleteCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatingCategory._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const deletedCategory = await response.json();
      // Category deleted successfully, now update the categories state
      setCategories((prevCategories) =>
        prevCategories.filter((c) => c._id !== deletedCategory._id)
      );
      setUpdatingCategory(null);
      toast.success("Category deleted successfully");
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error occurred while deleting the category");
    }
  };
  // Clear the categoryUpdate state
  const fetchCategoriesPublic = async () => {
    try {
      const response = await fetch(`${process.env.API}/categories`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        setCategories(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Try again");
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
        fetchCategoriesPublic,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Custom Hook
export const useCategory = () => useContext(CategoryContext);
