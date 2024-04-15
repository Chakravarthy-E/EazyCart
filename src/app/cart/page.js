"use client";

import CommonCart from "@/components/CommonCart/commonCart";
import DotLoader from "@/components/DotLoader/DotLoader";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart/cart";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

export default function Cart() {
  const {
    user,
    setCartitems,
    cartitems,
    pageLevelLoader,
    setpageLevelLoader,
    componentLabelLoader,
    setcomponentLabelLoader,
  } = useContext(GlobalContext);
  async function extractAllCartItems() {
    setpageLevelLoader(true);
    const response = await getAllCartItems(user?._id);
    if (response.success) {
      setCartitems(response.data);
      setpageLevelLoader(false);
      localStorage.setItem("cartItems", JSON.stringify(response.data));
    }
  }

  const handleDeleteCartItem = async (getCartItemID) => {
    setcomponentLabelLoader({ loading: true, id: getCartItemID });
    const response = await deleteFromCart(getCartItemID);
    if (response.success) {
      setcomponentLabelLoader({ loading: false, id: "" });
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      extractAllCartItems();
    } else {
      setcomponentLabelLoader({ loading: false, id: "" });
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  if (pageLevelLoader) {
    return (
      <div className=" w-full  min-h-screen flex justify-center items-center">
        <DotLoader />
      </div>
    );
  }
  return (
    <CommonCart
      componentLabelLoader={componentLabelLoader}
      handleDeleteCartItem={handleDeleteCartItem}
      cartItems={cartitems}
    />
  );
}
