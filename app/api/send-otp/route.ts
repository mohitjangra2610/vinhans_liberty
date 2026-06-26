import { SignJWT } from "jose";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const SECRET = new TextEncoder().encode(process.env.OTP_SECRET);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const token = await new SignJWT({ email, otp })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("10m")
    .sign(SECRET);

  await resend.emails.send({
    from: "noreply@americanwealthcorp.com",
    to: email,
    subject: "Your Verification Code",
    html: `
  <div style="background:#005bc8;padding:32px 16px;font-family:Arial,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">
      
      <div style="background:#0a1628;padding:28px 32px;display:flex;align-items:center;gap:12px;">
        <div style="width:36px;height:36px;background:#D3AF37;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;">
          <img src="https://americanwealthcorp.com/aws_icon.svg" width="40" height="40" alt="VL" style="display:block;" />
        </div>
        <div style="display:inline-block;margin-left:12px;">
          <p style="color:#ffffff;font-size:15px;font-weight:600;margin:0;letter-spacing:0.3px;">Vinhans Liberty</p>
          <p style="color:#D3AF37;font-size:11px;margin:0;letter-spacing:1px;text-transform:uppercase;">Financial Services</p>
        </div>
      </div>

      <div style="padding:32px;">
        <p style="font-size:13px;color:#888;margin:0 0 6px;letter-spacing:0.5px;text-transform:uppercase;">Email Verification</p>
        <h2 style="font-size:22px;font-weight:700;color:#0a1628;margin:0 0 12px;">Verify your identity</h2>
        <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 28px;">
          To complete your application, please use the secure verification code below. 
          This code confirms your identity and protects your account.
        </p>

        <div style="background:#f8f8f5;border:1px solid #e8e4d8;border-radius:6px;padding:24px;text-align:center;margin-bottom:28px;">
          <p style="font-size:11px;color:#999;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 10px;">Your verification code</p>
          <p style="font-size:38px;font-weight:800;letter-spacing:14px;color:#0a1628;margin:0;font-family:monospace;">${otp}</p>
          <p style="font-size:12px;color:#D3AF37;margin:10px 0 0;font-weight:500;">Valid for 10 minutes</p>
        </div>

        <div style="border-left:3px solid #D3AF37;padding-left:14px;margin-bottom:28px;">
          <p style="font-size:13px;color:#666;margin:0;line-height:1.6;">
            Never share this code with anyone. Vinhans Liberty will never ask 
            for your verification code via phone or email.
          </p>
        </div>

        <hr style="border:none;border-top:1px solid #eee;margin:0 0 20px;" />
        <p style="font-size:12px;color:#aaa;margin:0;line-height:1.6;">
          If you did not request this code, please ignore this email. Your account remains secure.
          &copy; 2026 Vinhans Liberty. All rights reserved.
        </p>
      </div>

    </div>
  </div>
`,
  });

  return NextResponse.json({ token });
}
