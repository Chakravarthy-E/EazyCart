import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Address id is required",
      });
    }
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const deletedAddress = await Address.findByIdAndDelete(id);
      if (deletedAddress) {
        return NextResponse.json({
          success: true,
          message: "Address deleted Successfully",
        });
      } else {
        return NextResponse.json({
          success: true,
          message: "Failed to delete the address, please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Your not Authencticated",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
}
