import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ClubGest",
  description: "Tu club, en orden. Tu gente, conectada.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
