// src/app/contact/email-templates.ts
type Base = {
  brand?: string;           // "ClubGest"
  brandUrl?: string;        // link a tu web
  primary?: string;         // color principal
  border?: string;          // color de borde
  when?: string;            // fecha/hora formateada
};

type AdminData = Base & {
  name: string;
  email: string;
  club?: string;
  message: string;
};

type UserData = Base & {
  name: string;
  club?: string;
  message: string;
  replyTimeHint?: string;   // "24-48 h"
};

export function adminEmailHtml(d: AdminData) {
  const brand = d.brand ?? "ClubGest";
  const brandUrl = d.brandUrl ?? "https://clubgest.vercel.app";
  const primary = d.primary ?? "#0ea5e9";        // celeste
  const border = d.border ?? "rgba(2,6,23,0.08)"; // borde suave
  const when = d.when ?? "";

  const preheader = `${brand}: nuevo contacto de ${d.name}`;
  return `
  <!doctype html>
  <html lang="es">
  <head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>${brand} — Nuevo contacto</title>
    <style>
      .preheader { display:none!important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; }
      @media (max-width: 640px){ .container{ width:100%!important; } .card{ padding:20px !important; } }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#f6f7fb;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <span class="preheader">${preheader}</span>
    <table width="100%" role="presentation" cellspacing="0" cellpadding="0" style="background:#f6f7fb;padding:24px 12px;">
      <tr>
        <td align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" role="presentation" style="width:600px;background:#ffffff;border:1px solid ${border};border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#0b1f3a;padding:20px 24px;">
                <a href="${brandUrl}" style="text-decoration:none;color:#fff;font-weight:700;font-size:18px;letter-spacing:.2px;">${brand}</a>
              </td>
            </tr>
            <tr>
              <td class="card" style="padding:28px;">
                <h1 style="margin:0 0 12px;font-size:20px;color:#0f172a;">Nuevo mensaje de contacto</h1>
                ${when ? `<p style="margin:0 0 16px;color:#334155;font-size:14px;">${escapeHtml(when)}</p>` : ""}
                <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse;margin:10px 0 18px;">
                  ${row("Nombre", d.name)}
                  ${row("Email", d.email)}
                  ${d.club ? row("Club", d.club) : ""}
                </table>

                <p style="margin:0 0 8px;color:#0f172a;font-weight:600;">Mensaje</p>
                <div style="background:#f8fafc;border:1px solid ${border};border-radius:10px;padding:14px;white-space:pre-wrap;line-height:1.55;color:#0f172a;">${escapeHtml(d.message)}</div>

                <div style="margin-top:20px;">
                  <a href="mailto:${encodeURIComponent(d.email)}" style="display:inline-block;background:${primary};color:#000;font-weight:600;text-decoration:none;padding:10px 14px;border-radius:10px;border:1px solid rgba(2,6,23,0.12);">Responder a ${escapeHtml(d.name)}</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px;border-top:1px solid ${border};color:#64748b;font-size:12px;">
                Recibiste este correo porque alguien completó el formulario de contacto en <a href="${brandUrl}" style="color:#475569;text-decoration:underline;">${brandUrl.replace(/^https?:\/\//,"")}</a>.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export function userEmailHtml(d: UserData) {
  const brand = d.brand ?? "ClubGest";
  const brandUrl = d.brandUrl ?? "https://clubgest.vercel.app";
  const primary = d.primary ?? "#0ea5e9";
  const border = d.border ?? "rgba(2,6,23,0.08)";
  const replyTimeHint = d.replyTimeHint ?? "24–48 h";

  const preheader = `¡Gracias! Recibimos tu mensaje. Te respondemos en ${replyTimeHint}.`;
  return `
  <!doctype html>
  <html lang="es">
  <head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>${brand} — Recibimos tu mensaje</title>
    <style>
      .preheader { display:none!important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; }
      @media (max-width: 640px){ .container{ width:100%!important; } .card{ padding:20px !important; } }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#f6f7fb;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <span class="preheader">${preheader}</span>
    <table width="100%" role="presentation" cellspacing="0" cellpadding="0" style="background:#f6f7fb;padding:24px 12px;">
      <tr>
        <td align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" role="presentation" style="width:600px;background:#ffffff;border:1px solid ${border};border-radius:14px;overflow:hidden;">
            <tr>
              <td style="background:#0b1f3a;padding:20px 24px;">
                <a href="${brandUrl}" style="text-decoration:none;color:#fff;font-weight:700;font-size:18px;letter-spacing:.2px;">${brand}</a>
              </td>
            </tr>
            <tr>
              <td class="card" style="padding:28px;">
                <h1 style="margin:0 0 12px;font-size:20px;color:#0f172a;">¡Gracias por escribirnos, ${escapeHtml(d.name)}!</h1>
                <p style="margin:0 0 14px;color:#334155;font-size:14px;">Recibimos tu mensaje y te vamos a responder dentro de <b>${replyTimeHint}</b>.</p>
                ${d.club ? `<p style="margin:0 0 14px;color:#334155;font-size:14px;">Club: <b>${escapeHtml(d.club)}</b></p>` : ""}

                <p style="margin:0 0 8px;color:#0f172a;font-weight:600;">Copia de tu mensaje</p>
                <div style="background:#f8fafc;border:1px solid ${border};border-radius:10px;padding:14px;white-space:pre-wrap;line-height:1.55;color:#0f172a;">${escapeHtml(d.message)}</div>

                <p style="margin:16px 0 0;color:#334155;font-size:14px;">Si necesitás sumar info, simplemente respondé este correo.</p>

                <div style="margin-top:20px;">
                  <a href="${brandUrl}" style="display:inline-block;background:${primary};color:#000;font-weight:600;text-decoration:none;padding:10px 14px;border-radius:10px;border:1px solid rgba(2,6,23,0.12);">Volver al sitio</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px;border-top:1px solid ${border};color:#64748b;font-size:12px;">
                Enviado por ${brand}. Si no fuiste vos quien envió este mensaje, podés ignorar este correo.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export function adminEmailText(d: AdminData) {
  return `Nuevo contacto

Nombre: ${d.name}
Email: ${d.email}
Club: ${d.club ?? "-"}

Mensaje:
${d.message}
${d.when ? `\nEnviado: ${d.when}` : ""}

— ${d.brand ?? "ClubGest"}`;
}

export function userEmailText(d: UserData) {
  return `Hola ${d.name},

¡Gracias por escribirnos! Recibimos tu mensaje${
    d.club ? ` (Club: ${d.club})` : ""
  } y te vamos a responder dentro de ${d.replyTimeHint ?? "24–48 h"}.

Copia de tu mensaje:
${d.message}

— ${d.brand ?? "ClubGest"}  ${d.brandUrl ? `(${d.brandUrl})` : ""}`;
}

// util
function row(label: string, value: string) {
  return `
  <tr>
    <td style="padding:6px 0;color:#475569;font-size:14px;width:120px;">${label}</td>
    <td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
  </tr>`;
}

function escapeHtml(str: string) {
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
