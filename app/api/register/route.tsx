import { initializeDB } from "@/lib/initializeDB";
import UserModel, { IUser } from "@/models/user.model";
import bcrypt from "bcrypt";
import { isEmpty, isEqual } from "lodash";
import { NextResponse } from "next/server";

type RegisterInput = Partial<IUser> & { confirmPassword: string };

export async function POST(request: Request, response: Response) {
  const { email, password, confirmPassword }: RegisterInput =
    await request.json();

  if (isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword)) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  if (!isEqual(password, confirmPassword)) {
    return new NextResponse("Password doesn't match", { status: 400 });
  }
  try {
    await initializeDB();
    const user = await UserModel.findOne({ email });
    if (!isEmpty(user)) {
      return new NextResponse("User Already Exists", { status: 400 });
    }
    const hashPassword = await bcrypt.hash(password!, 10);

    await UserModel.create({
      email,
      password: hashPassword,
    });

    return new NextResponse("User Registered Successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Something Went Wrong", { status: 500 });
  }
}
