'use server'

import { Resend } from 'resend'

/**
 * Variables necesarias en .env.local:
 *
 * RESEND_API_KEY=tu_api_key_de_resend
 * CONTACT_TO=tuemail@tu-dominio.com                # destino (vos)
 * CONTACT_FROM=ClubGest <contact@tu-dominio.com>   # remitente verificado en Resend
 */

const resend = new Resend(process.env.RESEND_API_KEY)

type ActionState = {
  ok: boolean
  message: string
}

export async function sendContact(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // honeypot anti-spam
  const honey = (formData.get('website') as string | null)?.trim()
  if (honey) return { ok: false, message: 'Spam detectado.' }

  const name = (formData.get('name') as string | null)?.trim() || ''
  const email = (formData.get('email') as string | null)?.trim() || ''
  const club = (formData.get('club') as string | null)?.trim() || ''
  const message = (formData.get('message') as string | null)?.trim() || ''

  if (!name || !email || !message) {
    return { ok: false, message: 'Completá nombre, email y mensaje.' }
  }

  // Validaciones mínimas
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) return { ok: false, message: 'Email inválido.' }
  if (message.length < 10) return { ok: false, message: 'Contanos un poco más en el mensaje.' }

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
      // Si querés HTML:
      // html: `<p><b>Nombre:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Club:</b> ${club}</p><p>${message.replace(/\n/g, '<br/>')}</p>`
    })

    return { ok: true, message: '¡Gracias! Te responderemos a la brevedad.' }
  } catch (err) {
    console.error('[sendContact] Error enviando email:', err)
    return { ok: false, message: 'No pudimos enviar el mensaje. Probá de nuevo.' }
  }
}
