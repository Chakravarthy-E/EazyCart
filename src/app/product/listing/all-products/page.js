import CommonListing from "@/components/commonListing/commonListing";
import { getAllAdminProducts } from "@/services/product/product";

export default async function AllProducts() {
  const getAllProducts = await getAllAdminProducts();

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
