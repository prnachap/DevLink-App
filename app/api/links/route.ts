import { initializeDB } from "@/lib/initializeDB";
import LinksModel from "@/models/link.model";
import UserModel from "@/models/user.model";
import { LinksInput, linksSchema } from "@/schema/links.schema";
import { validateResources } from "@/utils/validateSchema";
import { isEmpty } from "lodash";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    await initializeDB();
    const session = await getServerSession(authOptions);
    const userId = await UserModel.findOne({ email: session?.user!.email });
    const data = await LinksModel.findOne(
      { createdBy: userId?.id },
      { _id: 0, "linksList._id": 0 }
    );
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message });
  }
}

export async function POST(request: Request, res: Response) {
  try {
    await initializeDB();
    const session = await getServerSession(authOptions);

    const body = ((await request.json()) as { linksList: LinksInput })
      ?.linksList;

    const validateSchema = validateResources(linksSchema, body);

    if (isEmpty(session?.user)) {
      return NextResponse.json(
        { message: "Not Authorized" },
        {
          status: 401,
        }
      );
    }

    if (validateSchema?.errors) {
      const errorMessage = validateSchema.errors?.[0]?.message;
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    const userId = await UserModel.findOne({ email: session?.user.email });

    const existingLinks = await LinksModel.find({ createdBy: userId?.id });
    let data = null;
    if (isEmpty(existingLinks)) {
      data = await LinksModel.create({
        linksList: body,
        createdBy: userId?.id,
      });
      return NextResponse.json({ data });
    } else {
      data = await LinksModel.findOneAndUpdate({
        createdBy: userId?.id,
        linksList: body,
      });
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message });
  }
}
