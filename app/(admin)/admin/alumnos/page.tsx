import React from 'react'

export default function AlumnosPage() {
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
    <div>AlumnosPage</div>
    </main>
  )
}
