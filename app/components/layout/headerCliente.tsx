"use client";
import { useState, useEffect } from "react";
import { Navbar } from "../view/navbar";
import { PrimaryLink } from "../ui/primaryButton";

export function HeaderClient() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <button
        className="xm:hidden text-3xl p-2 hover:bg-gray-100 rounded transition-colors"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        {open ? "✕" : "☰"}
      </button>

      <div className="hidden xm:flex items-center gap-6">
        <Navbar />
        <PrimaryLink href="/login">Iniciar Sesión</PrimaryLink>
      </div>

      {open && (
        <div
          className="absolute top-full left-0 right-0 bg-white shadow-xl border-b-2 border-gray-200
                     flex flex-col items-center gap-4 p-6 xm:hidden z-50"
        >
          <Navbar className="flex flex-col gap-4 w-full text-center border-b-2 border-gray-200 pb-4" />
          <PrimaryLink href="/login">Iniciar Sesión</PrimaryLink>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xm:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
