"use client";
import React, { useEffect } from "react";
import { useTag } from "@/context/tag";
import { useCategory } from "@/context/category";

const Tag = () => {
  const {
    name,
    setName,
    parentCategory,
    setParentCategory,
    updatingTag,
    setUpdatingTag,
    createTag,
    updateTag,
    deleteTag,
  } = useTag();
  const { categories, fetchCategory } = useCategory();

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex flex-col gap-4">
        <p className=" text-2xl font-bold text-slate-800">Create Tags</p>
        <input
          type="text"
          value={updatingTag ? updatingTag?.name : name}
          placeholder="Enter Tag name"
          onChange={(e) =>
            updatingTag
              ? setUpdatingTag({
                  ...updatingTag,
                  name: e.target.value,
                })
              : setName(e.target.value)
          }
          className="border rounded-lg border-slate-300 py-2 px-4 focus:outline-none focus:border-primary w-2/3"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label className=" text-2xl font-bold text-slate-800">
          Parent Category
        </label>
        <select
          name="category"
          className="w-2/3 h-12 bg-slate-100 rounded-md p-2"
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option>Select a category</option>
          {categories?.map((c) => {
            return (
              <option
                key={c._id}
                value={c._id}
                selected={
                  c?._id === parentCategory ||
                  (updatingTag && c?._id === updatingTag.parentCategory)
                }
              >
                {c.name}
              </option>
            );
          })}
        </select>
        <button
          className={`bg-secondary font-bold w-[10rem] text-primary py-2 px-4 rounded-full hover:bg-slate-700 focus:outline-none focus:shadow-outline-primary flex items-center justify-center gap-2`}
          onClick={(e) => {
            createTag();
          }}
        >
          Create tag
        </button>
      </div>
    </div>
  );
};

export default Tag;
