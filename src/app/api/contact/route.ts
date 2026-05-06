import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  type: string;
  budget: string;
  message: string;
}

export async function POST(req: Request) {
  let body: ContactPayload;

  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, company, type, budget, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (message.length > 4000 || name.length > 200) {
    return NextResponse.json({ error: "Payload too large" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL ?? "ar.alirazzaq4651@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const subjectPrefix = "[Portfolio]";

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY not set — logging submission instead of emailing"
    );
    console.log("[contact] submission:", { name, email, company, type, budget });
    return NextResponse.json({
      ok: true,
      delivered: false,
      note: "Submission logged — email delivery not configured",
    });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Portfolio Contact <${fromEmail}>`,
        to: [toEmail],
        reply_to: email,
        subject: `${subjectPrefix} ${type} · ${name}${company ? ` · ${company}` : ""}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          company ? `Company: ${company}` : null,
          `Type: ${type}`,
          `Budget: ${budget}`,
          ``,
          `Message:`,
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[contact] Resend error:", res.status, errBody);
      return NextResponse.json(
        { error: "Email delivery failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
