"use client";

import { GlobalContext } from "@/context";
import { fetchAllAddresses } from "@/services/address/address";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const Checkout = () => {
  const { cartitems, user, addresses, setAddresses } =
    useContext(GlobalContext);

  const router = useRouter();

  const getAllAddresses = async () => {
    const response = await fetchAllAddresses(user?._id);
    if (response.success) {
      setAddresses(response.data);
    }
  };
  useEffect(() => {
    if (user !== null) {
      getAllAddresses();
    }
  }, [user]);
  console.log(addresses);
  return (
    <div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="font-medium text-xl">Cart Summary</p>
          <div className=" mt-8 space-y-3 rounded-lg border px-2 py-4  sm:px-5">
            {cartitems && cartitems.length ? (
              cartitems.map((item) => (
                <div
                  key={item._id}
                  className=" flex flex-col rounded-lg sm:flex-row"
                >
                  <img
                    src={item && item.productID && item.productID.imageUrl}
                    alt="cart product"
                    className="m-2 h-24 w-36 rounded-md border object-cover object-center"
                  />
                  <div className="flex w-full flex-col px-4  py-4">
                    <span className=" font-bold">
                      {item && item.productID && item.productID.name}
                    </span>
                    <span className=" font-semibold">
                      ${item && item.productID && item.productID.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>Your cart is Empty</div>
            )}
          </div>
        </div>
        <div className=" mt-10 px-4 pt-8 lg:mt-0">
          <p className=" text-xl font-medium">Shipping address details</p>
          <p className=" text-xl font-bold dark:text-gray-400">
            Complete your order by selecting address below
          </p>
          <div className="w-full mt-6 mr-0 ml-0 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  key={item._id}
                  className=" border p-6 rounded-lg tracking-normal"
                >
                  <p>
                    Name:{" "}
                    <span className=" dark:text-gray-400">{item.fullName}</span>
                  </p>
                  <p>
                    City:{" "}
                    <span className=" dark:text-gray-400">{item.city}</span>
                  </p>
                  <p>
                    Country:{" "}
                    <span className=" dark:text-gray-400"> {item.country}</span>
                  </p>
                  <p>
                    Postal Code:{" "}
                    <span className=" dark:text-gray-400">
                      {" "}
                      {item.postalCode}
                    </span>
                  </p>
                  <p>
                    Address:{" "}
                    <span className=" dark:text-gray-400"> {item.address}</span>
                  </p>

                  <button className="button">Select Address</button>
                </div>
              ))
            ) : (
              <div>No addresses added</div>
            )}
          </div>
          <button
            onClick={() => router.push("/account")}
            className="button my-4"
          >
            Add new address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
