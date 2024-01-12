"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLevelLoader, setpageLevelLoader] = useState(false);
  const [componentLabelLoader, setcomponentLabelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);

  useEffect(() => {
    // console.log(Cookies.get("token"));
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};

      setUser(userData);
    } else {
      setIsAuthUser(false);
    }
  }, [Cookies]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        pageLevelLoader,
        setpageLevelLoader,
        setShowNavModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLabelLoader,
        setcomponentLabelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
