"use client";

import { GlobalContext } from "@/context";
import { useContext } from "react";
import { toast } from "react-toastify";
import ComponentLabelLoader from "../loader/componentLabel";
import { addToCart } from "@/services/cart/cart";
import Notification from "../notification/notication";

export default function CommonDetail({ item }) {
  const {
    setcomponentLabelLoader,
    setShowCartModal,
    user,
    componentLabelLoader,
  } = useContext(GlobalContext);

  const handleAddToCart = async (getItem) => {
    setcomponentLabelLoader({ loading: true, id: "" });

    const response = await addToCart({
      productID: getItem._id,
      userID: user._id,
    });

    if (response.success) {
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setcomponentLabelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setcomponentLabelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  };

  return (
    <div className=" py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <img
                src={item.imageUrl}
                loading="lazy"
                className="h-full w-full object-cover object-center"
                alt={item.name}
              />

              <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                sale
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.imageUrl}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.imageUrl}
                  loading="lazy"
                  alt="Photo by Himanshu Dewangan"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <h2 className="text-2xl font-bold dark:text-white text-gray-800 lg:text-3xl">
                {item && item.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center md:mb-10">
              <div className="-ml-1 flex gap-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              <span className="ml-2 text-sm text-gray-500">4.2</span>

              <a
                href="#"
                className="ml-4 text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
              >
                view all 47 reviews
              </a>
            </div>

            <div className="mb-4 md:mb-6">
              <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
                Color
              </span>

              <div className="flex flex-wrap gap-2">
                <span className="h-8 w-8 rounded-full border bg-gray-800 ring-2 ring-gray-800 ring-offset-1 transition duration-100"></span>
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border bg-gray-500 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                ></button>
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border bg-gray-200 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                ></button>
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border bg-white ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                ></button>
              </div>
            </div>

            <div className="mb-8 md:mb-10">
              <span className="mb-3 inline-block text-sm font-semibold text-gray-500 md:text-base">
                Size
              </span>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                >
                  XS
                </button>
                <button
                  type="button"
                  className="flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                >
                  S
                </button>
                <span className="flex h-8 w-12 cursor-default items-center justify-center rounded-md border border-indigo-500 bg-indigo-500 text-center text-sm font-semibold text-white">
                  M
                </span>
                <button
                  type="button"
                  className="flex h-8 w-12 items-center justify-center rounded-md border bg-white text-center text-sm font-semibold text-gray-800 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                >
                  L
                </button>
                <span className="flex h-8 w-12 cursor-not-allowed items-center justify-center rounded-md border border-transparent bg-white text-center text-sm font-semibold text-gray-400">
                  XL
                </span>
              </div>
            </div>

            <div className=" items-center flex space-x-5 py-4">
              <h1
                className={`text-3xl font-bold ${
                  item.onSale === "yes"
                    ? "line-through text-red-500 text-xl"
                    : ""
                }  `}
              >
                ${item && item.price}
              </h1>
              {item.onSale === "yes" ? (
                <h1 className={`text-3xl  font-semibold`}>
                  {`$${
                    item.price - item.price * (item.priceDrop / 100).toFixed(2)
                  }`}
                </h1>
              ) : null}

              {item.onSale === "yes" ? (
                <p className={`text-sm  font-semibold`}>
                  {`-(${item.priceDrop}%off)`}
                </p>
              ) : null}
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>

              <span className="text-sm">2-4 day shipping</span>
            </div>
            <button
              type="button"
              className=" mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white"
              onClick={() => handleAddToCart(item)}
            >
              {componentLabelLoader && componentLabelLoader.loading ? (
                <ComponentLabelLoader
                  text={"Adding to Cart"}
                  color={"#FFFFF"}
                  loading={componentLabelLoader && componentLabelLoader.loading}
                />
              ) : (
                "  Add To Cart"
              )}
            </button>

            <div className="mt-10 md:mt-16 lg:mt-20">
              <div className="mb-3 text-lg dark:text-white font-semibold text-gray-800">
                Description
              </div>

              <p className="text-gray-500">{item && item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
