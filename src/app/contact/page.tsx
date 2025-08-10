'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendContact } from './actions'

const initial = { ok: false, message: '' }

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(sendContact, initial)
  const [ts, setTs] = useState<number>(() => Date.now())
  const router = useRouter()

  useEffect(() => setTs(Date.now()), [])
  useEffect(() => { if (state.ok) setTimeout(() => router.push('/'), 2500) }, [state.ok, router])

  const inputBase =
    'mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-ink placeholder:text-ink/50 outline-none focus:ring-2 focus:ring-secondary/70'
  const labelBase = 'block text-sm text-ink/80'

  return (
    <section className="container mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold">Contacto</h1>
      <p className="mt-2 text-ink/80">Contanos sobre tu club y coordinamos una demo.</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <form action={formAction} className="space-y-4" noValidate>
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <input type="hidden" name="ts" value={ts} />

          <div>
            <label className={labelBase} htmlFor="name">Nombre y apellido</label>
            <input id="name" name="name" required className={inputBase} />
          </div>

          <div>
            <label className={labelBase} htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required className={inputBase} />
          </div>

          <div>
            <label className={labelBase} htmlFor="club">Club (opcional)</label>
            <input id="club" name="club" className={inputBase} />
          </div>

          <div>
            <label className={labelBase} htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows={5} required className={inputBase} placeholder="Queremos usar ClubGest en..." />
          </div>

          <button
            className="rounded-lg bg-secondary px-6 py-3 font-semibold text-black hover:bg-secondary/90 disabled:opacity-60"
            disabled={isPending}
          >
            {isPending ? 'Enviando…' : 'Enviar'}
          </button>
        </form>
      </div>
    </section>
  )
}
