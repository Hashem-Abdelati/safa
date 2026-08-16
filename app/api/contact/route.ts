import { contactEmail } from "@/lib/contact";
import { checkRateLimit, rateLimitHeaders } from "@/lib/server/rate-limit";

type ContactPayload = {
  name?: unknown;
  business?: unknown;
  email?: unknown;
  websiteType?: unknown;
  message?: unknown;
  website?: unknown;
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
  const rateLimit = checkRateLimit(request, "contact", {
    limit: 5,
    windowMs: 15 * 60 * 1_000,
  });
  const responseHeaders = rateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Too many inquiries. Please wait a few minutes and try again." },
      { status: 429, headers: responseHeaders },
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400, headers: responseHeaders });
  }

  // Honeypot: real visitors never see or fill this field.
  if (asString(payload.website)) {
    return Response.json({ ok: true }, { headers: responseHeaders });
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
    return Response.json(
      { error: "Please complete every field.", fields: missingFields },
      { status: 400, headers: responseHeaders },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400, headers: responseHeaders },
    );
  }

  if (
    inquiry.name.length > 100 ||
    inquiry.business.length > 160 ||
    inquiry.email.length > 254 ||
    inquiry.websiteType.length > 100 ||
    inquiry.message.length > 5_000
  ) {
    return Response.json(
      { error: "One or more fields are too long." },
      { status: 400, headers: responseHeaders },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email service is not configured yet." },
      { status: 500, headers: responseHeaders },
    );
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
    return Response.json(
      { error: "Email could not be sent." },
      { status: 502, headers: responseHeaders },
    );
  }

  return Response.json({ ok: true }, { headers: responseHeaders });
}
