const plans = [
  {
    name: "Inicial",
    price: "USD XX / mes",
    desc: "Para clubes chicos que recién empiezan.",
    features: ["Hasta 100 jugadores", "Inscripciones y pagos", "Calendario y notificaciones"],
  },
  {
    name: "Recomendado",
    highlight: true,
    price: "USD XX / mes",
    desc: "El balance ideal para la mayoría.",
    features: ["Hasta 300 jugadores", "Reportes y estadísticas", "Soporte prioritario"],
  },
  {
    name: "Pro",
    price: "USD XX / mes",
    desc: "Para clubes grandes o multi-deporte.",
    features: ["300+ jugadores", "Módulos avanzados", "Soporte dedicado"],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#0a172e] py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-ink text-center text-3xl sm:text-4xl font-bold">Precios simples</h2>
        <p className="mt-3 text-center text-ink/70">Escalables por tamaño de club. Sin letras chicas.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-6 ${
                p.highlight ? "border-accent bg-white/10" : "border-white/10 bg-white/5"
              }`}
            >
              <h3 className="text-ink text-xl font-semibold">{p.name}</h3>
              <div className="mt-2 text-ink/90 text-2xl font-bold">{p.price}</div>
              <p className="mt-1 text-ink/70">{p.desc}</p>
              <ul className="mt-4 space-y-2 text-ink/80">
                {p.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-6 inline-block w-full rounded-lg bg-secondary px-4 py-2 text-center font-semibold text-black hover:bg-secondary/90"
              >
                Empezar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
