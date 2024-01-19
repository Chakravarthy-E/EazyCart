"use client";

import ComponentLabelLoader from "@/components/loader/componentLabel";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart/cart";
import { deleteAproduct } from "@/services/product/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function ProductButton({ item }) {
  const pathName = usePathname();

  const {
    setCurrentUpdatedProduct,
    setcomponentLabelLoader,
    componentLabelLoader,
    user,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);

  const router = useRouter();
  const isAdminView = pathName.includes("admin-view");

  const handleDeleteProduct = async (item) => {
    setcomponentLabelLoader({ loading: true, id: item._id });
    const response = await deleteAproduct(item._id);
    if (response.success) {
      setcomponentLabelLoader({ loading: false, id: "" });
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setcomponentLabelLoader({ loading: true, id: item._id });
    }
  };

  async function handleAddToCart(getItem) {
    setcomponentLabelLoader({ loading: true, id: getItem._id });

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
    console.log(response);
  }

  return isAdminView ? (
    <>
      <button
        className=" mt-1.5 w-full text-white  flex justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide rounded"
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-product");
        }}
      >
        Update
      </button>
      <button
        className=" mt-1.5 w-full text-white  flex justify-center bg-black px-5  py-3 text-xs font-medium uppercase tracking-wide rounded"
        onClick={() => handleDeleteProduct(item)}
      >
        {componentLabelLoader &&
        componentLabelLoader.loading &&
        item._id === componentLabelLoader.id ? (
          <ComponentLabelLoader
            text={"Deleting Product"}
            color={"#FFFFF"}
            loading={componentLabelLoader && componentLabelLoader.loading}
          />
        ) : (
          "Delete"
        )}
      </button>
    </>
  ) : (
    <>
      <button
        className=" mt-1.5 w-full  text-white flex   items-center justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide  rounded"
        onClick={() => handleAddToCart(item)}
      >
        {componentLabelLoader &&
        componentLabelLoader.loading &&
        componentLabelLoader.id === item._id ? (
          <ComponentLabelLoader
            text={"Adding to Cart"}
            color={"#FFFFF"}
            loading={componentLabelLoader && componentLabelLoader.loading}
          />
        ) : (
          "  Add to Cart"
        )}
      </button>
    </>
  );
}
