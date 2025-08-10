"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b1f3a]/70 backdrop-blur">
      {/* altura fija del header */}
      <div className="container mx-auto flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3" aria-label="Ir al inicio">
            {/* logo alto controlado y ancho largo */}
            <div className="relative h-10 w-56 md:w-64 lg:w-72">
              <Image
                src="/images/LogoHeader.png"
                alt="ClubGest"
                fill
                className="object-fill"
                priority
                sizes="(max-width: 768px) 224px, (max-width: 1200px) 256px, 288px"
              />
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-ink/80">
          <a href="#features" className="hover:text-ink">Características</a>
          <a href="#pricing" className="hover:text-ink">Precios</a>
          <a href="#faq" className="hover:text-ink">FAQ</a>
          <a
            href="#contact"
            className="rounded-lg bg-secondary px-4 py-2 font-semibold text-black hover:bg-secondary/90"
          >
            Solicitar demo
          </a>
        </nav>

        <button
          className="md:hidden rounded-lg border border-white/20 px-3 py-2 text-ink"
          onClick={() => setOpen(!open)}
        >
          Menú
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0b1f3a]/95">
          <div className="container mx-auto flex flex-col gap-2 px-6 py-4">
            <a onClick={() => setOpen(false)} href="#features" className="text-ink/90">Características</a>
            <a onClick={() => setOpen(false)} href="#pricing" className="text-ink/90">Precios</a>
            <a onClick={() => setOpen(false)} href="#faq" className="text-ink/90">FAQ</a>
            <a
              onClick={() => setOpen(false)}
              href="#contact"
              className="mt-2 rounded-lg bg-secondary px-4 py-2 font-semibold text-black hover:bg-secondary/90"
            >
              Solicitar demo
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
