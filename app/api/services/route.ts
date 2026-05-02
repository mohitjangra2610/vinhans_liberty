import { getServices } from "@/lib/apicalls/services";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const services = await getServices({
      source: "server",
    });

    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}