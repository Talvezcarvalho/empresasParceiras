import { useEffect, useState } from "react";
import catFundo from '/public/catfundo.png';
import {
  Search,
  ShieldCheck,
  Sparkles,
  X,
  Building2,
  BadgePercent,
} from "lucide-react";

export const HeroSection = ({
  searchQuery,
  onSearchChange,
  totalBusinesses = 0,
  backgroundUrl = catFundo,
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setReady(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  const titleLines = ["Benefícios que", "aproximam", "nossa comunidade."];

  return (
    <section className="relative min-h-[720px] lg:min-h-[760px] overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.02]"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />

      {/* Ambient lights */}
      <div className="absolute -left-32 top-28 h-96 w-96 rounded-full bg-sky-600/10 blur-3xl" />
      <div className="absolute right-10 top-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[720px] lg:min-h-[760px] max-w-7xl items-center px-5 sm:px-8 lg:px-12">
        <div className="grid w-full grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <div
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-md"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready
                  ? "translateY(0)"
                  : "translateY(12px)",
                transition:
                  "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
             

              Colégio Adventista
            </div>

            {/* Title */}
            <h1 className="max-w-4xl text-[3.2rem] font-light leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:text-[5rem]">
              {titleLines.map((line, index) => (
                <span
                  key={line}
                  className="block overflow-hidden pb-1"
                >
                  <span
                    className={`inline-block ${
                      index === 1
                        ? "font-medium text-sky-600"
                        : ""
                    }`}
                    style={{
                      opacity: ready ? 1 : 0,
                      transform: ready
                        ? "translateY(0)"
                        : "translateY(110%)",

                      transition: `
                        transform 0.95s cubic-bezier(0.16, 1, 0.3, 1) ${
                          index * 0.13
                        }s,
                        opacity 0.8s ease ${
                          index * 0.13
                        }s
                      `,
                    }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            {/* Description */}
            <p
              className="mt-8 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready
                  ? "translateY(0)"
                  : "translateY(18px)",

                transition:
                  "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
              }}
            >
              Descubra empresas parceiras, benefícios exclusivos e
              condições especiais disponíveis para nossa comunidade
              escolar.
            </p>

            {/* Search */}
            <div
              className="mt-10 max-w-2xl"
              style={{
                opacity: ready ? 1 : 0,
                transform: ready
                  ? "translateY(0)"
                  : "translateY(20px)",

                transition:
                  "opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s",
              }}
            >
              <div className="group flex items-center rounded-2xl border border-white/15 bg-white/10 p-2 shadow-2xl shadow-black/20 backdrop-blur-xl transition focus-within:border-sky-600/50 focus-within:bg-white/[0.13]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center text-white/45">
                  <Search className="h-5 w-5" />
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    onSearchChange(event.target.value)
                  }
                  placeholder="Busque por empresa, serviço ou categoria..."
                  className="h-12 min-w-0 flex-1 bg-transparent px-1 text-sm text-white outline-none placeholder:text-white/40 sm:text-base"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/45 transition hover:bg-white/10 hover:text-white"
                    aria-label="Limpar busca"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                <button
                  type="button"
                  className="hidden h-12 items-center gap-2 rounded-xl bg-sky-600 px-6 text-sm font-semibold text-slate-950 transition hover:bg-sky-600 sm:flex"
                >
                  <Search className="h-4 w-4" />
                  Buscar
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Parceiros verificados
                </div>

                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-sky-600" />
                  {totalBusinesses} empresas parceiras
                </div>
              </div>
            </div>
          </div>

          
s        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
};