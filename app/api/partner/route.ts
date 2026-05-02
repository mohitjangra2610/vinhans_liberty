
import { getPartners } from "@/lib/apicalls/partner";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const partners = await getPartners({
      source: "server",
    });

    return NextResponse.json(partners);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch partners",
      },
      { status: 500 }
    );
  }
}