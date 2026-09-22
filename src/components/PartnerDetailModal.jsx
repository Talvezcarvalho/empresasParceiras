import React, { useEffect, useState } from 'react';
import {
  X,
  Gift,
  Phone,
  MessageCircle,
  Globe,
  MapPin,
  Building2,
} from 'lucide-react';

// Painel de mídia: convenção fixa /partners/{id}.jpg.
// - object-contain (não object-cover) pra imagem NUNCA ser cortada.
// - Se o arquivo não existir, cai num painel com ícone genérico, mantendo
//   a proporção do layout (não desaparece e "puxa" as infos pro centro).
function MediaPanel({ partner }) {
  const [error, setError] = useState(false);
  const hasImage = !error;

  return (
    <div className="relative w-full h-56 md:h-auto md:w-2/5 shrink-0 bg-[#0b0f18] flex items-center justify-center overflow-hidden">
      {hasImage ? (
        <img
          src={"public/partners/" + partner.id + ".jpg"}
          alt={partner.name}
          onError={() => setError(true)}
          className="w-full h-full object-contain"
        />
      ) : (
        <Building2 className="h-12 w-12 text-slate-600" />
      )}
    </div>
  );
}

// Uma linha de contato só é renderizada se o dado existir — os dados não
// são padronizados, então cada campo pode ou não vir preenchido.
function ContactRow({ icon: Icon, label, children }) {
  if (!children) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#1e273b] last:border-b-0">
      <Icon className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
          {label}
        </div>
        <div className="text-sm text-slate-200 break-words">{children}</div>
      </div>
    </div>
  );
}

export const PartnerDetailModal = ({ partner, onClose }) => {
  // Trava o scroll da página de fundo enquanto o modal está aberto
  useEffect(() => {
    if (!partner) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [partner]);

  // Fecha com Esc
  useEffect(() => {
    if (!partner) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [partner, onClose]);

  if (!partner) return null;

  const whatsappHref = partner.whatsapp
    ? `https://wa.me/${partner.whatsapp}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* painel central fixo — empilhado no mobile, lado a lado a partir de md */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg md:max-w-3xl lg:max-w-4xl max-h-[85vh] md:h-[70vh] md:max-h-[70vh] rounded-2xl bg-[#131a29] border border-[#1e273b] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-20 h-9 w-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors cursor-pointer"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* imagem — sem corte, ocupa a lateral esquerda no desktop */}
        <MediaPanel partner={partner} />

        {/* informações — rola independente da imagem no desktop */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-7">
          <div className="mb-5 pr-8 md:pr-0">
            <h2 className="text-xl font-bold text-white leading-tight">
              {partner.name}
            </h2>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#192236] border border-[#26334f] text-slate-300">
              {partner.category}
            </span>
          </div>

          {/* descrição */}
          {partner.description && (
            <p className="text-sm text-slate-300 leading-relaxed mb-5">
              {partner.description}
            </p>
          )}

          {/* benefício / desconto em destaque */}
          {partner.benefit && (
            <div className="flex items-start gap-2.5 mb-6 rounded-lg bg-sky-600/10 border border-sky-600/30 px-4 py-3.5">
              <Gift className="h-4.5 w-4.5 text-sky-600 shrink-0 mt-0.5" />
              <p className="text-sm text-sky-100 leading-relaxed">
                {partner.benefit}
              </p>
            </div>
          )}

          {/* contato */}
          <div className="rounded-xl bg-[#0f141e] border border-[#1e273b] px-4">
            <ContactRow icon={Phone} label="Telefone">
              {partner.phone ? (
                <a href={`tel:${partner.phone.replace(/\D/g, '')}`} className="hover:text-sky-600">
                  {partner.phone}
                </a>
              ) : null}
            </ContactRow>

            <ContactRow icon={MessageCircle} label="WhatsApp">
              {whatsappHref ? (
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="hover:text-sky-600">
                  {partner.phone || 'Abrir conversa'}
                </a>
              ) : null}
            </ContactRow>

            <ContactRow icon={Globe} label="Site">
              {partner.website ? (
                <a href={partner.website} target="_blank" rel="noreferrer" className="hover:text-sky-600 break-all">
                  {partner.website}
                </a>
              ) : null}
            </ContactRow>

            <ContactRow icon={MapPin} label="Endereço">
              {partner.address || null}
            </ContactRow>
          </div>
        </div>
      </div>
    </div>
  );
};
