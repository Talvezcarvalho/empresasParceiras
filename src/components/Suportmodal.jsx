import React from "react";
import { X, Phone, MessageCircle } from "lucide-react";

// Contato do desenvolvedor (somente dígitos, com DDI 55)
const DEV_PHONE = "5545999432716";
const DEV_PHONE_LABEL = "(45) 99943-2716";

export const SupportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 dark:border-[#26334f] bg-white dark:bg-[#111827] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* detalhe azul superior */}
        <div className="h-1.5 w-full bg-sky-600" />

        {/* botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* ícone + título */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600/10 text-sky-600">
            <Phone className="h-6 w-6" />
          </div>

          <h2 className="mt-4 pr-8 text-2xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
            Suporte
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Caso tenha percebido erros, falta de informações, ou tenha dúvidas
            referente ao site, entre em contato com o desenvolvedor.
          </p>

          {/* contatos */}
          <div className="mt-6 grid gap-3">
            <a
              href={`tel:+${DEV_PHONE}`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-[#26334f] p-4 hover:border-sky-600/50 hover:bg-sky-600/5 transition"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-600/10 text-sky-600">
                <Phone className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs text-slate-500">Telefone</span>
                <strong className="block truncate text-sm text-slate-900 dark:text-white">
                  {DEV_PHONE_LABEL}
                </strong>
              </div>
            </a>

            <a
              href={`https://wa.me/${DEV_PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-[#26334f] p-4 hover:border-sky-600/50 hover:bg-sky-600/5 transition"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-600/10 text-sky-600">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs text-slate-500">WhatsApp</span>
                <strong className="block truncate text-sm text-slate-900 dark:text-white">
                  {DEV_PHONE_LABEL}
                </strong>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
