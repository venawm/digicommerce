"Use Client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useProduct } from "@/context/product";
import { useCategory } from "@/context/category";
import { useTag } from "@/context/tag";
import { ImCross } from "react-icons/im";
import { FaFileUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateProduct = () => {
  const {
    product,
    setProduct,
    updatingProduct,
    setUpdatingProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploading,
    setUploading,
    uploadImages,
    deleteImage,
  } = useProduct();
  const { categories, fetchCategory } = useCategory();
  const { tags, fetchTags } = useTag();
  const [isBidding, setIsBidding] = useState(false); // State to manage bidding status
  const [bidEndDate, setBidEndDate] = useState(""); // State to manage bid end date
  const [minBidAmount, setMinBidAmount] = useState(""); // State to manage minimum bid amount
  const [selectedDate, setSelectedDate] = useState(null);

  const dateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = new Date(date).toISOString();
    console.log(formattedDate);
    setProduct({ ...product, bidEndTime: formattedDate });
  };

  const clearProduct = () => {
    setUpdatingProduct(null);
    setProduct({
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
  };

  // Image Preview
  const imagePreviewes = updatingProduct
    ? updatingProduct?.images ?? []
    : product?.images ?? [];

  useEffect(() => {
    fetchCategory();
    fetchTags();
    console.log(product);
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-4">
        <p className=" text-2xl font-bold text-slate-800">
          {updatingProduct ? "Update" : "Create"} Product
        </p>
        <input
          type="text"
          className="border rounded-lg border-slate-300 py-2 px-4 focus:outline-none focus:border-primary w-2/3"
          placeholder="Enter the title of your product "
          value={updatingProduct ? updatingProduct?.title : product?.title}
          onChange={(e) => {
            updatingProduct
              ? setUpdatingProduct({
                  ...updatingProduct,
                  title: e.target.value,
                })
              : setProduct({ ...product, title: e.target.value });
          }}
        />

        <input
          className="border rounded-lg border-slate-300 py-2 px-4 focus:outline-none focus:border-primary w-2/3"
          type="number"
          placeholder="Price"
          min={1}
          value={updatingProduct ? updatingProduct?.price : product?.price}
          onChange={(e) =>
            updatingProduct
              ? setUpdatingProduct({
                  ...updatingProduct,
                  price: e.target.value,
                })
              : setProduct({ ...product, price: e.target.value })
          }
        />
        <input
          className="border rounded-lg border-slate-300 py-2 px-4 focus:outline-none focus:border-primary w-2/3"
          type="text"
          placeholder="Color of the product "
          value={updatingProduct ? updatingProduct?.color : product?.color}
          onChange={(e) =>
            updatingProduct
              ? setUpdatingProduct({
                  ...updatingProduct,
                  color: e.target.value,
                })
              : setProduct({ ...product, color: e.target.value })
          }
        />
        <input
          className="border rounded-lg border-slate-300 py-2 px-4 focus:outline-none focus:border-primary w-2/3"
          type="text"
          placeholder="Brand of the product"
          value={updatingProduct ? updatingProduct?.brand : product?.brand}
          onChange={(e) =>
            updatingProduct
              ? setUpdatingProduct({
                  ...updatingProduct,
                  brand: e.target.value,
                })
              : setProduct({ ...product, brand: e.target.value })
          }
        />
        <input
          className="border rounded-lg border-slate-300 py-2 px-4 focus:outline-none focus:border-primary w-2/3"
          type="number"
          placeholder="Stock"
          min={1}
          value={updatingProduct ? updatingProduct?.stock : product?.stock}
          onChange={(e) =>
            updatingProduct
              ? setUpdatingProduct({
                  ...updatingProduct,
                  stock: e.target.value,
                })
              : setProduct({ ...product, stock: e.target.value })
          }
        />
        <select
          name="category"
          className="w-2/3 h-12 bg-slate-100 rounded-md p-2"
          onChange={(e) => {
            const categoryId = e.target.value;
            const categoryName =
              e.target.options[e.target.selectedIndex].getAttribute("name");
            const category = categoryId
              ? {
                  _id: categoryId,
                  name: categoryName,
                }
              : null;
            updatingProduct
              ? setUpdatingProduct({
                  ...updatingProduct,
                  category,
                })
              : setProduct({ ...product, category });
          }}
          value={
            updatingProduct
              ? updatingProduct?.category?._id
              : product?.category?._id
          }
        >
          <option>Select a category</option>
          {categories?.map((c) => {
            return (
              <option key={c._id} value={c._id} name={c.name}>
                {c.name}
              </option>
            );
          })}
        </select>
        {/* Bidding button */}

        <button
          className="bg-slate-700 text-white font-bold py-2 px-4 rounded-full hover:bg-primary-dark w-2/3"
          onClick={() => {
            setIsBidding(!isBidding);
            setProduct({ ...product, bid: !isBidding });
          }}
        >
          Enable Bidding
        </button>

        {/* Bidding section */}
        {isBidding && (
          <div>
            <label>Bid End Time:</label>

            <ReactDatePicker selected={selectedDate} onChange={dateChange} />
            <input
              type="number"
              className="border rounded-lg border-slate-300 py-2 px-4 focus:outline-none focus:border-primary w-2/3"
              placeholder="Enter minimum bid amount"
              value={minBidAmount}
              onChange={(e) => {
                setMinBidAmount(e.target.value);
                setProduct({ ...product, minimumBidIncrement: e.target.value });
              }}
            />
          </div>
        )}
        <textarea
          className="block p-2.5 w-2/3 text-sm text-slate-800 bg-gray-50 rounded-lg border border-gray-300 "
          cols={10}
          rows={5}
          placeholder="Description for product"
          value={
            updatingProduct
              ? updatingProduct?.description
              : product?.description
          }
          onChange={(e) =>
            updatingProduct
              ? setUpdatingProduct({
                  ...updatingProduct,
                  description: e.target.value,
                })
              : setProduct({ ...product, description: e.target.value })
          }
        ></textarea>
        <p className=" text-l font-bold text-slate-800">Tags</p>
        <div className="flex gap-4 flex-wrap">
          {tags
            ?.filter(
              (ft) =>
                ft?.parentCategory ===
                (updatingProduct?.category?._id || product?.category?._id)
            )
            ?.map((tag) => (
              <div
                key={tag?._id}
                className="border border-slate-200  p-1 rounded-md flex justify-center items-center gap-2 min-w-20"
              >
                <input
                  className="accent-slate-800"
                  type="checkbox"
                  id={tag?._id}
                  value={tag?._id}
                  onChange={(e) => {
                    const tagId = e.target.value;
                    const tagName = tag?.name;

                    let selectedTags = updatingProduct
                      ? [...(updatingProduct?.tags ?? [])]
                      : [...(product?.tags ?? [])];

                    if (e.target.checked) {
                      selectedTags.push({ _id: tagId, name: tagName });
                    } else {
                      selectedTags = selectedTags.filter(
                        (t) => t._id !== tagId
                      );
                    }

                    if (updatingProduct) {
                      setUpdatingProduct({
                        ...updatingProduct,
                        tags: selectedTags,
                      });
                    } else {
                      setProduct({ ...product, tags: selectedTags });
                    }
                  }}
                />
                <label for={tag?._id}>{tag?.name}</label>
              </div>
            ))}
        </div>
        <div>
          <label
            className={`border border-slate-800  font-bold w-[15rem] text-secondary py-2 px-4 rounded-full hover:bg-slate-600 focus:outline-none focus:shadow-outline-primary flex items-center justify-center gap-2 hover:text-white`}
          >
            {" "}
            <FaFileUpload />
            {uploading ? "Processing" : "Upload"} Images
            <input
              type="file"
              multiple
              hidden
              accept="images/*"
              onChange={uploadImages}
              disabled={uploading}
            />
          </label>
        </div>
        <div className=" mt-4 mb-4 flex gap-8 w-full">
          {imagePreviewes?.map((img) => {
            return (
              <div
                key={img.public_id}
                className=" w-20 h-20 relative bg-cover flex"
              >
                <Image src={img?.secure_url} fill className=" rounded-md" />
                <br />
                <div className=" cursor-pointer relative top-[-15%] right-[-100%]">
                  <ImCross
                    className=" text-slate-800 hover:text-red-600"
                    onClick={() => {
                      deleteImage(img?.public_id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" flex p-1 gap-8">
        <button
          className={`bg-secondary font-bold w-[10rem] text-primary py-2 px-4 rounded-full hover:bg-slate-700 focus:outline-none focus:shadow-outline-primary flex items-center justify-center gap-2`}
          onClick={(e) => {
            updatingProduct ? updateProduct() : createProduct();
          }}
        >
          {updatingProduct ? "Update" : "Create"}
        </button>
        {updatingProduct && (
          <>
            <button
              className={`bg-red-600 font-bold w-[10rem] text-primary py-2 px-4 rounded-full hover:bg-slate-700 focus:outline-none focus:shadow-outline-primary flex items-center justify-center gap-2`}
              onClick={() => {
                deleteProduct();
                clearProduct();
              }}
            >
              Delete
            </button>
            <button
              className={`bg-blue-700 font-bold w-[10rem] text-primary py-2 px-4 rounded-full hover:bg-slate-700 focus:outline-none focus:shadow-outline-primary flex items-center justify-center gap-2`}
              onClick={() => {
                clearProduct();
              }}
            >
              Clear
            </button>
          </>
        )}
      </div>
      {/* {JSON.stringify(product)} */}
    </div>
  );
};

export default CreateProduct;
