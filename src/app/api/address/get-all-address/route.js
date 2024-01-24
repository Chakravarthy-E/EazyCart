import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Your are not logged in",
      });
    }
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const getAllAdresses = await Address.find({ userID: id });
      if (getAllAdresses) {
        return NextResponse.json({
          success: true,
          data: getAllAdresses,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to fetch addresses, Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Your not Authenticated",
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
