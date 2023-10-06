"use client";

import { loginFormControls } from "@/utils";
import InputComponent from "@/components/FormElements/inputComponent";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { login } from "@/services/login";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";

const initialFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);

  const { isAuthUser, setIsAuthUser, user, setUser } =
    useContext(GlobalContext);

  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin() {
    const response = await login(formData);
    console.log(response);
    if (response.success) {
      setIsAuthUser(true);
      setUser(response?.finalData?.user);
      setFormData(initialFormData);
      Cookies.set("token", response?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(response?.finalData?.user));
    } else {
      setIsAuthUser(false);
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  // console.log(isAuthUser, user);

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto  xl:px-5 lg:flex-row ">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row ">
          <div className="w-full mt-20 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif ">
                Login
              </p>

              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      key={controlItem.id}
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
                  className="  disabled:opacity-50 bg-black w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  disabled={!isValidForm()}
                  onClick={handleLogin}
                >
                  Login
                </button>
                <div className="flex flex-col gap-2 ">
                  <p>New to website ?</p>
                  <button
                    className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
