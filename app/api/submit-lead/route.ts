import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { formData, serviceData, serviceId, serviceName } = await req.json();

  // DB mein save karo
  const { error } = await supabase.from("leads").insert({
    tenant_id: process.env.NEXT_PUBLIC_TENANT_ID,
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    phone: formData.phone,
    age: formData.age,
    gender: formData.gender,
    service_id: serviceId,
    service_data: serviceData,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Service data ko readable format mein convert karo email ke liye
  const serviceDataHtml = Object.entries(serviceData)
    .map(([key, value]) => {
      const label = key.replaceAll("_", " ").replaceAll(/\b\w/g, (l) => l.toUpperCase());
      const val = Array.isArray(value)
        ? (value as { name: string; age: string; gender: string }[])
            .map((c) => `${c.name} (Age: ${c.age}, Gender: ${c.gender})`)
            .join(", ")
        : JSON.stringify(value);
      return `<tr>
        <td style="padding:8px 12px;color:#666;font-size:13px;border-bottom:1px solid #eee;">${label}</td>
        <td style="padding:8px 12px;color:#111;font-size:13px;border-bottom:1px solid #eee;font-weight:500;">${val}</td>
      </tr>`;
    })
    .join("");

  // User ko thank you email
  await resend.emails.send({
    from: "noreply@americanwealthcorp.com",
    to: formData.email,
    subject: "Thank You for Choosing Vinhans Liberty",
    html: `
      <div style="background:#f4f5f7;padding:32px 16px;font-family:Arial,sans-serif;">
        <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">
          <div style="background:#0a1628;padding:28px 32px;">
            <img src="https://americanwealthcorp.com/aws_icon.svg" width="40" height="40" alt="VL" style="display:inline-block;vertical-align:middle;" />
            <div style="display:inline-block;margin-left:12px;vertical-align:middle;">
              <p style="color:#ffffff;font-size:15px;font-weight:600;margin:0;">Vinhans Liberty</p>
              <p style="color:#D3AF37;font-size:11px;margin:0;letter-spacing:1px;text-transform:uppercase;">Financial Services</p>
            </div>
          </div>
          <div style="padding:32px;">
            <h2 style="font-size:22px;font-weight:700;color:#0a1628;margin:0 0 12px;">Thank you, ${formData.first_name}!</h2>
            <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 24px;">
              We have received your request for <strong>${serviceName}</strong>. 
              Our team will review your information and get back to you with a personalized quotation as soon as possible.
            </p>
            <div style="background:#f8f8f5;border:1px solid #e8e4d8;border-radius:6px;padding:16px;margin-bottom:24px;">
              <p style="font-size:11px;color:#999;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px;">Selected Service</p>
              <p style="font-size:16px;font-weight:700;color:#0a1628;margin:0;">${serviceName}</p>
            </div>
            <div style="border-left:3px solid #D3AF37;padding-left:14px;margin-bottom:28px;">
              <p style="font-size:13px;color:#666;margin:0;line-height:1.6;">
                If you have any questions in the meantime, feel free to reach out to our team directly.
              </p>
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

  // Tujhe lead notification email
  await resend.emails.send({
    from: "noreply@americanwealthcorp.com",
    to: process.env.ADMIN_EMAIL || '',
    subject: `New Lead — ${serviceName} — ${formData.first_name} ${formData.last_name}`,
    html: `
      <div style="background:#f4f5f7;padding:32px 16px;font-family:Arial,sans-serif;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">
          <div style="background:#0a1628;padding:24px 32px;">
            <p style="color:#D3AF37;font-size:11px;margin:0 0 4px;letter-spacing:1px;text-transform:uppercase;">New Lead Generated</p>
            <p style="color:#ffffff;font-size:18px;font-weight:700;margin:0;">${formData.first_name} ${formData.last_name}</p>
          </div>
          <div style="padding:32px;">

            <p style="font-size:11px;color:#999;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px;">Basic Details</p>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
              <tr>
                <td style="padding:8px 12px;color:#666;font-size:13px;border-bottom:1px solid #eee;">Full Name</td>
                <td style="padding:8px 12px;color:#111;font-size:13px;border-bottom:1px solid #eee;font-weight:500;">${formData.first_name} ${formData.last_name}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;color:#666;font-size:13px;border-bottom:1px solid #eee;">Email</td>
                <td style="padding:8px 12px;color:#111;font-size:13px;border-bottom:1px solid #eee;font-weight:500;">${formData.email}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;color:#666;font-size:13px;border-bottom:1px solid #eee;">Phone</td>
                <td style="padding:8px 12px;color:#111;font-size:13px;border-bottom:1px solid #eee;font-weight:500;">${formData.phone || "—"}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;color:#666;font-size:13px;border-bottom:1px solid #eee;">Age</td>
                <td style="padding:8px 12px;color:#111;font-size:13px;border-bottom:1px solid #eee;font-weight:500;">${formData.age || "—"}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;color:#666;font-size:13px;border-bottom:1px solid #eee;">Gender</td>
                <td style="padding:8px 12px;color:#111;font-size:13px;border-bottom:1px solid #eee;font-weight:500;">${formData.gender || "—"}</td>
              </tr>
            </table>

            <p style="font-size:11px;color:#999;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px;">Selected Service</p>
            <div style="background:#f8f8f5;border:1px solid #e8e4d8;border-radius:6px;padding:12px 16px;margin-bottom:24px;">
              <p style="font-size:15px;font-weight:700;color:#0a1628;margin:0;">${serviceName}</p>
            </div>

            <p style="font-size:11px;color:#999;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px;">Service Details</p>
            <table style="width:100%;border-collapse:collapse;">
              ${serviceDataHtml}
            </table>

            <hr style="border:none;border-top:1px solid #eee;margin:24px 0 16px;" />
            <p style="font-size:12px;color:#aaa;margin:0;">
              &copy; 2026 Vinhans Liberty. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}