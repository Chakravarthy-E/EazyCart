import CommonDetails from "@/components/commonDetails/commonDetails";
import { productById } from "@/services/product/product";

export default async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);
//   console.log(productDetailsData);
  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
}
