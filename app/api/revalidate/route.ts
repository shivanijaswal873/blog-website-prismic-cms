import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    revalidatePath("/");
    revalidatePath("/contact");

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}