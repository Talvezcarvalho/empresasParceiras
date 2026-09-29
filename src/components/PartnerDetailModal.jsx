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

// Imagem de divulgação do modal — DIFERENTE da logo do card.
// Convenção: /partners/media/{id}.jpg
// Se não existir, cai pra logo (/partners/{id}.jpg). Se nem a logo
// existir, cai pro ícone genérico. Sem object-fit forçado em caixa
// fixa: a imagem escala só pela largura (w-full h-auto), então nunca
// é cortada nem sofre letterbox — ela é exibida na proporção real
// dela. O max-h é só uma trava de segurança pra fotos extremamente
// verticais não estourarem o modal.
function PromoImage({ partner }) {
  const mediaSrc = `/partners/media/${partner.id}.jpg`;
  const logoSrc = `/partners/${partner.id}.jpg`;

  const [src, setSrc] = useState(mediaSrc);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (src === mediaSrc) {
      // não tem foto de divulgação própria — tenta a logo
      setSrc(logoSrc);
    } else {
      // nem a logo existe
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div className="w-full py-10 flex items-center justify-center bg-[#eef3f9] dark:bg-[#0b0f18] border-t border-[#d6e0ec] dark:border-[#1e273b]">
        <Building2 className="h-10 w-10 text-slate-400 dark:text-slate-600" />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#eef3f9] dark:bg-[#0b0f18] border-t border-[#d6e0ec] dark:border-[#1e273b] flex items-center justify-center">
      <img
        src={src}
        alt={partner.name}
        onError={handleError}
        className="w-full h-auto max-h-[75vh] object-contain block"
      />
    </div>
  );
}

// Uma linha de contato só é renderizada se o dado existir — os dados não
// são padronizados, então cada campo pode ou não vir preenchido.
function ContactRow({ icon: Icon, label, children }) {
  if (!children) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#d6e0ec] dark:border-[#1e273b] last:border-b-0">
      <Icon className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-0.5">
          {label}
        </div>
        <div className="text-sm text-slate-700 dark:text-slate-200 break-words">{children}</div>
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
      {/* backdrop — fica escuro nos dois temas, é um scrim, não uma superfície do app */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* painel central fixo — uma coluna só: infos em cima, imagem embaixo,
          usando a largura toda pra imagem nunca perder proporção */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[90vh] rounded-2xl bg-white dark:bg-[#131a29] border border-[#d6e0ec] dark:border-[#1e273b] shadow-2xl overflow-y-auto"
      >
        {/* botão fechar */}
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-20 h-9 w-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors cursor-pointer"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {/* informações */}
        <div className="p-6 sm:p-7">
          <div className="mb-5 pr-8">
            <h2 className="text-xl font-bold text-[#172033] dark:text-white leading-tight">
              {partner.name}
            </h2>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#eef3f9] dark:bg-[#192236] border border-[#d6e0ec] dark:border-[#26334f] text-slate-600 dark:text-slate-300">
              {partner.category}
            </span>
          </div>

          {/* descrição */}
          {partner.description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              {partner.description}
            </p>
          )}

          {/* benefício / desconto em destaque */}
          {partner.benefit && (
            <div className="flex items-start gap-2.5 mb-6 rounded-lg bg-sky-600/10 border border-sky-600/30 px-4 py-3.5">
              <Gift className="h-4.5 w-4.5 text-sky-600 shrink-0 mt-0.5" />
              <p className="text-sm text-sky-900 dark:text-sky-100 leading-relaxed">
                {partner.benefit}
              </p>
            </div>
          )}

          {/* contato */}
          <div className="rounded-xl bg-[#f5f8fc] dark:bg-[#0f141e] border border-[#d6e0ec] dark:border-[#1e273b] px-4">
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

        {/* imagem de divulgação — embaixo, largura total, sem corte */}
        <PromoImage key={partner.id} partner={partner} />
      </div>
    </div>
  );
};
