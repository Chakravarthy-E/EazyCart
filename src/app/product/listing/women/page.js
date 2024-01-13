import CommonListing from "@/components/commonListing/commonListing";
import { productByCategory } from "@/services/product/product";

export default async function WomenAllProducts() {
  const getAllProducts = await productByCategory("women");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
