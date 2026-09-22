import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle, Image as ImageIcon, AlertCircle } from 'lucide-react';


const DEFAULT_IMAGE_SUGGESTIONS = [
  { label: 'Padaria / Café', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop' },
  { label: 'Roupas / Moda', url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop' },
  { label: 'Tecnologia / TI', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop' },
  { label: 'Saúde / Clínica', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop' },
  { label: 'Educação / Aulas', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop' },
  { label: 'Fitness / Esporte', url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop' },
];

export const RegisterModal = ({
  isOpen,
  onClose,
  onAddPartner,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [category, setCategory] = useState<'RESTAURANTE' | 'VESTUÁRIO' | 'TECNOLOGIA' | 'EDUCAÇÃO' | 'SAÚDE'>('RESTAURANTE');
  const [familyAffiliation, setFamilyAffiliation] = useState('');
  const [description, setDescription] = useState('');
  const [discountDescription, setDiscountDescription] = useState('15% de desconto para comunidade Colégio Sigma.');
  const [discountRate, setDiscountRate] = useState('15% OFF');
  const [discountCode, setDiscountCode] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [address, setAddress] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const iconTypeMap = {
      RESTAURANTE: 'utensils',
      VESTUÁRIO: 'scissors',
      TECNOLOGIA: 'laptop',
      EDUCAÇÃO: 'book',
      SAÚDE: 'heart',
    };

    const newPartner = {
      id: `partner-${Date.now()}`,
      name,
      category,
      categoryLabel: isFeatured ? `${category} • DESTAQUE` : category,
      rating: 5.0,
      description,
      familyAffiliation,
      isFeatured,
      hasDiscountClub: true,
      discountDescription,
      discountRate,
      discountCode: discountCode.trim() || `SIGMA${name.slice(0, 4).toUpperCase()}15`,
      iconType: iconTypeMap[category] || 'building',
      imageUrl: imageUrl.trim(),
      galleryImages: [imageUrl.trim()],
      whatsapp: whatsapp.replace(/[^0-9]/g, ''),
      instagram: instagram.startsWith('@') ? instagram : (instagram ? `@${instagram}` : undefined),
      address: address || 'Brasília - DF',
    };

    onAddPartner(newPartner);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-[#232f48] bg-[#111726] shadow-2xl overflow-hidden my-6 text-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1d273e] bg-[#0d131f]/90">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-slate-950 font-bold">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Cadastrar Empresa no Portal
              </h2>
              <p className="text-xs text-slate-400">
                Exclusivo para pais, responsáveis e egressos do Colégio Sigma
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-bounce">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-white">Empresa Cadastrada!</h3>
            <p className="text-slate-300 text-sm max-w-md">
              Sua empresa foi inserida no Portal de Parceiros com o link direto da imagem e já está visível para a comunidade do Colégio Sigma.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1 text-xs sm:text-sm">
            {/* Nome da Empresa */}
            <div>
              <label className="block font-semibold text-slate-200 mb-1">
                Nome da Empresa / Estabelecimento *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Pâtisserie & Café Delícias"
                className="w-full rounded-xl border border-[#232f48] bg-[#0c121e] px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-600 focus:outline-none"
              />
            </div>

            {/* Categoria e Destaque */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-200 mb-1">
                  Categoria *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-[#232f48] bg-[#0c121e] px-4 py-2.5 text-white focus:border-sky-600 focus:outline-none cursor-pointer"
                >
                  <option value="RESTAURANTE">RESTAURANTE</option>
                  <option value="VESTUÁRIO">VESTUÁRIO</option>
                  <option value="TECNOLOGIA">TECNOLOGIA</option>
                  <option value="EDUCAÇÃO">EDUCAÇÃO</option>
                  <option value="SAÚDE">SAÚDE</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">
                  Família / Vínculo Escolar *
                </label>
                <input
                  type="text"
                  required
                  value={familyAffiliation}
                  onChange={(e) => setFamilyAffiliation(e.target.value)}
                  placeholder="Ex: Família da Mariana Silva (6º Ano A)"
                  className="w-full rounded-xl border border-[#232f48] bg-[#0c121e] px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Direct HTML Image Link Input - Key Feature requested by user */}
            <div className="rounded-xl border border-sky-600/20 bg-sky-600/5 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 font-bold text-sky-600">
                  <ImageIcon className="h-4 w-4 text-sky-600" />
                  <span>Link Direto da Imagem (HTML URL) *</span>
                </label>
                <span className="text-[11px] text-sky-600/80">URL direta aceita em tag &lt;img&gt;</span>
              </div>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreviewError(false);
                }}
                placeholder="https://exemplo.com/foto-empresa.jpg"
                className="w-full rounded-xl border border-[#2d3a57] bg-[#0c121e] px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-600 focus:outline-none font-mono text-xs"
              />

              {/* Suggestions shortcuts */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-400">Sugestões rápidas:</span>
                {DEFAULT_IMAGE_SUGGESTIONS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setImageUrl(item.url);
                      setImagePreviewError(false);
                    }}
                    className="rounded px-2 py-0.5 text-[11px] bg-[#162033] hover:bg-sky-600 hover:text-slate-950 text-slate-300 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Live Image Preview */}
              <div className="mt-2 flex items-center gap-4 bg-[#0a0f19] p-3 rounded-lg border border-[#1e273b]">
                <div className="h-16 w-24 rounded-md overflow-hidden bg-slate-800 border border-slate-700 shrink-0 relative">
                  {!imagePreviewError ? (
                    <img
                      src={imageUrl}
                      alt="Prévia direta"
                      referrerPolicy="no-referrer"
                      onError={() => setImagePreviewError(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-rose-400">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="text-xs text-slate-300">
                  <div className="font-semibold text-white">
                    {imagePreviewError ? 'Falha ao carregar imagem' : 'Prévia da Imagem em Tempo Real'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {imagePreviewError
                      ? 'Verifique se a URL é pública e aponta para uma imagem válida.'
                      : 'Esta imagem será renderizada via tag <img> com link direto no portal.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block font-semibold text-slate-200 mb-1">
                Descrição do Negócio / Serviços *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Conte sobre os produtos, serviços, história ou diferenciais da sua empresa..."
                className="w-full rounded-xl border border-[#232f48] bg-[#0c121e] px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-600 focus:outline-none resize-none"
              />
            </div>

            {/* Clube de Vantagens (Benefício) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-200 mb-1">
                  Desconto no Clube de Vantagens *
                </label>
                <input
                  type="text"
                  required
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                  placeholder="Ex: 15% OFF ou 20% no 1º mês"
                  className="w-full rounded-xl border border-[#232f48] bg-[#0c121e] px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">
                  Cupom ou Código Promocional
                </label>
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  placeholder="Ex: SIGMAVIP"
                  className="w-full rounded-xl border border-[#232f48] bg-[#0c121e] px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-600 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-200 mb-1">
                Detalhes do Benefício para a Família Sigma
              </label>
              <input
                type="text"
                value={discountDescription}
                onChange={(e) => setDiscountDescription(e.target.value)}
                placeholder="Ex: Desconto direto na apresentação da carteirinha do estudante."
                className="w-full rounded-xl border border-[#232f48] bg-[#0c121e] px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-600 focus:outline-none"
              />
            </div>

            {/* Contato & Localização */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-200 mb-1">
                  WhatsApp (com DDD)
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Ex: 61999998888"
                  className="w-full rounded-xl border border-[#232f48] bg-[#0c121e] px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">
                  Instagram
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="Ex: @minhaempresa"
                  className="w-full rounded-xl border border-[#232f48] bg-[#0c121e] px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-200 mb-1">
                  Endereço / Bairro
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ex: Asa Sul, Brasília"
                  className="w-full rounded-xl border border-[#232f48] bg-[#0c121e] px-4 py-2.5 text-white placeholder-slate-500 focus:border-sky-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Checkbox Destaque */}
            <div className="flex items-center gap-2 pt-2">
              <input
                id="is-featured-checkbox"
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-sky-600 focus:ring-sky-600 cursor-pointer"
              />
              <label htmlFor="is-featured-checkbox" className="text-xs text-slate-300 font-medium cursor-pointer">
                Exibir como <span className="font-bold text-sky-600">Card de Destaque Dourado</span> (como Ateliê e FitLife)
              </label>
            </div>

            {/* Buttons */}
            <div className="pt-4 border-t border-[#1d273e] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#24314c] bg-[#141b2c] text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                id="submit-cadastrar-btn"
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-600 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Cadastrar Empresa
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
