'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendContact } from './actions'

const initial = { ok: false, message: '' }

export default function ContactPage() {
  const [state, formAction] = useActionState(sendContact, initial)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const router = useRouter()

  // Modal de éxito + redirección
  useEffect(() => {
    if (state.ok) {
      setShowSuccess(true)
      const t = setTimeout(() => router.push('/'), 2500)
      return () => clearTimeout(t)
    }
  }, [state.ok, router])

  // Toast de error
  useEffect(() => {
    if (!state.ok && state.message) {
      setShowError(true)
      const t = setTimeout(() => setShowError(false), 3000)
      return () => clearTimeout(t)
    }
  }, [state.ok, state.message])

  return (
    <main className="min-h-[70vh] bg-[#0a172e] text-ink relative">
      {/* Toast de error */}
      {showError && (
        <div className="fixed top-4 left-1/2 z-50 w-fit -translate-x-1/2 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-200 shadow-lg backdrop-blur-sm animate-slideDown">
          {state.message}
        </div>
      )}

      <section className="container mx-auto px-6 py-16 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold">Contacto</h1>
        <p className="mt-2 text-ink/80">Contanos sobre tu club y coordinamos una demo.</p>

        <form action={formAction} className="mt-8 space-y-4">
          {/* Honeypot */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label className="block text-sm text-ink/80">Nombre y apellido</label>
            <input name="name" required
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-ink outline-none focus:border-accent" />
          </div>

          <div>
            <label className="block text-sm text-ink/80">Email</label>
            <input type="email" name="email" required
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-ink outline-none focus:border-accent" />
          </div>

          <div>
            <label className="block text-sm text-ink/80">Club (opcional)</label>
            <input name="club"
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-ink outline-none focus:border-accent" />
          </div>

          <div>
            <label className="block text-sm text-ink/80">Mensaje</label>
            <textarea name="message" rows={5} required
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-ink outline-none focus:border-accent"
              placeholder="Queremos usar ClubGest en..." />
          </div>

          <button
            className="rounded-lg bg-secondary px-6 py-3 font-semibold text-black hover:bg-secondary/90"
          >
            Enviar
          </button>
        </form>
      </section>

      {/* Modal de éxito */}
      {showSuccess && (
        <SuccessModal message={state.message || '¡Mensaje enviado con éxito! Redirigiendo…'} />
      )}
    </main>
  )
}

/* ---------- Modal de éxito ---------- */
function SuccessModal({ message }: { message: string }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-2xl border border-emerald-300/30 bg-[#0b1f3a] p-6 text-ink shadow-xl animate-scaleIn">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-3 w-3 shrink-0 rounded-full bg-accent shadow-[0_0_20px] shadow-accent/60" />
          <h3 className="text-xl font-semibold">¡Listo!</h3>
        </div>
        <p className="mt-3 text-ink/80">{message}</p>
        <div className="mt-6 text-sm text-ink/60">
          Serás redirigido a la página principal en unos segundos…
        </div>
      </div>
    </div>
  )
}
