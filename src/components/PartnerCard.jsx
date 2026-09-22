import React, { useState } from 'react';
import {
  Coffee,
  Scissors,
  Laptop,
  Heart,
  BookOpen,
  Activity,
  Utensils,
  Glasses,
  Building2,
  ArrowRight,
} from 'lucide-react';

// -----------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------

// Mapeia categorias conhecidas para um ícone. Fora da lista, cai no
// genérico (Building2) em vez de quebrar o card.
const CATEGORY_ICONS = {
  'Alimentação': Utensils,
  'Beleza': Scissors,
  'Tecnologia': Laptop,
  'Saúde': Heart,
  'Educação': BookOpen,
  'Bem-estar': Activity,
  'Cafeteria': Coffee,
  'Ótica': Glasses,
};

function CategoryIcon({ category, className }) {
  const Icon = CATEGORY_ICONS[category] || Building2;
  return <Icon className={className} />;
}

// Hash simples e estável — determina o layout de cada card a partir do
// próprio id, então o mesmo parceiro sempre cai na mesma variação
// (não sorteia de novo a cada re-render/filtro).
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function getVariant(id) {
  return hashString(id) % 3; // 0 = faixa lateral, 1 = canto, 2 = pôster
}

// Extrai um percentual do texto de benefício ("10% de desconto..." -> "10%")
// pra virar elemento gráfico grande em vez de só texto corrido.
function extractPercent(benefit) {
  if (!benefit) return null;
  const match = benefit.match(/\d{1,3}%/);
  return match ? match[0] : null;
}

