import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi, { string } from "joi";

export const dynamic = "force-dynamic";

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productId: Joi.string().required(),
});

export async function POST(req) {
  await connectToDB();
  const isAuthUser = await AuthUser(req);

  if (isAuthUser) {
    const data = await req.json();
    const { productId, userID } = data;

    const { error } = AddToCart.validate({ userID, productId });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const isCurrentCartItemAlreadyExits = await Cart.find({
      productId: productId,
      userID: userID,
    });

    if (isCurrentCartItemAlreadyExits) {
      return NextResponse.json({
        success: false,
        message: "Product is Already in Cart ! Please add different Product",
      });
    }

    const saveProductToCart = await Cart.create(data);

    if (saveProductToCart) {
      return NextResponse.json({
        success: true,
        message: "Product is added to Cart!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: " Failed to add a Product",
      });
    }
  } else {
    return NextResponse.json({
      success: false,
      message: "Your are not Authenticated",
    });
  }
  try {
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong try again",
    });
  }
}
