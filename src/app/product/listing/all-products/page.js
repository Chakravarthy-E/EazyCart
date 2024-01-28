import CommonListing from "@/components/commonListing/commonListing";
import { getAllAdminProducts } from "@/services/product/product";

export default async function AllProducts() {
  const getAllProducts = await getAllAdminProducts();
  console.log({getAllProducts});

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
