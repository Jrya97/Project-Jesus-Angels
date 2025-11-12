"use client";

import { useState } from "react";
import FormApoderado from "@/app/components/view/formularioApoderado";
import FormAlumno from "@/app/components/view/formularioAlumno";

export default function MatriculaPage() {
  const [step, setStep] = useState(1);

  return (
    <main className="w-full h-full min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/Fondo-Admin.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute top-0 left-0 w-full h-full bg-white/50 -z-10"></div>
      
      <section className="w-full max-w-4xl relative z-10">
        <article className="bg-white/55 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Paso {step}: Datos del {step === 1 ? "Apoderado" : "Alumno"}
            </h3>
            <p className="text-gray-600 text-sm">
              {step === 1 
                ? "Complete la información del representante legal"
                : "Complete la información del estudiante"
              }
            </p>
          </div>
          {step === 1 && <FormApoderado onSuccess={() => setStep(2)} />}
          {step === 2 && <FormAlumno />}
        </article>
      </section>
    </main>
  );
}