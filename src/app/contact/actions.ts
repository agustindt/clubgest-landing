'use server'

import { Resend, type CreateEmailOptions } from 'resend'
import { z } from 'zod'
import {
  adminEmailHtml, userEmailHtml,
  adminEmailText, userEmailText
} from './emails-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactSchema = z.object({
  name: z.string().min(2, 'Completá tu nombre.'),
  email: z.string().trim().toLowerCase().email('Email inválido.'),
  club: z.string().optional().default(''),
  message: z.string().min(10, 'Contanos un poco más en el mensaje.'),
  website: z.string().max(0).optional(),
  ts: z.coerce.number().optional(),
})

type ActionState = { ok: boolean; message: string }

export async function sendContact(prev: ActionState, formData: FormData): Promise<ActionState> {
  // ... (honeypot/timing/parse como ya tenés)
  const parsed = ContactSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? 'Datos inválidos.' }
  }
  const { name, email, club, message } = parsed.data
  const userEmail = email.trim().toLowerCase()

  const FROM = process.env.CONTACT_FROM || 'ClubGest <onboarding@resend.dev>'
  const TO   = process.env.CONTACT_TO   || 'clubgestonline@gmail.com'

  const when = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Argentina/Cordoba',
  }).format(new Date())

  // ⚠️ No uses `as const` acá (convierte arrays a readonly)
  const adminPayload: CreateEmailOptions = {
    from: FROM,
    to: [TO],                        // string[]
    replyTo: userEmail,              // OK en v6
    subject: `Nuevo contacto - ClubGest (${name})`,
    html: adminEmailHtml({ name, email: userEmail, club, message, when, brand: 'ClubGest', brandUrl: 'https://clubgest.vercel.app' }),
    text: adminEmailText({ name, email: userEmail, club, message, when, brand: 'ClubGest', brandUrl: 'https://clubgest.vercel.app' }),
    tags: [{ name: 'form', value: 'contact' }],   // Tag[]
  }

  const userPayload: CreateEmailOptions = {
    from: FROM,
    to: [userEmail],
    subject: 'Recibimos tu mensaje — ClubGest',
    html: userEmailHtml({
      name, club, message,
      brand: 'ClubGest', brandUrl: 'https://clubgest.vercel.app',
      replyTimeHint: '24–48 h',
    }),
    text: userEmailText({
      name, club, message,
      brand: 'ClubGest', brandUrl: 'https://clubgest.vercel.app',
      replyTimeHint: '24–48 h',
    }),
    tags: [{ name: 'form', value: 'contact-confirmation' }],
  }

  const [adminRes, userRes] = await Promise.all([
    resend.emails.send(adminPayload),
    resend.emails.send(userPayload),
  ])

  if (adminRes.error) {
    console.error('[Resend admin error]', adminRes.error)
    return { ok: false, message: adminRes.error.message || 'No pudimos enviar el mensaje.' }
  }
  if (userRes.error) {
    console.error('[Resend user error]', userRes.error)
    // no bloqueamos el éxito del admin
  }

  return { ok: true, message: '¡Gracias! Te enviamos un correo de confirmación.' }
}
