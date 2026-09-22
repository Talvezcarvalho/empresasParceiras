import React from 'react';
import { ArrowRight, GraduationCap } from 'lucide-react';



export const Footer = ({
  onOpenRegister,
  onOpenClube,
  onScrollToHowItWorks,
}) => {
  return (
    <footer className="border-t border-[#1a2335] bg-[#0c1018] py-8 text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Branding */}
          <div className="flex items-center gap-3">
            <span className="font-extrabold tracking-tight text-white text-sm">
              COLÉGIO SIGMA
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">
              Rede de Parceiros © 2025
            </span>
          </div>

          {/* Right: Links */}
          <div className="flex flex-wrap items-center gap-6 font-medium">
            <button
              onClick={onScrollToHowItWorks}
              className="hover:text-sky-600 transition-colors cursor-pointer"
            >
              Como Funciona
            </button>
            <button
              onClick={onOpenClube}
              className="hover:text-sky-600 transition-colors cursor-pointer"
            >
              Clube de Vantagens
            </button>
            <button
              id="footer-cadastrar-link"
              onClick={onOpenRegister}
              className="inline-flex items-center gap-1 font-bold text-sky-600 hover:text-sky-600 transition-colors cursor-pointer"
            >
              <span>Cadastrar Minha Empresa</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
