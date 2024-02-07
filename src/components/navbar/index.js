"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModel from "../commonModel";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import CartModal from "../cartModal/cartModal";
import { VscAccount } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { CiLogin } from "react-icons/ci";

function NavItems({ isModalView = false, isAdminView, router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ${
          isModalView ? "border-none" : " "
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="curser-pointer block py-2 pl-3 pr-4 hover:text-blue-500  cursor-pointer rounded md:p-0"
                key={item.id}
                title={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="curser-pointer block py-2 pl-3 pr-4 hover:text-blue-500 cursor-pointer rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    showNavModal,
    setShowNavModal,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null);
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathName.includes("admin-view");
  return (
    <>
      <nav className=" dark:bg-black  bg-white fixed w-full z-50 top-0 left-0 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="self-center  text-2xl font-semibold whitespace-normal">
              EazyCart
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button
                  title="Profile"
                  className=" hover:text-blue-500 dark:text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push("/account")}
                >
                  <VscAccount size={25} />
                </button>
                <button
                  title="Cart"
                  onClick={() => setShowCartModal(true)}
                  className=" hover:text-blue-500 dark:text-white font-bold py-2 px-4 rounded"
                >
                  <FiShoppingCart size={25} />
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  title="Client View"
                  className=" hover:text-blue-500 dark:text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push("/")}
                >
                  Client View
                </button>
              ) : (
                <button
                  title="Admin View"
                  className=" hover:text-blue-500 dark:text-white font-bold py-2 px-4 rounded"
                  onClick={() => router.push("/admin-view")}
                >
                  <MdAdminPanelSettings size={35} />
                </button>
              )
            ) : null}
            {isAuthUser ? (
              <button
                title="Logout"
                onClick={handleLogout}
                className=" hover:text-blue-500 dark:text-white font-bold py-2 px-4 rounded"
              >
                <LuLogOut size={30} />
              </button>
            ) : (
              <button
                title="Login"
                onClick={() => router.push("/login")}
                className=" hover:text-blue-500 dark:text-white font-bold py-2 px-4 rounded"
              >
                <CiLogin size={30} />
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModel
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
