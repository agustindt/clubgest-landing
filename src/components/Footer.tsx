import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b1f3a]">
      <div className="container mx-auto grid gap-6 px-6 py-10 md:grid-cols-3">
        <div>
          {/* Logo */}
          <Image
            src="/images/Logo.png"
            alt="ClubGest Logo"
            width={40}
            height={40}
            className="mb-3"
            priority
          />
          <div className="text-ink/80">
            ClubGest © {new Date().getFullYear()}
          </div>
        </div>

        <nav className="text-ink/80">
          <a href="#features" className="block hover:text-ink">Características</a>
          <a href="#pricing" className="block hover:text-ink">Precios</a>
          <a href="#faq" className="block hover:text-ink">FAQ</a>
        </nav>

        <div id="contact" className="text-ink/80">
          <div className="font-semibold text-ink">Contacto</div>
          <a className="hover:text-ink" href="mailto:hola@clubgest.com">
            hola@clubgest.com
          </a>
          <div className="mt-2">Córdoba, Argentina</div>
        </div>
      </div>
    </footer>
  );
}
