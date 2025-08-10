// src/app/contact/page.tsx
'use client'

import { useActionState, useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { sendContact } from './actions'

const initial = { ok: false, message: '' }

// Validación en cliente
const ClientSchema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre completo'),
  email: z.string().email('Email inválido'),
  club: z.string().optional(),
  message: z.string().min(10, 'Contanos un poco más (mín. 10 caracteres)'),
})

type FieldErrors = { name?: string; email?: string; message?: string }

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(sendContact, initial)
  const [ts, setTs] = useState<number>(() => Date.now())
  const [errors, setErrors] = useState<FieldErrors>({})
  const [isTrans, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => setTs(Date.now()), [])
  useEffect(() => { if (state.ok) setTimeout(() => router.push('/'), 2500) }, [state.ok, router])

  const inputBase =
    'mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-ink placeholder:text-ink/50 outline-none focus:ring-2'
  const labelBase = 'block text-sm text-ink/80'
  const focusOk = ' focus:ring-secondary/70'
  const focusErr = ' focus:ring-red-400'

  function mapIssues(issues: z.ZodIssue[]): FieldErrors {
    const fe: FieldErrors = {}
    for (const i of issues) {
      const k = i.path[0] as keyof FieldErrors
      fe[k] = i.message
    }
    return fe
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const obj = Object.fromEntries(fd) as Record<string, string>

    const parsed = ClientSchema.safeParse({
      name: obj.name,
      email: obj.email,
      club: obj.club || undefined,
      message: obj.message,
    })

    if (!parsed.success) {
      setErrors(mapIssues(parsed.error.issues))
      return
    }

    setErrors({})
    // ✅ Llamar la server action dentro de una transición (sin await)
    startTransition(() => {
      formAction(fd)
    })
  }

  return (
    <section className="container mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold">Contacto</h1>
      <p className="mt-2 text-ink/80">Contanos sobre tu club y coordinamos una demo.</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {/* Honeypot + timestamp para la Server Action */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="ts" value={ts} />

          <div>
            <label className={labelBase} htmlFor="name">Nombre y apellido</label>
            <input
              id="name"
              name="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'err-name' : undefined}
              className={inputBase + (errors.name ? focusErr + ' border-red-500/60' : focusOk)}
              onBlur={(e) => {
                const v = e.currentTarget.value
                const r = z.string().min(2, 'Ingresá tu nombre completo').safeParse(v)
                setErrors((prev) => ({ ...prev, name: r.success ? undefined : r.error.issues[0].message }))
              }}
            />
            {errors.name && <p id="err-name" className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label className={labelBase} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'err-email' : undefined}
              className={inputBase + (errors.email ? focusErr + ' border-red-500/60' : focusOk)}
              onBlur={(e) => {
                const v = e.currentTarget.value
                const r = z.string().email('Email inválido').safeParse(v)
                setErrors((prev) => ({ ...prev, email: r.success ? undefined : r.error.issues[0].message }))
              }}
            />
            {errors.email && <p id="err-email" className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label className={labelBase} htmlFor="club">Club (opcional)</label>
            <input id="club" name="club" className={inputBase + focusOk} />
          </div>

          <div>
            <label className={labelBase} htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'err-message' : undefined}
              className={inputBase + (errors.message ? focusErr + ' border-red-500/60' : focusOk)}
              placeholder="Queremos usar ClubGest en..."
              onBlur={(e) => {
                const v = e.currentTarget.value
                const r = z.string().min(10, 'Contanos un poco más (mín. 10 caracteres)').safeParse(v)
                setErrors((prev) => ({ ...prev, message: r.success ? undefined : r.error.issues[0].message }))
              }}
            />
            {errors.message && <p id="err-message" className="mt-1 text-sm text-red-400">{errors.message}</p>}
          </div>

          <button
            className="rounded-lg bg-secondary px-6 py-3 font-semibold text-black hover:bg-secondary/90 disabled:opacity-60"
            disabled={isPending || isTrans}
          >
            {isPending || isTrans ? 'Enviando…' : 'Enviar'}
          </button>

          {/* Estado global desde la Server Action */}
          {state.message && (
            <p aria-live="polite" role="status" className={`text-sm ${state.ok ? 'text-green-400' : 'text-red-400'}`}>
              {state.message}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
