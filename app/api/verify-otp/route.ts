import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const SECRET = new TextEncoder().encode(process.env.OTP_SECRET);

export async function POST(req: Request) {
  const { email, otp, token } = await req.json();

  if (!email || !otp || !token) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);

    if (payload.email !== email || payload.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    return NextResponse.json({ success: true });

  } catch {
    return NextResponse.json(
      { error: "OTP expired or invalid. Request a new one." },
      { status: 400 }
    );
  }
}