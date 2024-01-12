"use client";

import { usePathname } from "next/navigation";

export default function ProductButton() {
  const pathName = usePathname();

  const isAdminView = pathName.includes("admin-view");

  return isAdminView ? (
    <>
      <button className=" mt-1.5 w-full text-white  flex justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide">
        Update
      </button>
      <button
        className=" mt-1.5 w-full text-white  flex justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide"
        s
      >
        Delete
      </button>
    </>
  ) : (
    <>
      <button className=" mt-1.5 w-full  text-white flex justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide">
        Add to Cart
      </button>
    </>
  );
}
