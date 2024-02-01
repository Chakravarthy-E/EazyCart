import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const secretkey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
const stripe = require("stripe")(secretkey);

export async function POST(req) {
  try {
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const res = await req.json();
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url: "https://eazy-cart-mu.vercel.app/checkout" + "?status=success",
        cancel_url: "https://eazy-cart-mu.vercel.app/checkout" + "?status=cancel",
      });
      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Your are not authenticated",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong, Please try again",
    });
  }
}
