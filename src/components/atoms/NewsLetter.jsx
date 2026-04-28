import { Button } from "./Button";
import { Input } from "./Input";
import React, { useState } from "react";
import { Mail } from "lucide-react";

export function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
  };

  return (
    <section className="bg-[#faf3dd] rounded-3xl p-10 md:p-16 border border-[#c8d5b9] text-center space-y-8 relative overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        {/* Icon */}
        <div className="bg-primary-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-[#4a7c59]">
          <Mail size={28} />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-950">
          Haz crecer tu conocimiento
        </h2>

        {/* Description */}
        <p className="text-[#4a7c59]/70">
          Reciba consejos quincenales sobre el cuidado de las plantas, alertas
          de mantenimiento estacional y talleres exclusivos sobre el cuidado de
          las plantas directamente en su correo electrónico.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto items-stretch"
        >
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            label="Email "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            variant="goBuy"
            label="Subscribete"
            className="sm:w-auto w-full justify-center"
          />
        </form>

        {/* Disclaimer */}
        <p className="text-[10px] text-[#4a7c59]/40 uppercase tracking-widest font-bold">
          Sin spam. Solo naturaleza. Puedes darte de baja cuando quieras.
        </p>
      </div>
    </section>
  );
}
