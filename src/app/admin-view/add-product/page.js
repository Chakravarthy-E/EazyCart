"use client";

import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent/tileComponent";
import InputComponent from "@/components/FormElements/inputComponent";
import ComponentLabelLoader from "@/components/loader/componentLabel";
import Notification from "@/components/notification/notication";
import { GlobalContext } from "@/context";
import { addNewProduct, updateAproduct } from "@/services/product/product";
import {
  AvailableSizes,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);
  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

const helperForUploadingImageToFireBase = async (file) => {
  const getFileName = createUniqueFileName(file);
  const storageRefernce = ref(storage, `eazycart/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageRefernce, file);
  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshat) => {},
      (error) => {
        console.error(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downLoadUrl) => resolve(downLoadUrl))
          .catch((error) => reject(error));
      }
    );
  });
};

const intialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

export default function AdminAddNewProduct() {
  const [formData, setFormData] = useState(intialFormData);

  const {
    componentLabelLoader,
    setcomponentLabelLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
  } = useContext(GlobalContext);

  console.log(currentUpdatedProduct);
  const router = useRouter();

  const handleImage = async (event) => {
    console.log(event.target.files);
    const extractImageUrl = await helperForUploadingImageToFireBase(
      event.target.files[0]
    );
    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl,
      });
    }
  };

  const handleTileClick = (getCurrentItem) => {
    let copySizes = [...formData.sizes];
    const index = copySizes.findIndex((item) => item.id === getCurrentItem.id);
    if (index === -1) {
      copySizes.push(getCurrentItem);
    } else {
      copySizes = copySizes.filter((item) => item.id !== getCurrentItem.id);
    }
    setFormData({
      ...formData,
      sizes: copySizes,
    });
  };
  // console.log(formData);
  const handleAddProduct = async () => {
    setcomponentLabelLoader({ loading: true, id: "" });
    const response =
      currentUpdatedProduct !== null
        ? await updateAproduct(formData)
        : await addNewProduct(formData);
    console.log(response);

    if (response.success) {
      setcomponentLabelLoader({ loading: false, id: "" });
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFormData(intialFormData);
      setCurrentUpdatedProduct(null);
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 1000);
    } else {
      setcomponentLabelLoader({ loading: true, id: "" });
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFormData(intialFormData);
    }
  };

  useEffect(() => {
    if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct);
  }, [currentUpdatedProduct]);

  return (
    <>
      <div className="w-full mt-5 mr-0 ml-0 relative">
        <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-none relative ">
          <div className="w-full mt-6 mr-0 mb-0 space-y-8">
            <input
              accept="image/*"
              max="1000000"
              type="file"
              onChange={handleImage}
            />
            <div className="flex gap-2 flex-col">
              <label htmlFor="">Available Sizes</label>
              <TileComponent
                selected={formData.sizes}
                data={AvailableSizes}
                onClick={handleTileClick}
              />
            </div>
            {adminAddProductformControls.map((controlItem) =>
              controlItem.componentType === "input" ? (
                <InputComponent
                  type={controlItem.type}
                  placeholder={controlItem.placeholder}
                  label={controlItem.label}
                  value={formData[controlItem.id]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                />
              ) : controlItem.componentType === "select" ? (
                <SelectComponent
                  label={controlItem.label}
                  options={controlItem.options}
                  value={formData[controlItem.id]}
                  onChange={(event) => {
                    setFormData({
                      ...formData,
                      [controlItem.id]: event.target.value,
                    });
                  }}
                />
              ) : null
            )}
            <button
              className="inline-flex w-full items-center justify-center bg-black px-6 py-3 text-white rounded-lg tracking-wide"
              onClick={handleAddProduct}
            >
              {componentLabelLoader && componentLabelLoader.loading ? (
                <ComponentLabelLoader
                  text={
                    currentUpdatedProduct !== null
                      ? "Updating Product"
                      : "Adding Product"
                  }
                  color={"#FFFFF"}
                  loading={componentLabelLoader && componentLabelLoader.loading}
                />
              ) : currentUpdatedProduct !== null ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </div>
        <Notification />
      </div>
    </>
  );
}
