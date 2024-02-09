"use client";

import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [tags, setTags] = useState([]);
  const [updatingTag, setUpdatingTag] = null;

  const createTag = async () => {
    try {
    } catch (error) {
      toast.error("Error creating tag");
    }
  };
  const fetchTags = async () => {
    try {
    } catch (error) {
      toast.error("Error creating tag");
    }
  };
  const updateTag = async () => {
    try {
    } catch (error) {
      toast.error("Error creating tag");
    }
  };
  const deleteTag = async () => {
    try {
    } catch (error) {
      toast.error("Error creating tag");
    }
  };

  return (
    <TagContext.Provider
      value={{
        name,
        setName,
        parent,
        setParent,
        tags,
        setTags,
        updatingTag,
        setUpdatingTag,
        createTag,
        fetchTags,
        updateTag,
        deleteTag,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export const useTag = () => useContext(TagContext);
