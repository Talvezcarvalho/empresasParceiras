import React from 'react';
import { Image as ImageIcon, LayoutGrid, Sparkles } from 'lucide-react';


const CATEGORIES = [
  'TODOS',
  'RESTAURANTE',
  'VESTUÁRIO',
  'TECNOLOGIA',
  'EDUCAÇÃO',
  'SAÚDE',
];

export const CategoryFilterBar = ({
  selectedCategory,
  onSelectCategory,
  filteredCount,
  showImagesDirectly,
  onToggleShowImages,
  onlyClubeVantagens,
  onToggleOnlyClube,
}) => {
  return (
    <div className="border-b border-[#1c2436] pb-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1 sm:gap-2 py-1">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                id={`filter-cat-${category.toLowerCase()}`}
                onClick={() => onSelectCategory(category)}
                className={`relative px-4 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-sky-600 font-extrabold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {category}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-sky-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side controls: Count & HTML Direct Images Toggle */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
          {/* Direct HTML Images toggle button */}
          <button
            id="toggle-html-images-btn"
            onClick={onToggleShowImages}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              showImagesDirectly
                ? 'bg-sky-600/10 border-sky-600/40 text-sky-600'
                : 'bg-[#141c2c] border-[#222c42] text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
            title="Alternar exibição de imagens diretas HTML nos cards"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>{showImagesDirectly ? 'Imagens HTML: Ativadas' : 'Imagens HTML: Ocultas'}</span>
          </button>

          {/* Clube de vantagens quick filter */}
          <button
            id="filter-clube-toggle"
            onClick={onToggleOnlyClube}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              onlyClubeVantagens
                ? 'bg-sky-600 text-slate-950 border-sky-600'
                : 'bg-[#141c2c] border-[#222c42] text-slate-300 hover:text-white'
            }`}
          >
            <span>🎁 Clube de Vantagens</span>
          </button>

          {/* Counter matching screenshot "Mostrando 8 parceiros" */}
          <div className="text-slate-400 text-xs sm:text-sm tracking-wide ml-auto md:ml-0 font-medium">
            Mostrando{' '}
            <span className="font-bold text-white text-sm">
              {filteredCount}
            </span>{' '}
            {filteredCount === 1 ? 'parceiro' : 'parceiros'}
          </div>
        </div>
      </div>
    </div>
  );
};
