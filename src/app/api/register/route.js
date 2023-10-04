import connectToDB from "@/database";
import User from "@/models/user";
import { hash } from "bcryptjs";
import Joi from "joi";
import { NextResponse } from "next/server";

const schema = Jio.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  await connectToDB();

  const { name, email, password, role } = await req.json();

  const { error } = schema.validate({ name, email, password, role });

  if (error) {
    return NextResponse.json({
      success: false,
      message: email.details[0],
    });
  }

  try {
    //check user exist
    const isUserAlreadyExist = await User.findOne({ email });

    if (isUserAlreadyExist) {
      return NextResponse.json({
        success: false,
        message: "User is already exist. Please try with differnet email",
      });
    } else {
      const hashPassword = await hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        role,
      });
      if (newUser) {
        return NextResponse.json({
          success: true,
          message: "Account created successfully",
        });
      }
    }
  } catch (error) {
    console.log(`error in user registration ${error}`);

    return NextResponse.json({
      success: false,
      message: "Something went wrong try again",
    });
  }
}
