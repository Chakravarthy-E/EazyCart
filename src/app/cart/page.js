"use client";

import CommonCart from "@/components/CommonCart/commonCart";
import DotLoader from "@/components/DotLoader/DotLoader";
import { GlobalContext } from "@/context";
import { getAllCartItems } from "@/services/cart/cart";
import { useContext, useEffect } from "react";

export default function Cart() {
  const { user, setCartitems, cartitems, pageLevelLoader, setpageLevelLoader } =
    useContext(GlobalContext);
  async function extractAllCartItems() {
    setpageLevelLoader(true);
    const response = await getAllCartItems(user?._id);
    if (response.success) {
      setCartitems(response.data);
      setpageLevelLoader(false);
      localStorage.setItem("cartItems", JSON.stringify(response.data));
    }
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  if (pageLevelLoader) {
    return (
      <div className=" w-full   min-h-screen flex justify-center items-center">
        <DotLoader />
      </div>
    );
  }
  return <CommonCart cartItems={cartitems} />;
}
