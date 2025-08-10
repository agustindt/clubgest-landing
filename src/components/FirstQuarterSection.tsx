import { CheckCircle2, Flag, Rocket, UsersRound, CalendarClock, Gauge, Bell, CreditCard } from "lucide-react";

export default function FirstQuarterSection() {
  const card =
    "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm h-full flex flex-col";
  const item = "flex items-start gap-3 text-ink/90";

  return (
    <section id="roadmap" className="border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <header className="max-w-3xl">
          <p className="text-sm uppercase tracking-wider text-ink/60">Hoja de ruta</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Fase del proyecto (0–3 meses)</h2>
          <p className="mt-2 text-ink/80">
            Qué cubrimos en los primeros 90 días para que tu club empiece a cobrar y organizarse sin fricción.
          </p>
        </header>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* Mes 1 */}
          <article className={card}>
            <div className="flex items-center gap-2 text-ink">
              <Flag size={18} />
              <h3 className="text-xl font-semibold">Mes 1 · Descubrimiento & Setup</h3>
            </div>

            <ul className="mt-4 space-y-3">
              <li className={item}>
                <CheckCircle2 size={18} />
                <span>Relevamiento: objetivos, reglamentos, categorías y flujos actuales.</span>
              </li>
              <li className={item}>
                <CalendarClock size={18} />
                <span>Plan de proyecto con hitos y responsables.</span>
              </li>
              <li className={item}>
                <UsersRound size={18} />
                <span>Alta de usuarios clave (tesorería, coordinación, capitanes).</span>
              </li>
              <li className={item}>
                <Gauge size={18} />
                <span>Setup técnico: entorno, dominios, correo y seguridad básica.</span>
              </li>
            </ul>

            <div className="mt-5 text-ink/70 text-sm">
              <strong>Entregable:</strong> Prototipo navegable + plan de implementación.
            </div>
          </article>

          {/* Mes 2 */}
          <article className={card}>
            <div className="flex items-center gap-2 text-ink">
              <Rocket size={18} />
              <h3 className="text-xl font-semibold">Mes 2 · MVP en producción</h3>
            </div>

            <ul className="mt-4 space-y-3">
              <li className={item}>
                <CheckCircle2 size={18} />
                <span>Inscripciones online y alta de categorías/jugadores.</span>
              </li>
              <li className={item}>
                <CreditCard size={18} />
                <span>Pagos online y conciliación básica de cuotas.</span>
              </li>
              <li className={item}>
                <Bell size={18} />
                <span>Recordatorios de pago y notificaciones (email/WhatsApp).</span>
              </li>
              <li className={item}>
                <Gauge size={18} />
                <span>Panel administrador: cuentas, morosos y reportes iniciales.</span>
              </li>
            </ul>

            <div className="mt-5 text-ink/70 text-sm">
              <strong>Entregable:</strong> MVP operando con primeros socios reales.
            </div>
          </article>

          {/* Mes 3 */}
          <article className={card}>
            <div className="flex items-center gap-2 text-ink">
              <UsersRound size={18} />
              <h3 className="text-xl font-semibold">Mes 3 · Piloto & Optimización</h3>
            </div>

            <ul className="mt-4 space-y-3">
              <li className={item}>
                <CheckCircle2 size={18} />
                <span>Piloto con un club aliado (ej.: Folgore Castelvetrano) y feedback continuo.</span>
              </li>
              <li className={item}>
                <Gauge size={18} />
                <span>Métricas clave: conversión de inscripción, cobro en fecha, tickets resueltos.</span>
              </li>
              <li className={item}>
                <CalendarClock size={18} />
                <span>Roadmap Q2: calendario deportivo, tienda e indumentaria, mejoras de UX.</span>
              </li>
            </ul>

            <div className="mt-5 text-ink/70 text-sm">
              <strong>Entregable:</strong> Informe de resultados + plan de escalado.
            </div>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/contact"
            className="rounded-lg bg-secondary px-5 py-3 font-semibold text-black hover:bg-secondary/90"
          >
            Agendar demo
          </a>
          <a
            href="#features"
            className="rounded-lg border border-white/15 px-5 py-3 font-semibold text-ink/90 hover:bg-white/5"
          >
            Ver funcionalidades
          </a>
        </div>
      </div>
    </section>
  );
}
