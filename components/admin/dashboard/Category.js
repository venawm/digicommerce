"use client";
import React, { useEffect } from "react";
import { useCategory } from "@/context/category";
import { AiOutlineClear } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { IoMdCreate } from "react-icons/io";

const Category = () => {
  const {
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
  } = useCategory();

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className=" w-full flex  flex-col">
      <div className=" w-full flex flex-col gap-4 ">
        <p className=" text-2xl font-bold text-slate-800">Create Categories</p>
        <input
          type="text"
          value={updatingCategory ? updatingCategory.name : name}
          placeholder="Enter Category name"
          onChange={(e) =>
            updatingCategory
              ? setUpdatingCategory({
                  ...updatingCategory,
                  name: e.target.value,
                })
              : setName(e.target.value)
          }
          className="border rounded-lg border-slate-400 py-2 px-4 focus:outline-none focus:border-primary w-2/3"
        />
        <div className="flex gap-4">
          <button
            className={`bg-secondary font-bold w-[10rem] text-primary py-2 px-4 rounded-full hover:bg-slate-700 focus:outline-none focus:shadow-outline-primary flex items-center justify-center gap-2`}
            onClick={(e) => {
              e.preventDefault();
              updatingCategory ? updateCategory() : createCategory();
            }}
          >
            {updatingCategory ? (
              <>
                <RxUpdate /> Update
              </>
            ) : (
              <>
                <IoMdCreate />
                Create
              </>
            )}
          </button>
          {updatingCategory && (
            <div className=" flex gap-2">
              <button
                className={` bg-red-600 font-bold w-1/2 text-primary py-2 px-4 rounded-full hover:bg-secondaryLight focus:outline-none focus:shadow-outline-primary flex items-center justify-center gap-1`}
                onClick={(e) => {
                  e.preventDefault;
                  deleteCategory();
                }}
              >
                <MdDelete />
                Delete
              </button>
              <button
                className={` bg-blueCustom font-bold w-1/2 text-primary py-2 px-4 rounded-full hover:bg-secondaryLight focus:outline-none focus:shadow-outline-primary flex items-center justify-center gap-1`}
                onClick={() => setUpdatingCategory(null)}
              >
                <AiOutlineClear />
                Clear
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-8">
          <p className=" text-2xl font-bold text-slate-800">All Categories</p>
          <div className=" flex gap-2 flex-wrap">
            {categories?.map((c) => {
              return (
                <button
                  className=" min-w-20 bg-slate-50 shadow-sm border-secondary h-8 rounded-md p-2 flex justify-center items-center hover:bg-slate-100"
                  onClick={() => {
                    setUpdatingCategory(c);
                  }}
                >
                  {c?.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
