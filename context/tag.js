"use client";

import { createContext, useState, useContext } from "react";
import toast from "react-hot-toast";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [tags, setTags] = useState([]);
  const [updatingTag, setUpdatingTag] = useState(null);

  // Create Tag
  const createTag = async () => {
    try {
      const response = await fetch(`${process.env.API}/ admin / tag`, {
        method: "POST",
        headers: { "Content-type": "application/json " },
        body: JSON.stringify({ name, parent: parent }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Tag created");
        setName("");
        setParent("");
        setTags({ data, ...tags });
      }
    } catch (error) {
      toast.error("Error creating tag");
    }
  };

  // Fetch Tags
  const fetchTags = async () => {
    try {
      const response = await fetch(`${process.env.API}/ admin / tag`, {
        method: "GET",
        headers: { "Content-type": "application/json " },
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data);
      } else {
        setTags(data);
      }
    } catch (error) {
      toast.error("Error creating tag");
    }
  };

  // Update Tag
  const updateTag = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/ admin/tag${updatingTag?._id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json " },
          body: JSON.stringify(updatingTag),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Tag Updated");
        setUpdatingTag(null);
        setParent("");
        setTags((prev) => prev?.map((e) => (tags._id == data._id ? data : t)));
      }
    } catch (error) {
      toast.error("Error creating tag");
    }
  };

  // Delete Tag
  const deleteTag = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/tag/${updatingTag?._id}`,
        {
          method: "DELETE",
          headers: { "Content-type": "application/json " },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data);
      } else {
        toast.success("Tag deleted");
        setUpdatingTag(null);
        setParent("");
        setTags((prev) =>
          prev?.filter((e) => (tags._id !== data._id ? data : t))
        );
      }
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
