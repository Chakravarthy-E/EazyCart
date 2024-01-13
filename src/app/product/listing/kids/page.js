
import CommonListing from "@/components/commonListing/commonListing";
import { productByCategory } from "@/services/product/product";

export default async function KidsAllProducts() {
  const getAllProducts = await productByCategory("kids");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
