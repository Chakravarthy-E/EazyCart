"use client";

import { GlobalContext } from "@/context";
import { fetchAllAddresses } from "@/services/address/address";
import { callStripeSession } from "@/services/stripe/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Checkout = () => {
  const {
    cartitems,
    user,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);

  const router = useRouter();
  const publishbleKey = process.env.NEXT_PUBLIC_PUBLISHABLE_KEY;
  console.log(publishbleKey);
  const stripePromise = loadStripe(publishbleKey);

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

  function handleSelectedAddress(getAddress) {
    if (getAddress._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });
      return;
    }
    setSelectedAddress(getAddress._id);
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        fullName: getAddress.fullName,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
        address: getAddress.address,
      },
    });
  }
  // console.log(checkoutFormData);
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const createLineItems = cartitems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [item.productID.imageUrl],
          name: item.productID.name,
        },
        unit_amount: item.productID.price * 100,
      },
      quantity: 1,
    }));
    const response = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stipe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.id,
    });
    console.log(error);
  };

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
          <div className="w-full mt-1 mr-0 ml-0 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  onClick={() => handleSelectedAddress(item)}
                  key={item._id}
                  className={`border p-6 rounded-lg tracking-normal ${
                    item._id === selectedAddress ? " border-blue-500" : ""
                  }`}
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

                  <button className="button">
                    {item._id === selectedAddress
                      ? " Selected"
                      : " Select Address"}
                  </button>
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
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium dark:text-gray-400">SubTotal</p>
              <p className="text-lg font-bold dark:text-gray-300">
                ${" "}
                {cartitems && cartitems.length
                  ? cartitems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium dark:text-gray-400">Shipping</p>
              <p className="text-lg font-bold dark:text-gray-300">Free</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium dark:text-gray-400">Total</p>
              <p className="text-lg font-bold dark:text-gray-300">
                ${" "}
                {cartitems && cartitems.length
                  ? cartitems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={
              (cartitems && cartitems.length === 0) ||
              Object.keys(checkoutFormData.shippingAddress).length === 0
            }
            className="button w-full disabled:opacity-50"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
