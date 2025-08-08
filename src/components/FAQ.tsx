export default function FAQ() {
  const faqs = [
    { q: "¿Necesito instalar algo?", a: "No. Es 100% web, funciona en cualquier navegador." },
    { q: "¿Cómo se cobra?", a: "Por suscripción mensual. Planes según tamaño de club." },
    { q: "¿Qué pagos integran?", a: "MercadoPago para LATAM y Stripe para internacional." },
    { q: "¿Soporte?", a: "Sí. Onboarding y soporte continuo según el plan." },
  ]

  return (
    <section id="faq" className="bg-[#0a172e] py-20">
      <div className="container mx-auto max-w-2xl px-6">
        <h2 className="text-ink text-center text-3xl sm:text-4xl font-bold">Preguntas frecuentes</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer text-ink font-semibold">{f.q}</summary>
              <p className="mt-2 text-ink/80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
