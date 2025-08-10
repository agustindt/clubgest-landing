"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Ingresá tu nombre"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "Contame un poco más (mínimo 10 caracteres)"),
  honeypot: z.string().optional(), // campo oculto anti-bots
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Error enviando el mensaje");
      }

      reset();
      alert("¡Mensaje enviado! Te responderemos a la brevedad.");
      router.push("/");
    } catch (e: any) {
      alert(e.message || "No se pudo enviar el mensaje. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      {/* Honeypot oculto */}
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label className="block text-sm mb-1">Nombre</label>
        <input
          {...register("name")}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30"
          placeholder="Tu nombre"
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30"
          placeholder="tu@email.com"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-1">Teléfono (opcional)</label>
        <input
          {...register("phone")}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30"
          placeholder="+54 9 ..."
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Mensaje</label>
        <textarea
          rows={5}
          {...register("message")}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-white/30"
          placeholder="Contanos qué necesitás…"
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-xl px-4 py-2 border border-white/10 bg-white/10 hover:bg-white/20 transition disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
