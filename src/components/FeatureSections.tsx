// src/components/FeatureSections.tsx
import Image from "next/image";
interface FeatureProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

const Feature = ({ title, description, image, reverse }: FeatureProps) => {
  return (
    <section
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-8 py-16`}
    >
      {/* Imagen */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-full max-w-lg">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Texto */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
    </section>
  );
};

export default function FeatureSections() {
  return (
    <div className="bg-[#0a172e] px-6 md:px-20">
      <Feature
        title="Inscripciones simples"
        description="Da de alta y gestiona categorías y jugadores en minutos, con un panel intuitivo y accesible."
        image="/images/managments.svg"
      />
      <Feature
        title="Pagos online"
        description="Integra MercadoPago o Stripe para cobrar inscripciones y cuotas de forma rápida y segura."
        image="/images/payments.svg"
        reverse
      />
      <Feature
        title="Calendario unificado"
        description="Entrenamientos, partidos y eventos en un solo lugar para que nadie se pierda nada."
        image="/images/matchs.svg"
      />
      <Feature
        title="Estadísticas"
        description="Consulta goles, asistencias, tarjetas y minutos jugados por cada jugador."
        image="/images/stadistics.svg"
        reverse
      />
      <Feature
        title="Notificaciones"
        description="Recordatorios por email y push para pagos, entrenamientos y partidos."
        image="/images/notifications.svg"
      />
      <Feature
        title="Reportes claros"
        description="Visualiza pagos al día, deudas y métricas clave en tiempo real."
        image="/images/reports.svg"
        reverse
      />
    </div>
  );
}
