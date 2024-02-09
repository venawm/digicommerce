"use client";
import React from "react";
import { useTag } from "@/context/tag";

const Tag = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className=" text-2xl font-bold text-slate-800">Create Tags</p>
      </div>
    </div>
  );
};

export default Tag;
