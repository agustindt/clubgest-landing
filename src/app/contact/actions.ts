'use server'

import { Resend } from 'resend'
import { z } from 'zod'

/**
 * Necesario en .env.local
 * RESEND_API_KEY=...
 * CONTACT_TO=tuemail@tu-dominio.com
 * CONTACT_FROM="ClubGest <contact@tu-dominio.com>"
 */

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactSchema = z.object({
  name: z.string().min(2, 'Completá tu nombre.'),
  email: z.string().email('Email inválido.'),
  club: z.string().optional().default(''),
  message: z.string().min(10, 'Contanos un poco más en el mensaje.'),
  website: z.string().max(0).optional(),  // honeypot (debe quedar vacío)
  ts: z.coerce.number().optional(),       // timestamp de carga
})

type ActionState = { ok: boolean; message: string }

export async function sendContact(prev: ActionState, formData: FormData): Promise<ActionState> {
  // Parseo + validación
  const data = Object.fromEntries(formData) as Record<string, string>
  const parsed = ContactSchema.safeParse(data)

  // Honeypot
  if (data.website && data.website.trim() !== '') {
    return { ok: false, message: 'Spam detectado.' }
  }

  // Anti-bots rápidos (>= 3s en la vista)
  const now = Date.now()
  const ts = Number(data.ts ?? 0)
  if (!Number.isNaN(ts) && now - ts < 3000) {
    return { ok: false, message: 'Por favor, revisá los datos antes de enviar.' }
  }

  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Datos inválidos.'
    return { ok: false, message: msg }
  }

  const { name, email, club, message } = parsed.data

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to: process.env.CONTACT_TO!,
      replyTo: email,
      subject: `Nuevo contacto - ClubGest (${name})`,
      text:
`Nombre: ${name}
Email: ${email}
Club: ${club}
Mensaje:
${message}`,
      // Si querés HTML, podés agregarlo acá.
    })

    return { ok: true, message: '¡Gracias! Te responderemos a la brevedad.' }
  } catch (err) {
    console.error('[sendContact] Error enviando email:', err)
    return { ok: false, message: 'No pudimos enviar el mensaje. Probá de nuevo.' }
  }
}
