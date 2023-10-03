"use client";

import { loginFormControls } from "@/utils";
import InputComponent from "@/components/FormElements/inputComponent";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

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
                    />
                  ) : null
                )}
                <button className="bg-black w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
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
