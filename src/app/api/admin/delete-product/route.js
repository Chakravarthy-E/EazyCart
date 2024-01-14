import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();

    const isAuthUser = await AuthUser(req);

    if (isAuthUser?.role === "admin") {
      const { searchParams } = new URL(req.url);
      const id = searchParams.get("id");
      if (!id) {
        return NextResponse.json({
          success: false,
          message: "Product id is required",
        });
      }
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (deletedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product is deleted Successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete Product",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to delete Product",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Your are not Authenticated",
    });
  }
}
