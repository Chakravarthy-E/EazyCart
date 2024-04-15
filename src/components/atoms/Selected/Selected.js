"use client";

import { getAllAdminProducts } from "@/services/product/product";
import { useRouter } from "next/navigation";

export async function Selected() {
  const router = useRouter();
  const getAllProducts = await getAllAdminProducts();
  const data = getAllProducts && getAllProducts.data;
  return (
    <div className=" py-6 sm:py-8 lg:py-12 min-h-screen">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 ">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold  text-gray-800 md:mb-6 lg:text-3xl">
            Selected
          </h2>

          <p className="mx-auto max-w-screen-md text-center   text-gray-500 md:text-lg">
            This is a section of some simple filler text, also known as
            placeholder text. It shares some characteristics of a real written
            text but is random or otherwise generated.
          </p>
        </div>

        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {data &&
            data.slice(0, 4).map((item) => {
              return (
                <div
                  key={item._id}
                  onClick={() => router.push(`/product/${item._id}`)}
                >
                  <div className="group relative cursor-pointer mb-2 block h-96 overflow-hidden rounded-lg  shadow-lg lg:mb-3">
                    <img
                      src={item.imageUrl}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />

                    {item.onSale === "yes" ? (
                      <div className="absolute bottom-2 left-0 flex gap-2">
                        <span className="rounded-lg bg-white px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-gray-800">
                          Sale
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-start justify-between gap-2 px-2">
                    <div className="flex flex-col">
                      <p className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">
                        {item.name}
                      </p>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="font-bold  text-gray-600 lg:text-lg">
                        {`$ ${item.price}`}
                      </span>
                      {item.onSale === "yes" ? (
                        <span className="text-sm text-red-500 line-through">
                          {`$ ${(
                            item.price -
                            item.price * (item.priceDrop / 100)
                          ).toFixed(2)}`}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
