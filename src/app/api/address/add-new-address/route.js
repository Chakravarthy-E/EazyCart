import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const AddNewAddress = Joi.object({
  fullName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postalCode: Joi.string().required(),
  userID: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connectToDB();
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const data = await req.json();

      const { fullName, address, city, country, postalCode, userID } = data;
      const { error } = AddNewAddress.validate({
        fullName,
        address,
        city,
        country,
        postalCode,
        userID,
      });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyAddedAddress = await Address.create(data);
      if (newlyAddedAddress) {
        return NextResponse.json({
          success: true,
          message: "Address Added Successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: " Failed add an address , Please try again",
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
