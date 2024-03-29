import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");

      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Product id is required",
        });
      }

      const extractOrderDetails = await Order.findById(id).populate(
        "orderItems.product"
      );
      if (extractOrderDetails) {
        return NextResponse.json({
          success: true,
          data: extractOrderDetails,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to fetch order details, try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Your not authenticated",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong try again",
    });
  }
}
