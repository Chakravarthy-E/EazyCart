"use client";

import InputComponent from "@/components/FormElements/inputComponent";
import { GlobalContext } from "@/context";
import { addNewAddressFormControls, styles } from "@/utils";
import { useContext, useState } from "react";

export default function Account() {
  const { user, addresses, setAddresses, addressFormData, setAddressFormData } =
    useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  return (
    <section>
      <div className=" mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="  shadow-lg">
          <div className="p-6 sm:p-12">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row"></div>
            {/**We have render random user image here */}
            <div className="flex flex-col flex-1">
              <h4 className=" text-lg font-semibold text-center md:text-left ">
                {user?.name}
              </h4>
              <p>{user?.email}</p>
              <p>{user?.role}</p>
            </div>
            <button className={styles.button}>View Your Orders</button>
            <div className=" mt-6 ">
              <h1 className=" font-bold text-lg">Your Addressess:</h1>
              <div className="mt-4">
                {addresses && addresses.length ? (
                  addresses.map((item) => (
                    <div className="border p-6 " key={item._id}>
                      <p>Name:{item.fullName}</p>
                      <p>City:{item.city}</p>
                      <p>Country:{item.country}</p>
                      <p>PostalCode:{item.postalCode}</p>
                      <p>Address:{item.address}</p>

                      <button className="button">Update</button>
                      <button className="button">Delete</button>
                    </div>
                  ))
                ) : (
                  <p>No Address found please add a new address !</p>
                )}
              </div>
            </div>
            <div
              className="mt-4"
              onClick={() => setShowAddressForm(!showAddressForm)}
            >
              <button className="button">
                {showAddressForm ? "Hide address form" : "Add New Adress"}
              </button>
            </div>
            {showAddressForm ? (
              <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                <div className=" w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                  {addNewAddressFormControls.map((controlItem) => (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={addressFormData[controlItem.id]}
                      onChange={(e) =>
                        setAddressFormData({
                          ...addressFormData,
                          [controlItem.id]: e.target.value,
                        })
                      }
                    />
                  ))}
                </div>
                <div className="mt-4">
                  <button className="button">Save</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
