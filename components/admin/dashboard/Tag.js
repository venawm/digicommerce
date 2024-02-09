"use client";
import React, { useEffect } from "react";
import { useTag } from "@/context/tag";
import { useCategory } from "@/context/category";
import { LiaTagSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { IoMdCreate } from "react-icons/io";
import { AiOutlineClear } from "react-icons/ai";

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
    tags,
    fetchTags,
  } = useTag();
  console.log(tags);
  const { categories, fetchCategory } = useCategory();

  useEffect(() => {
    fetchCategory();
    fetchTags();
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
          onChange={(e) =>
            updatingTag
              ? setUpdatingTag({
                  ...updatingTag,
                  parentCategory: e.target.value,
                })
              : setParentCategory(e.target.value)
          }
        >
          <option>Select a category</option>
          {categories?.map((c) => {
            return (
              <option
                key={c._id}
                value={c._id}
                selected={
                  c?._id === updatingTag?.parentCategory ||
                  c?._id === parentCategory
                }
              >
                {c.name}
              </option>
            );
          })}
        </select>
        <div className="flex gap-4">
          <button
            className={`bg-secondary font-bold w-[10rem] text-primary py-2 px-4 rounded-full hover:bg-slate-700 focus:outline-none focus:shadow-outline-primary flex items-center justify-center gap-2`}
            onClick={(e) => {
              // e.preventDefault();
              updatingTag ? updateTag() : createTag();
            }}
          >
            {updatingTag ? (
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
          {updatingTag && (
            <div className=" flex  gap-2">
              <button
                className={` bg-red-600 font-bold  text-primary py-2 px-4 rounded-full hover:bg-secondaryLight focus:outline-none focus:shadow-outline-primary flex items-center justify-center gap-1`}
                onClick={(e) => {
                  e.preventDefault;
                  deleteTag();
                }}
              >
                <MdDelete />
                Delete
              </button>
              <button
                className={` bg-blueCustom font-bold  text-primary py-2 px-4 rounded-full hover:bg-secondaryLight focus:outline-none focus:shadow-outline-primary flex items-center justify-center gap-1`}
                onClick={() => setUpdatingTag(null)}
              >
                <AiOutlineClear />
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold text-slate-800">Tags</p>
        <div className="flex w-full flex-wrap gap-4">
          {tags?.map((t) => {
            return (
              <button
                className=" min-w-20 bg-slate-100 shadow-sm border-secondary h-8 rounded-md p-2 flex justify-center items-center hover:bg-slate-100"
                onClick={() => {
                  setUpdatingTag(t);
                }}
              >
                <LiaTagSolid className="text-xl" />
                {t?.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tag;
