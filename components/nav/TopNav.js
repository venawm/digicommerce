"use client";
// Import missing dependencies
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { ImCross } from "react-icons/im";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TopNav = () => {
  const { data, status } = useSession();
  const [mentStatus, setMenuStatus] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  console.log(mentStatus);
  console.log(data);

  return (
    <nav className="w-full h-16 bg-secondary px-3 lg:px-24">
      {profileMenu && (
        <>
          <div
            className=" w-screen h-screen absolute "
            onClick={() => {
              setProfileMenu(!profileMenu);
            }}
          >
            <div
              className=" absolute w-1/6 h-1/3 left-[66%] top-10 border-2 text-slate-800 bg-white shadow-sm border-primary z-50 rounded-md hover:text-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {" "}
              <p className=" font-bold px-4 py-2 h-12 border-b border-slate-100 transition-all text-center cursor-pointer">
                {data.user.email}
              </p>
              <p
                className="font-bold px-4 py-2 transition-all hover:bg-dark  rounded text-center cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Logout
              </p>
              <Link href="/register" className=" font-bold">
                <p className=" font-bold px-4 py-2 transition-all hover:bg-dark  rounded text-center cursor-pointer">
                  Profile
                </p>
              </Link>
              <Link
                href={`/dashboard/${
                  data.user.role == "admin" ? "admin" : "user"
                }`}
                className=" font-bold"
              >
                <p className=" font-bold px-4 py-2 transition-all hover:bg-dark rounded text-center cursor-pointer">
                  Dashboard
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
      <div className=" max-w-screen-2xl mx-auto px-4 flex items-center h-full justify-between">
        <Link
          className="text-3xl font-bold text-primary lg:flex md:flex xsm:hidden"
          href="/"
        >
          Digicommerce
        </Link>
        <Link
          className="text-3xl font-bold text-primary lg:hidden md:hidden xsm:flex"
          href="/"
        >
          D
        </Link>
        <form className="lg:inline-flex w-1/2  ">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
            <input
              type="search"
              id="default-search"
              className="block w-full h-10 p-4 ps-10 text-sm text-gray-900 border border-secondary rounded-xl bg-gray-50 outline-none"
              placeholder="Search"
              required
            ></input>
            <button
              type="submit"
              className=" text-secondaryDark w-12 h-8 absolute end-2 bottom-[0.25rem] bg-[#FFE1D2] hover:bg-secondaryLight hover:text-primary rounded-lg text-xl px-4 py-1"
            >
              <CiSearch />
            </button>
          </div>
        </form>
        <ul className="hidden lg:inline-flex gap-4 items-center text-primary">
          <div>
            <CiShoppingCart className="text-3xl hover:cursor-pointer" />
          </div>
          {status === "authenticated" ? (
            <>
              <div className="w-12 h-12 border-primary border-2 rounded-full flex justify-center items-center hover:cursor-pointer">
                {data.user.image ? (
                  <>
                    <Image
                      src={data.user.image}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="bg-cover w-full h-auto rounded-full"
                      onClick={() => {
                        setProfileMenu(!profileMenu);
                      }}
                    />
                  </>
                ) : (
                  <>
                    <FaUser
                      className="text-3xl"
                      onClick={() => {
                        setProfileMenu(!profileMenu);
                      }}
                    />
                  </>
                )}
              </div>
            </>
          ) : status === "loading" ? (
            <>
              <AiOutlineLoading3Quarters className=" text-primary text-3xl animate-spin" />
            </>
          ) : (
            <div className="flex gap-4">
              <Link href="/login" className="text-primary font-bold">
                <p className="px-4 py-2 transition-all hover:bg-secondaryDark hover:text-primary rounded text-center cursor-pointer">
                  Login
                </p>
              </Link>
              <Link href="/register" className="text-primary font-bold">
                <p className="px-4 py-2 transition-all hover:bg-secondaryDark hover:text-primary rounded text-center cursor-pointer">
                  Register
                </p>
              </Link>
            </div>
          )}
        </ul>
        <div
          className="inline-flex lg:hidden text-primary"
          onClick={() => {
            setMenuStatus((prev) => !prev);
          }}
        >
          {!mentStatus ? (
            <FiMenu className="text-3xl" />
          ) : (
            <>
              <ImCross className="text-2xl" />
            </>
          )}
        </div>
      </div>
      {mentStatus && (
        <div className="lg:hidden absolute top-16 inset-x-0 bg-secondary p-4">
          {/* Mobile menu items go here */}
          {status === "authenticated" ? (
            <>
              <div className=" flex gap-4  items-center">
                <div className="w-12 h-12 border-primary border-2 rounded-full flex justify-center items-center hover:cursor-pointer">
                  {data.user.image ? (
                    <>
                      <Image
                        src={data.user.image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="bg-cover w-full h-auto rounded-full"
                      />
                    </>
                  ) : (
                    <>
                      <FaUser className="text-3xl text-primary" />
                    </>
                  )}
                </div>
                <p className=" text-xl font-bold text-primary">
                  {data.user?.name}
                </p>
              </div>
            </>
          ) : status === "loading" ? (
            <>
              <AiOutlineLoading3Quarters className=" text-primary text-3xl animate-spin" />
            </>
          ) : (
            <div className="flex gap-4">
              <Link href="/login" className="text-primary font-bold">
                <p className="px-4 py-2 transition-all hover:bg-secondaryDark hover:text-primary rounded text-center cursor-pointer">
                  Login
                </p>
              </Link>
              <Link href="/register" className="text-primary font-bold">
                <p className="px-4 py-2 transition-all hover:bg-secondaryDark hover:text-primary rounded text-center cursor-pointer">
                  Register
                </p>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default TopNav;
