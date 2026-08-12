import { contactEmail } from "@/lib/contact";

type ContactPayload = {
  name?: unknown;
  business?: unknown;
  email?: unknown;
  websiteType?: unknown;
  message?: unknown;
};

const requiredFields = ["name", "business", "email", "websiteType", "message"] as const;

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;",
    };

    return entities[character] ?? character;
  });
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const inquiry = {
    name: asString(payload.name),
    business: asString(payload.business),
    email: asString(payload.email),
    websiteType: asString(payload.websiteType),
    message: asString(payload.message),
  };

  const missingFields = requiredFields.filter((field) => !inquiry[field]);
  if (missingFields.length > 0) {
    return Response.json({ error: "Please complete every field.", fields: missingFields }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email service is not configured yet." }, { status: 500 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? contactEmail;
  const from = process.env.CONTACT_FROM_EMAIL ?? "SAFA Website <onboarding@resend.dev>";
  const subject = `New SAFA website inquiry from ${inquiry.business || inquiry.name}`;
  const text = [
    `Name: ${inquiry.name}`,
    `Business: ${inquiry.business}`,
    `Email: ${inquiry.email}`,
    `Website type: ${inquiry.websiteType}`,
    "",
    "Project details:",
    inquiry.message,
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1d1b17">
      <h1 style="font-size:20px;margin:0 0 18px">New SAFA website inquiry</h1>
      <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
      <p><strong>Business:</strong> ${escapeHtml(inquiry.business)}</p>
      <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
      <p><strong>Website type:</strong> ${escapeHtml(inquiry.websiteType)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:20px 0" />
      <p style="white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>
    </div>
  `;

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "SAFA Website Contact Form",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: inquiry.email,
      subject,
      text,
      html,
    }),
  });

  if (!emailResponse.ok) {
    const detail = await emailResponse.text();
    console.error("Contact email failed:", detail);
    return Response.json({ error: "Email could not be sent." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
