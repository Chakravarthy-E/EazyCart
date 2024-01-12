import CommonListing from "@/components/commonListing/commonListing";
import { getAllAdminProducts } from "@/services/product/product";

export default async function AdminAllProducts() {
  const allAdminProducts = await getAllAdminProducts();
  // console.log(allAdminProducts)
  return <CommonListing data={allAdminProducts && allAdminProducts.data} />;
}