// Bloco de logo: convenção /partners/{id}.jpg. Sem o arquivo, cai num
// painel com fundo claro + ícone da categoria — nunca fica "vazio".
function LogoBlock({ partner, className = '' }) {
  const [error, setError] = useState(false);

  if (!error) {
    return (
      <img
        src={`/partners/${partner.id}.jpg`}
        alt={partner.name}
        onError={() => setError(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`flex items-center justify-center bg-[#f4f1ea] ${className}`}>
      <CategoryIcon category={partner.category} className="h-7 w-7 text-[#131a29]" />
    </div>
  );
}

function CategoryLabel({ children, className = '' }) {
  return (
    <span className={`block text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 ${className}`}>
      {children}
    </span>
  );
}

// -----------------------------------------------------------------------
// Variante 0 — Faixa lateral: logo ocupa a coluna esquerda inteira,
// uma faixa sky-600 marca a borda, o nome ganha um sublinhado que
// "corre" no hover.
// -----------------------------------------------------------------------
function CardStripe({ partner, onSelect }) {
  const percent = extractPercent(partner.benefit);
  const restBenefit = percent ? partner.benefit.replace(percent, '').trim() : partner.benefit;

  return (
    <div
      id={`partner-card-${partner.id}`}
      onClick={() => onSelect(partner)}
      className="group relative flex rounded-2xl bg-[#131a29] border border-[#1e273b] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#2f3e5c] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* faixa sky-600 — o "gesto" azul do card, não uma borda fina */}
      <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-sky-600 transition-all duration-300 group-hover:w-[10px] z-10" />

      {/* logo lateral grande, 90–110px de largura */}
      <div className="relative w-[92px] sm:w-[108px] shrink-0 overflow-hidden ml-[6px] group-hover:ml-[10px] transition-all duration-300">
        <LogoBlock
          partner={partner}
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 min-w-0 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <CategoryLabel className="mb-2">{partner.category}</CategoryLabel>

          <h3 className="relative inline-block text-2xl sm:text-[26px] font-black tracking-tight text-white leading-[1.05] mb-3">
            {partner.name}
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-sky-600 transition-all duration-500 group-hover:w-full" />
          </h3>

          {partner.benefit && (
            percent ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-sky-600 leading-none">
                  {percent}
                </span>
                {restBenefit && (
                  <span className="text-xs sm:text-sm text-slate-300 leading-snug">
                    {restBenefit}
                  </span>
                )}
              </div>
            ) : (
              <p className="text-[15px] font-semibold text-sky-100 leading-snug">
                {partner.benefit}
              </p>
            )
          )}
        </div>

        <div className="flex items-center justify-end pt-4">
          <button
            id={`ver-detalhes-btn-${partner.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(partner);
            }}
            className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all cursor-pointer"
          >
            Ver detalhes
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Variante 1 — Logo no canto: a logo "invade" o canto superior direito,
// o rodapé vira um bloco sólido sky-600 (não uma caixa com borda).
// -----------------------------------------------------------------------
function CardCorner({ partner, onSelect }) {
  const percent = extractPercent(partner.benefit);

  return (
    <div
      id={`partner-card-${partner.id}`}
      onClick={() => onSelect(partner)}
      className="group relative flex flex-col rounded-2xl bg-[#131a29] border border-[#1e273b] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#2f3e5c] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="p-6 sm:p-7 pb-5 flex-1">
        <div className="flex items-start justify-between gap-4 mb-5">
          <CategoryLabel className="mt-2">{partner.category}</CategoryLabel>

          {/* logo grande, deslocada pro canto — quase saindo do card */}
          <LogoBlock
            partner={partner}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-[#131a29] shadow-xl -mt-2 -mr-2 sm:-mr-3 transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:rotate-2"
          />
        </div>

        <h3 className="text-2xl sm:text-[28px] font-black tracking-tight text-white leading-[1.02] max-w-[78%]">
          {partner.name}
        </h3>
      </div>

      {/* bloco sólido sky-600 no rodapé — a assinatura azul do card */}
      <button
        id={`ver-detalhes-btn-${partner.id}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(partner);
        }}
        className="relative bg-sky-600 group-hover:bg-sky-500 px-6 sm:px-7 py-4 group-hover:py-[18px] flex items-center justify-between gap-3 transition-all duration-300 text-left cursor-pointer"
      >
        {partner.benefit ? (
          percent ? (
            <span className="text-slate-950 font-black text-lg sm:text-xl leading-tight">
              {percent} <span className="font-semibold text-xs sm:text-sm opacity-80">de desconto</span>
            </span>
          ) : (
            <span
              className="text-slate-950 text-xs sm:text-sm font-bold leading-snug"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {partner.benefit}
            </span>
          )
        ) : (
          <span className="text-slate-950 text-xs font-black uppercase tracking-wider">
            Ver detalhes
          </span>
        )}
        <ArrowRight className="h-4 w-4 text-slate-950 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------
// Variante 2 — Pôster: metade inferior tomada por um bloco de gradiente
// sky-600 com o benefício como manchete grande.
// -----------------------------------------------------------------------
function CardPoster({ partner, onSelect }) {
  const percent = extractPercent(partner.benefit);
  const restBenefit = percent ? partner.benefit.replace(percent, '').trim() : partner.benefit;

  return (
    <div
      id={`partner-card-${partner.id}`}
      onClick={() => onSelect(partner)}
      className="group relative flex flex-col rounded-2xl bg-[#131a29] border border-[#1e273b] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#2f3e5c] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-center gap-3.5">
          <LogoBlock
            partner={partner}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="min-w-0">
            <CategoryLabel className="mb-1">{partner.category}</CategoryLabel>
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-white leading-tight truncate">
              {partner.name}
            </h3>
          </div>
        </div>
      </div>

      {partner.benefit ? (
        <div className="relative mt-auto bg-gradient-to-br from-sky-600 to-sky-800 group-hover:from-sky-500 group-hover:to-sky-700 px-6 sm:px-7 pt-6 pb-14 transition-all duration-300">
          {percent && (
            <span className="block text-4xl sm:text-5xl font-black text-white leading-none mb-1 origin-left transition-transform duration-300 group-hover:scale-105">
              {percent}
            </span>
          )}
          <p className="text-sm sm:text-[15px] font-semibold text-sky-50 leading-snug">
            {restBenefit}
          </p>

          <button
            id={`ver-detalhes-btn-${partner.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(partner);
            }}
            className="absolute bottom-4 right-5 sm:right-6 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all cursor-pointer"
          >
            Detalhes
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div className="mt-auto px-6 sm:px-7 py-5 border-t border-[#1e273b] flex items-center justify-end">
          <button
            id={`ver-detalhes-btn-${partner.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(partner);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all cursor-pointer"
          >
            Ver detalhes
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Dispatcher
// -----------------------------------------------------------------------
export const PartnerCard = ({ partner, onSelect }) => {
  const variant = getVariant(partner.id);

  if (variant === 0) return <CardStripe partner={partner} onSelect={onSelect} />;
  if (variant === 1) return <CardCorner partner={partner} onSelect={onSelect} />;
  return <CardPoster partner={partner} onSelect={onSelect} />;
};
