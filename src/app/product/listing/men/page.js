import CommonListing from "@/components/commonListing/commonListing";
import { productByCategory } from "@/services/product/product";

export default async function MenAllProducts() {
  const getAllProducts = await productByCategory("men");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
