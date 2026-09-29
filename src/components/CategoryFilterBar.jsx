import React from 'react';

// Remove acentos/espaços pra virar um id de HTML válido
// (ex: "Saúde e Educação" -> "saude-e-educacao")
function slugify(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}

export const CategoryFilterBar = ({
  categories = ['TODOS'],
  selectedCategory,
  onSelectCategory,
  filteredCount,
}) => {
  return (
    <div className="border-b border-[#d6e0ec] dark:border-[#1c2436] pb-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs — agora vêm de categories, calculado a partir
            dos dados reais no App.jsx, não mais de uma lista fixa aqui */}
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1 sm:gap-2 py-1">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                id={`filter-cat-${slugify(category)}`}
                onClick={() => onSelectCategory(category)}
                className={`relative px-4 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-sky-600 font-extrabold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {category}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-sky-600 rounded-full" />
                )}
              </button>
            );
          })}

          {/* Contador */}
          <div className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm tracking-wide ml-auto md:ml-0 font-medium">
            Mostrando{' '}
            <span className="font-bold text-[#172033] dark:text-white text-sm">
              {filteredCount}
            </span>{' '}
            {filteredCount === 1 ? 'parceiro' : 'parceiros'}
          </div>
        </div>
      </div>
    </div>
  );
};
