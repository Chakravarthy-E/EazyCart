"use client";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();
  return (
    <div className=" flex justify-between items-center">
      <div className="flex  items-center justify-center w-1/2 min-h-screen">
        <div className=" space-y-3">
          <h1 className=" text-7xl font-semibold tracking-tighter">
            Collections
          </h1>
          <p className="text-base  text-gray-300 w-96">
            You Can Explore As Shops Many Different Collections From Various
            Bands Here
          </p>
          <button
            onClick={() => router.push("/product/listing/all-products")}
            className=" bg-white text-black  px-5 py-3 rounded-md  text-base font-semibold"
          >
            Explore More
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center w-1/2 min-h-screen">
        <img
          src={"/assets/home.jpg"}
          alt=""
          className=" w-[500px] h-[600px] object-cover rounded-tl-[50%] rounded-br-[50%] px-4 py-4  border-r border-l border-gray-600"
        />
      </div>
    </div>
  );
}
