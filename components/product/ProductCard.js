import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaHeart } from "react-icons/fa";
dayjs.extend(relativeTime);
export default function ({ product }) {
  return (
    <div
      key={product?._id}
      className="w-[20rem] h-[30rem]  p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between border border-slate-200 "
    >
      <div className="">
        <div style={{ height: "200px", overflow: "hidden" }}>
          <Image
            src={product?.images?.[0]?.secure_url || "/images/not-found.jpg"}
            width={500}
            height={300}
            alt={product?.title}
          />
        </div>
        <div>
          <h2 className=" text-lg font-semibold text-slate-800 mb-2 h-12">
            {product?.title}
          </h2>
          <h2 className="font-bold text-xl text-slate-800 mb-2 ">
            ${product?.price}
          </h2>
        </div>
        <div>
          {/* <div
            className=" text-xs"
            dangerouslySetInnerHTML={{
              __html:
                product?.description?.length > 160
                  ? `${product?.description?.substring(0, 160)}..`
                  : product?.description,
            }}
          /> */}
        </div>
        <div className=" flex flex-col gap-2 mt-2">
          <div className="flex justify-between">
            <div className="flex gap-1">
              <p className="text-slate-800 text-xs p-1 font-bold bg-violet-100 rounded-md w-auto">
                {product?.category?.name}
              </p>
              <p className="text-slate-800 text-xs p-1 font-bold bg-violet-100 rounded-md w-auto">
                {product?.brand}
              </p>
            </div>

            <small>{dayjs(product?.createdAt).fromNow()}</small>
          </div>
          <div className="">
            {/* <small className="flex gap-2 items-center">
              <FaHeart className="text-slate-800" />
              <p>0 Likes</p>
            </small> */}
          </div>
          <div className="">
            <small>🌟 Stars</small>
          </div>
        </div>
      </div>

      <div className="m-2 flex justify-center items-center">
        <button className="text-white bg-violet-700 px-3 py-1 rounded-md hover:bg-purple-700 w-full h-12">
          Learn More
        </button>
      </div>
    </div>
  );
}
