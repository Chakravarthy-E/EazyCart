"use client";

import DotLoader from "../DotLoader/DotLoader";
import ComponentLabelLoader from "../loader/componentLabel";

export default function CommonCart({
  cartItems = [],
  handleDeleteCartItem,
  componentLabelLoader,
}) {
  return (
    <section className=" h-screen ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="  shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className=" flow-root">
                {cartItems && cartItems.length ? (
                  <ul>
                    {cartItems.map((cartItem) => (
                      <li
                        className=" flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-4 sm:space-y-0"
                        key={cartItem.id}
                      >
                        <div className=" shrink-0">
                          <img
                            src={
                              cartItem &&
                              cartItem.productID &&
                              cartItem.productID.imageUrl
                            }
                            alt="Product Image"
                            className=" h-24 w-24 max-w-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-6 sm:grid sm:grid-cols-2">
                            <div className=" pr-8 sm:pr-4">
                              <p className="text-base font-semibold dark:text-white text-gray-900">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.name}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 gap-3 items-end justify-between flex sm:mt-0 sm:items-start sm:justify-end">
                            <p className="shrink-0 w-20 font-semibold text-base dark:text-white text-gray-800 sm:order-1 sm:ml-8">
                              $
                              {cartItem &&
                                cartItem.productID &&
                                cartItem.productID.price}
                            </p>
                            <button
                              type="button"
                              className=" font-medium text-yellow-800 sm:order-2"
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
                ) : (
                  <h1 className="text-center font-bold text-lg">
                    You cart is empty
                  </h1>
                )}
              </div>
              <div className="mt-6  border-t border-b py-2 dark:text-white">
                <div className=" flex items-center justify-between">
                  <p className=" text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg  font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : 0}
                  </p>
                </div>
                <div className=" flex items-center justify-between">
                  <p className=" text-sm text-gray-400">Shipping</p>
                  <p className="text-lgfont-semibold">$0</p>
                </div>

                <div className=" flex items-center justify-between">
                  <p className=" text-sm text-gray-400">Total</p>
                  <p className="text-lg  font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : 0}
                  </p>
                </div>
                <div className="mt-5 text-center">
                  <button
                    disabled={cartItems && cartItems.length === 0}
                    className=" disabled:opacity-50 group inline-flex w-full items-center justify-center bg-black text-white px-6 py-4 text-lg font-medium uppercase"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
