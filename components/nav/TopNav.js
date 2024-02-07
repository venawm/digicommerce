"use client";
// Import missing dependencies
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { ImCross } from "react-icons/im";
import { CiShoppingCart } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

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
              className=" absolute w-1/6 h-1/3 left-[66%] top-10 border-2 bg-slate-50 shadow-sm border-primary z-50 rounded-md "
              onClick={(e) => e.stopPropagation()}
            >
              {" "}
              <p
                className="text-secondary font-bold px-4 py-2 transition-all hover:bg-dark hover:text-white rounded text-center cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Logout
              </p>
              <Link href="/register" className=" font-bold">
                <p className="text-secondary font-bold px-4 py-2 transition-all hover:bg-dark hover:text-white rounded text-center cursor-pointer">
                  Profile
                </p>
              </Link>
              <Link
                href={`/dashboard/${
                  data.user.role == "admin" ? "admin" : "user"
                }`}
                className=" font-bold"
              >
                <p className="text-secondary font-bold px-4 py-2 transition-all hover:bg-dark hover:text-white rounded text-center cursor-pointer">
                  Dashboard
                </p>
              </Link>
            </div>
          </div>
        </>
      )}
      <div className=" max-w-screen-2xl mx-auto px-4 flex items-center h-full justify-between">
        <h1 className="text-3xl font-bold text-primary">Digicommerce</h1>
        <form className="hidden lg:inline-flex w-1/2  ">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
            <input
              type="search"
              id="default-search"
              class="block w-full h-10 p-4 ps-10 text-sm text-gray-900 border border-secondary rounded-xl bg-gray-50 outline-none"
              placeholder="Search"
              required
            ></input>
            <button
              type="submit"
              class="text-primary w-12 h-8 absolute end-2 bottom-[0.25rem] bg-[#FFE1D2] hover:bg-secondaryLight focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-1"
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-secondary hover:text-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
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
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-gray-200 animate-spin dark:text-slate-50 fill-secondary"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
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
          <form className=" inline-flex w-full  ">
            <label class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
              <input
                type="search"
                id="default-search"
                class="block w-full h-10 p-4 ps-10 text-sm text-gray-900 border border-secondary rounded-xl bg-gray-50 outline-none"
                placeholder="Search"
                required
              ></input>
              <button
                type="submit"
                class="text-primary w-12 h-8 absolute end-2 bottom-[0.25rem] bg-[#FFE1D2] hover:bg-secondaryLight focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-secondary hover:text-primary"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>
          <Link href="/login" className="text-primary font-bold">
            <p className="block py-2 text-center hover:bg-secondaryDark hover:text-primary cursor-pointer">
              Login
            </p>
          </Link>
          <Link href="/register" className="text-primary font-bold">
            <p className="block py-2 text-center hover:bg-secondaryDark hover:text-primary cursor-pointer">
              Register
            </p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
