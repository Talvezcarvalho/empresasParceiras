import React from 'react';
import { GraduationCap, Menu, X, Sun, Moon } from 'lucide-react';


export const Navbar= ({
  onScrollToHowItWorks,
  onScrollToHome,
  totalPartnersCount,
  isLightMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="
    navbar-static
    sticky top-0 z-40 w-full
    border-b border-[#1e2638]
  bg-[#0f141e]
  ">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          id="nav-logo-btn"
          onClick={onScrollToHome}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600/10 border border-sky-600/30 text-sky-600 group-hover:bg-sky-600 group-hover:text-slate-950 transition-all duration-200">
            <GraduationCap className="h-6 w-6 transition-transform group-hover:scale-105" />
          </div>
          <div>
            <div className="navbar-college-title flex items-center gap-1.5   font-black tracking-tight text-lg leading-none">
              COLÉGIO <span className="text-sky-600">ADVENTISTA DE TOLEDO</span>
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
              PORTAL DE PARCEIROS
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
         
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            id="nav-theme-toggle-btn"
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-sky-600/30 bg-sky-600/10 px-3 text-sky-600 transition-colors hover:bg-sky-600 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-600/50"
            aria-pressed={isLightMode}
            aria-label={isLightMode ? 'Ativar modo escuro' : 'Ativar modo claro'}
            title={isLightMode ? 'Ativar modo escuro' : 'Ativar modo claro'}
          >
            {isLightMode ? <Moon aria-hidden="true" className="h-5 w-5" /> : <Sun aria-hidden="true" className="h-5 w-5" />}
            <span className="hidden sm:inline">{isLightMode ? 'Modo escuro' : 'Modo claro'}</span>
          </button>

          <div className="hidden md:flex items-center gap-4">
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-[#1e2638] bg-[#121826] px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => {
                onScrollToHome();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/60 rounded-md"
            >
              Início
            </button>
            <button
              onClick={() => {
                onScrollToHowItWorks();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/60 rounded-md"
            >
              Como Funciona
            </button>
            

          </div>
        </div>
      )}
    </header>
  );
};
