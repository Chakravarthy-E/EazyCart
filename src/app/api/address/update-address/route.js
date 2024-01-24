import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const data = await req.json();
      const { id, fullName, address, city, country, postalCode } = data;
      const updateAddress = await Address.findOneAndUpdate(
        {
          _id: _id,
        },
        { fullName, address, city, country, postalCode },
        { new: true }
      );
      if (updateAddress) {
        return NextResponse.json({
          success: true,
          message: "Address updated successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed update address try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Your not authencticated",
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