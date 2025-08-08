'use client'

import { motion, type Variants } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Calendar, BarChart2, Bell, CreditCard, Users, ClipboardList } from "lucide-react"

// Datos de cada feature
const items = [
  { icon: Users,         title: "Inscripciones simples",  desc: "Alta y gestión de categorías y jugadores en minutos." },
  { icon: CreditCard,    title: "Pagos online",           desc: "Cobranzas con MercadoPago o Stripe, todo integrado." },
  { icon: Calendar,      title: "Calendario unificado",   desc: "Entrenamientos, partidos y eventos en un solo lugar." },
  { icon: ClipboardList, title: "Estadísticas",           desc: "Goles, asistencias, tarjetas y minutos jugados." },
  { icon: Bell,          title: "Notificaciones",         desc: "Recordatorios por email/push para pagos y horarios." },
  { icon: BarChart2,     title: "Reportes claros",        desc: "Pagos al día, deudas y métricas clave en tiempo real." },
]

// Animación contenedora (stagger)
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

// Animación de cada item
const item: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "tween", duration: 0.28, ease: "easeOut" },
  },
}

export default function Features() {
  return (
    <section id="features" className="w-full bg-[#0a172e] py-20">
      <div className="container mx-auto px-6">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-ink text-3xl sm:text-4xl font-bold tracking-tight">
            Todo lo que tu club necesita
          </h2>
          <p className="mt-3 text-ink/70">
            Simple, completo y listo para crecer.
          </p>
        </div>

        {/* Grid animada */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={item}>
              <Card className="group relative border border-white/10 bg-white/5 backdrop-blur-sm p-6 rounded-2xl
                                hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 transition-transform">
                {/* borde/acento animado */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-accent/50" />

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-accent/20 p-3 ring-1 ring-accent/30">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-ink font-semibold text-lg">{title}</h3>
                    <p className="mt-1 text-ink/70 text-sm">{desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
