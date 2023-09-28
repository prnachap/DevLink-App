import { MESSAGES } from "@/constants/constant";
import { initializeDB } from "@/lib/initializeDB";
import PlatformModel from "@/models/platform.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await initializeDB();
    const platformOptions = await PlatformModel.find({}).sort({ platform: 1 });
    return NextResponse.json({ platform: platformOptions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: MESSAGES.SERVER_FAILURE },
      { status: 500 }
    );
  }
}
