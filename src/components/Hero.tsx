"use client"

import { motion } from "framer-motion"
import Image from 'next/image';


export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0b1f3a] via-[#0a172e] to-[#0b1f3a]">
      {/* Glows de color */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />

      <div className="container relative mx-auto grid items-center gap-10 px-6 py-24 md:grid-cols-2">
        {/* Texto */}
        <div className="text-ink">
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ordená tu club en días, no en meses.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-lg sm:text-xl text-ink/80"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Inscripciones, pagos y calendario en un solo lugar. Menos planillas,
            menos mensajes perdidos y más tiempo para el deporte. ClubGest lo hace simple.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="#contact"
              className="rounded-xl bg-secondary px-6 py-3 text-lg font-semibold text-black hover:bg-secondary/90"
            >
              Solicitar demo
            </a>
            <a href="#features" className="text-ink/80 underline decoration-accent/70 underline-offset-4">
              Ver características
            </a>
          </motion.div>
        </div>
<div className="hidden md:block">
  <div className="relative h-[340px] w-full rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
    <Image
      src="/images/ClubGest.svg"
      alt="Vista de ClubGest"
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
      className="object-cover"
      priority
    />
  </div>
</div>


      </div>
    </section>
  )
}
