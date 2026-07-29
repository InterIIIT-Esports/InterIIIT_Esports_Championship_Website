import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, category, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const TARGET_EMAIL = "iiitiansnetwork@gmail.com";

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"IEC Support Form" <${process.env.SMTP_USER}>`,
        to: TARGET_EMAIL,
        replyTo: email,
        subject: `[IEC Support] ${category || "General"} — ${subject || "No Subject"}`,
        text: `New support request from ${name} (${email})\n\nCategory: ${category || "N/A"}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; max-width: 600px;">
            <div style="border-bottom: 3px solid #e11d48; padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #0f172a;">New Support Request</h2>
              <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Inter IIIT Esports Championship</p>
            </div>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 100px; vertical-align: top;"><strong>Name</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Email</strong></td>
                <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Category</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${category || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Subject</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${subject || "N/A"}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-left: 3px solid #e11d48;">
              <p style="margin: 0 0 6px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;"><strong>Message</strong></p>
              <p style="margin: 0; color: #0f172a; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 24px; font-size: 11px; color: #94a3b8;">This email was sent from the IEC website contact form. Reply directly to respond to ${name}.</p>
          </div>
        `,
      });
    } else {
      // Dev fallback
      console.log(`\n========================================`);
      console.log(`[DEV] Contact Form Submission`);
      console.log(`From: ${name} (${email})`);
      console.log(`Category: ${category}`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log(`Would send to: ${TARGET_EMAIL}`);
      console.log(`========================================\n`);
    }

    return NextResponse.json({ success: true, message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
