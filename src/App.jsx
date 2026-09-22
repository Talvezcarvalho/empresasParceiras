import React, { useState, useEffect, useMemo } from 'react';
import { Info, SearchX } from 'lucide-react';

import { INITIAL_PARTNERS } from './data/initialPartners';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { PartnerCard } from './components/PartnerCard';
import { PartnerDetailModal } from './components/PartnerDetailModal';
import { RegisterModal } from './components/RegisterModal';
import { Footer } from './components/Footer';


const STORAGE_KEY = 'sigma_partners_data_v2';
const STORAGE_HASH_KEY = 'sigma_partners_data_hash_v2';

// Hash simples e estável do conteúdo do initialPartners.js. Serve só para
// detectar "o JSON no código mudou desde a última vez que essa pessoa
// carregou a página" — não precisa ser criptográfico, só precisa mudar
// quando os dados mudam.
function hashData(data) {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
}

export default function App() {
  const [partners, setPartners] = useState(() => {
    try {
      const currentHash = hashData(INITIAL_PARTNERS);
      const savedHash = localStorage.getItem(STORAGE_HASH_KEY);
      const saved = localStorage.getItem(STORAGE_KEY);

      // Só usa o que está salvo no navegador se o initialPartners.js
      // não mudou desde a última visita. Se mudou (você editou o
      // arquivo), ignora o cache e usa os dados novos direto.
      if (saved && savedHash === currentHash) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar dados salvos:', e);
    }

    return INITIAL_PARTNERS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [showImagesDirectly, setShowImagesDirectly] = useState(false);
  const [onlyClubeVantagens, setOnlyClubeVantagens] = useState(false);

  // Modals state
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isClubeModalOpen, setIsClubeModalOpen] = useState(false);

  // Sync to local storage — grava o hash atual do initialPartners.js
  // junto, pra próxima visita saber se o arquivo mudou.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(partners)
      );
      localStorage.setItem(
        STORAGE_HASH_KEY,
        hashData(INITIAL_PARTNERS)
      );
    } catch (e) {
      console.error('Erro ao persistir parceiros:', e);
    }
  }, [partners]);

  // Filter partners
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      // Category filter
      if (
        selectedCategory !== 'TODOS' &&
        p.category !== selectedCategory
      ) {
        return false;
      }

      // "Clube de Vantagens" agora = parceiro tem algum benefício/desconto
      if (onlyClubeVantagens && !p.benefit) {
        return false;
      }

      // Search query filter — campos do novo schema
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();

        const matchesName =
          p.name?.toLowerCase().includes(query) || false;

        const matchesDesc =
          p.description?.toLowerCase().includes(query) || false;

        const matchesBenefit =
          p.benefit?.toLowerCase().includes(query) || false;

        const matchesCategory =
          p.category?.toLowerCase().includes(query) || false;

        const matchesAddress =
          p.address?.toLowerCase().includes(query) || false;

        const matchesInstagram =
          p.instagram?.toLowerCase().includes(query) || false;

        return (
          matchesName ||
          matchesDesc ||
          matchesBenefit ||
          matchesCategory ||
          matchesAddress ||
          matchesInstagram
        );
      }

      return true;
    });
  }, [
    partners,
    selectedCategory,
    onlyClubeVantagens,
    searchQuery
  ]);

  // Scroll helpers
  const scrollToHowItWorks = () => {
    const el = document.getElementById(
      'como-funciona-section'
    );

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f141e] text-slate-100 selection:bg-sky-600 selection:text-slate-950">

      {/* Top Navigation Bar */}
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenClube={() => setIsClubeModalOpen(true)}
        onScrollToHowItWorks={scrollToHowItWorks}
        onScrollToHome={scrollToHome}
        totalPartnersCount={partners.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">

        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalBusinesses={partners.length}
        />

        {/* Directory Section */}
        <section
          id="directory-section"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16"
        >

          {/* Category Filter & Options Bar */}
          <CategoryFilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            filteredCount={filteredPartners.length}
            showImagesDirectly={showImagesDirectly}
            onToggleShowImages={() =>
              setShowImagesDirectly((prev) => !prev)
            }
            onlyClubeVantagens={onlyClubeVantagens}
            onToggleOnlyClube={() =>
              setOnlyClubeVantagens((prev) => !prev)
            }
          />

          {/* HTML Image Direct Links Tip Notification */}
          {showImagesDirectly && (
            <div className="mb-6 rounded-xl border border-sky-600/30 bg-sky-600/10 p-4 flex items-center justify-between gap-3 text-xs sm:text-sm text-sky-600">

              <div className="flex items-center gap-2.5">
                <Info className="h-4 w-4 text-sky-600 shrink-0" />

                <span>
                  <strong>
                    Modo Imagens HTML Diretas Ativado:
                  </strong>{' '}
                  As fotos de divulgação de cada parceiro agora aparecem
                  ao abrir os detalhes do card.
                </span>
              </div>

              <button
                onClick={() =>
                  setShowImagesDirectly(false)
                }
                className="text-xs underline hover:text-white shrink-0 cursor-pointer"
              >
                Ocultar
              </button>

            </div>
          )}

          {/* Partners Grid */}
          {filteredPartners.length > 0 ? (

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">

              {filteredPartners.map((partner) => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  onSelect={(p) =>
                    setSelectedPartner(p)
                  }
                />
              ))}

            </div>

          ) : (

            /* Empty state when no partners match filter */
            <div className="rounded-2xl border border-[#212b40] bg-[#121827] p-12 text-center my-8">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-400 mb-4">
                <SearchX className="h-7 w-7" />
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                Nenhum parceiro encontrado
              </h3>

              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                Não encontramos nenhum estabelecimento com o
                termo &quot;{searchQuery}&quot; na categoria selecionada.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">

                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('TODOS');
                    setOnlyClubeVantagens(false);
                  }}
                  className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                >
                  Limpar todos os filtros
                </button>

                <button
                  onClick={() =>
                    setIsRegisterOpen(true)
                  }
                  className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-sky-600"
                >
                  Cadastrar minha empresa
                </button>

              </div>
            </div>
          )}

        </section>

      </main>

      {/* Modal de detalhes do parceiro */}
      <PartnerDetailModal
        partner={selectedPartner}
        onClose={() => setSelectedPartner(null)}
      />

      {/* Footer */}
      <Footer
        onOpenRegister={() =>
          setIsRegisterOpen(true)
        }
        onOpenClube={() =>
          setIsClubeModalOpen(true)
        }
        onScrollToHowItWorks={
          scrollToHowItWorks
        }
      />


    </div>
  );
}
