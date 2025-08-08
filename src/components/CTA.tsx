"use client"

import { motion } from "framer-motion"

export default function CTA() {
  return (
    <section className="relative w-full overflow-hidden bg-[#08142A] py-20">
      {/* glows sutiles */}
      <div className="pointer-events-none absolute -top-10 left-10 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-56 w-56 rounded-full bg-accent/25 blur-3xl" />

      <div className="relative container mx-auto px-6 text-center">
        <motion.h2
          className="text-ink text-3xl sm:text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          ¿Listo para modernizar tu club?
        </motion.h2>

        <motion.p
          className="mt-3 text-ink/80 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Inscripciones, pagos y calendario en un solo lugar. Empezá con una demo sin compromiso.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35, delay: 0.15, type: "tween", ease: "easeOut" }}
        >
          <a
            href="/contact" // ← lleva al form de contacto
            className="inline-block rounded-xl bg-secondary px-8 py-4 text-lg font-semibold text-black hover:bg-secondary/90"
          >
            Solicitar demo
          </a>
        </motion.div>

        <motion.p
          className="mt-3 text-sm text-ink/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          ¿Preferís email?{" "}
          <a
            className="underline decoration-accent/70 underline-offset-4 hover:text-ink"
            href="mailto:hola@clubgest.com?subject=Quiero%20una%20demo%20de%20ClubGest"
          >
            hola@clubgest.com
          </a>
        </motion.p>
      </div>
    </section>
  )
}
