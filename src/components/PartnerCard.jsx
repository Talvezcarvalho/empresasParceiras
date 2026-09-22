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

// ---------------------------------------------------------
// Ícones por categoria
// ---------------------------------------------------------

const CATEGORY_ICONS = {
  Alimentação: Utensils,
  Beleza: Scissors,
  Tecnologia: Laptop,
  Saúde: Heart,
  'Saúde e Educação': Heart,
  Educação: BookOpen,
  'Bem-estar': Activity,
  Cafeteria: Coffee,
  Ótica: Glasses,
  Farmácia: Heart,
};

function CategoryIcon({ category, className }) {
  const Icon = CATEGORY_ICONS[category] || Building2;

  return <Icon className={className} />;
}

// ---------------------------------------------------------
// Extrai percentual do benefício
// Ex: "10% de desconto..." -> "10%"
// ---------------------------------------------------------

function extractPercent(benefit) {
  if (!benefit) return null;

  const match = benefit.match(/\d{1,3}%/);

  return match ? match[0] : null;
}

// ---------------------------------------------------------
// Logo
// ---------------------------------------------------------

function LogoBlock({ partner }) {
  const [error, setError] = useState(false);

  if (!error) {
    return (
      <img
        src={`/partners/${partner.id}.jpg`}
        alt={partner.name}
        onError={() => setError(true)}
        className="
          w-full
          h-full
          object-contain
          p-3
          sm:p-4
          transition-transform
          duration-500
          group-hover:scale-[1.04]
        "
      />
    );
  }

  return (
    <div
      className="
        w-full
        h-full
        flex
        items-center
        justify-center
        bg-[#f4f1ea]
      "
    >
      <CategoryIcon
        category={partner.category}
        className="h-8 w-8 text-[#131a29]"
      />
    </div>
  );
}

// ---------------------------------------------------------
// Categoria
// ---------------------------------------------------------

function CategoryLabel({ children }) {
  return (
    <span
      className="
        block
        text-[10px]
        sm:text-[11px]
        font-bold
        tracking-[0.22em]
        uppercase
        text-slate-500
      "
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------
// PartnerCard
// ---------------------------------------------------------

export const PartnerCard = ({ partner, onSelect }) => {
  const percent = extractPercent(partner.benefit);

  const benefitText = percent
    ? partner.benefit
        ?.replace(percent, '')
        .trim()
        .replace(/^de\s+/i, '')
    : partner.benefit;

  const hasBenefit = Boolean(partner.benefit);

  return (
    <article
      id={`partner-card-${partner.id}`}
      onClick={() => onSelect(partner)}
      className="
        group
        relative
        flex
        min-h-[260px]
        rounded-2xl
        overflow-hidden

        bg-[#131a29]
        border
        border-[#1e273b]

        cursor-pointer

        transition-all
        duration-500

        hover:border-[#2d405f]
        hover:-translate-y-1
        hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)]
      "
    >
      {/* Linha azul de identidade */}
      <div
        className="
          absolute
          left-0
          top-0
          bottom-0
          w-[5px]
          bg-sky-600
          z-20

          transition-all
          duration-500

          group-hover:w-[8px]
        "
      />

      {/* ---------------------------------------------------
          Área da logo
      ---------------------------------------------------- */}
      <div
        className="
          relative
          w-[120px]
          sm:w-[142px]
          lg:w-[150px]
          shrink-0

          ml-[5px]
          bg-[#f4f1ea]

          overflow-hidden

          transition-all
          duration-500

          group-hover:ml-[8px]
        "
      >
        <LogoBlock partner={partner} />

        {/* detalhe gráfico sutil */}
        <div
          className="
            absolute
            right-0
            bottom-0
            w-8
            h-[3px]
            bg-sky-600

            transition-all
            duration-500

            group-hover:w-14
          "
        />
      </div>

      {/* ---------------------------------------------------
          Conteúdo
      ---------------------------------------------------- */}
      <div
        className="
          flex-1
          min-w-0

          px-5
          py-5

          sm:px-7
          sm:py-6

          flex
          flex-col
        "
      >
        {/* categoria */}
        <CategoryLabel>
          {partner.category}
        </CategoryLabel>

        {/* nome */}
        <h3
          className="
            mt-3

            text-[22px]
            sm:text-[26px]

            font-black
            tracking-[-0.035em]
            leading-[1.05]

            text-white

            max-w-[95%]

            transition-colors
            duration-300

            group-hover:text-sky-50
          "
        >
          {partner.name}
        </h3>

        {/* pequeno traço editorial */}
        <div
          className="
            mt-4
            h-[2px]
            w-8

            bg-sky-600

            transition-all
            duration-500

            group-hover:w-16
          "
        />

        {/* -------------------------------------------------
            CONTEÚDO PRINCIPAL

            benefício se existir
            descrição se não existir
        -------------------------------------------------- */}
        <div className="mt-5 flex-1">
          {hasBenefit ? (
            <>
              {percent ? (
                <div className="flex items-start gap-3">
                  {/* percentual grande */}
                  <span
                    className="
                      shrink-0

                      text-4xl
                      sm:text-5xl

                      font-black
                      tracking-[-0.06em]
                      leading-none

                      text-sky-600

                      transition-transform
                      duration-500

                      group-hover:scale-[1.04]
                    "
                  >
                    {percent}
                  </span>

                  {/* complemento */}
                  {benefitText && (
                    <p
                      className="
                        pt-1

                        text-sm
                        sm:text-[15px]

                        leading-relaxed
                        text-slate-300

                        max-w-md
                      "
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {benefitText}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <span
                    className="
                      block
                      mb-2

                      text-[9px]
                      font-black
                      tracking-[0.22em]
                      uppercase

                      text-sky-600
                    "
                  >
                    Benefício
                  </span>

                  <p
                    className="
                      text-[15px]
                      sm:text-base

                      font-medium
                      leading-relaxed

                      text-slate-200

                      max-w-xl
                    "
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {partner.benefit}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div>
              <span
                className="
                  block
                  mb-2

                  text-[9px]
                  font-black
                  tracking-[0.22em]
                  uppercase

                  text-sky-600
                "
              >
                Sobre
              </span>

              <p
                className="
                  text-sm
                  sm:text-[15px]

                  leading-relaxed
                  text-slate-300

                  max-w-xl
                "
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {partner.description ||
                  'Conheça mais sobre esta empresa parceira.'}
              </p>
            </div>
          )}
        </div>

        {/* -------------------------------------------------
            Rodapé
        -------------------------------------------------- */}
        <div
          className="
            mt-6
            pt-4

            flex
            items-center
            gap-5
          "
        >
          {/* linha ocupa o espaço livre */}
          <div
            className="
              h-px
              flex-1
              bg-[#26324a]

              transition-colors
              duration-500

              group-hover:bg-sky-600/50
            "
          />

          <button
            id={`ver-detalhes-btn-${partner.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(partner);
            }}
            className="
              inline-flex
              items-center
              gap-2

              shrink-0

              text-[10px]
              sm:text-[11px]

              font-black
              uppercase
              tracking-[0.14em]

              text-slate-400

              transition-all
              duration-300

              group-hover:text-sky-600

              cursor-pointer
            "
          >
            Ver detalhes

            <ArrowRight
              className="
                h-3.5
                w-3.5

                transition-transform
                duration-300

                group-hover:translate-x-1.5
              "
            />
          </button>
        </div>
      </div>

      {/* detalhe de canto */}
      <div
        className="
          absolute
          top-0
          right-0

          w-0
          h-[2px]

          bg-sky-600

          transition-all
          duration-700

          group-hover:w-24
        "
      />
    </article>
  );
};