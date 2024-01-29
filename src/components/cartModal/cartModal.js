"use client";

import { Fragment, useContext, useEffect } from "react";
import CommonModel from "../commonModel";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart/cart";
import { toast } from "react-toastify";
import DotLoader from "../DotLoader/DotLoader";
import { useRouter } from "next/navigation";
export default function CartModal() {
  const {
    showCartModal,
    setShowCartModal,
    user,
    cartitems,
    setCartitems,
    componentLabelLoader,
    setcomponentLabelLoader,
  } = useContext(GlobalContext);
  async function extractAllCartItems() {
    const response = await getAllCartItems(user?._id);
    if (response.success) {
      setCartitems(response.data);
      localStorage.setItem("cartItems", JSON.stringify(response.data));
    }
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  const router = useRouter();
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
  return (
    <CommonModel
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartitems && cartitems.length ? (
          <ul role="list" className="-my-6 divide-y divide-gray-300">
            {cartitems.map((cartItem) => (
              <li key={cartItem.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={
                      cartItem &&
                      cartItem.productID &&
                      cartItem.productID.imageUrl
                    }
                    alt="Cart Item"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium dark:text-white">
                      <h3>
                        <a>
                          {cartItem &&
                            cartItem.productID &&
                            cartItem.productID.name}
                        </a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm dark:text-gray-400 text-gray-600">
                      $
                      {cartItem &&
                        cartItem.productID &&
                        cartItem.productID.price}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium  text-yellow-800 rounded sm:order-2"
                      onClick={() => handleDeleteCartItem(cartItem._id)}
                    >
                      {componentLabelLoader &&
                      componentLabelLoader.loading &&
                      componentLabelLoader.id === cartItem._id ? (
                        <DotLoader />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <button
            type="button"
            className=" mt-1.5 w-full inline-block dark:bg-gray-950 dark:text-white: bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
            onClick={() => {
              router.push("/cart");
              setShowCartModal(false);
            }}
          >
            Go To Cart
          </button>
          <button
            disabled={cartitems && cartitems.length === 0}
            type="button"
            onClick={() => {
              router.push("/checkout");
              setShowCartModal(false);
            }}
            className=" mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-sm text-gray-600 ">
            <button type="button" className=" font-medium text-gray-600">
              Continue Shopping <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
}
