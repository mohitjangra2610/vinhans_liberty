import { Resend } from "resend";
import { NextResponse } from "next/server";

import type { TeamInsert } from "@/type/supabase";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;
const RESEND = new Resend(process.env.RESEND_API_KEY);

interface TeamRequestBody {
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !TENANT_ID) {
      return NextResponse.json(
        { error: "Missing Supabase team configuration" },
        { status: 500 },
      );
    }

    const body = (await request.json()) as TeamRequestBody;

    const fullName = readString(body.full_name);
    const email = readString(body.email);
    const phone = readString(body.phone);
    const message = readString(body.message);

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required" },
        { status: 400 },
      );
    }

    const payload: TeamInsert = {
      tenant_id: TENANT_ID,
      full_name: fullName,
      email,
      phone: phone || null,
      message: message || null,
    };

    const response = await fetch(`${SUPABASE_URL}/rest/v1/team`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();

      return NextResponse.json(
        { error: `Team form submission failed: ${text}` },
        { status: response.status },
      );
    }

    const { error: emailError } = await RESEND.emails.send({
      from: "noreply@vinhansliberty.com",
      to: email,
      subject: "Thank You for Applying — Vinhans Liberty",
      html: `
        <div style="background:#f4f5f7;padding:32px 16px;font-family:Arial,sans-serif;">
          <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">
            <div style="background:#0a1628;padding:28px 32px;">
              <img src="https://vinhansliberty.com/vl_icon.svg" width="40" height="40" alt="VL" style="display:inline-block;vertical-align:middle;" />
              <div style="display:inline-block;margin-left:12px;vertical-align:middle;">
                <p style="color:#ffffff;font-size:15px;font-weight:600;margin:0;">Vinhans Liberty</p>
                <p style="color:#D3AF37;font-size:11px;margin:0;letter-spacing:1px;text-transform:uppercase;">Financial Services</p>
              </div>
            </div>
            <div style="padding:32px;">
              <h2 style="font-size:22px;font-weight:700;color:#0a1628;margin:0 0 12px;">Thank you, ${fullName}!</h2>
              <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 24px;">
                We have received your application to join our team. We are excited to learn more about you and will review your submission promptly.
              </p>
              <div style="border-left:3px solid #D3AF37;padding-left:14px;margin-bottom:28px;">
                <p style="font-size:13px;color:#666;margin:0;line-height:1.6;">
Thank you for taking the time to apply. We truly appreciate your interest and effort. A member of our recruitment team will review your application and reach out with the next steps. Please keep an eye on your inbox for our email. This is an automated message, so there's no need to reply.                </p>
              </div>
              <hr style="border:none;border-top:1px solid #eee;margin:0 0 20px;" />
              <p style="font-size:12px;color:#aaa;margin:0;line-height:1.6;">
                &copy; 2026 Vinhans Liberty. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend team thank-you error:", emailError);
      return NextResponse.json({
        success: true,
        emailError:
          emailError.message || "Confirmation email could not be sent",
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while submitting team form" },
      { status: 500 },
    );
  }
}
