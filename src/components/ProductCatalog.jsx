import React, { useState } from 'react';
import { 
  Fish, 
  Search, 
  Scale, 
  ShieldCheck, 
  Layers, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function ProductCatalog({
  products,
  onSelectProduct,
  selectedProduct,
  currentWeight,
  onOpenTraceability
}) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', label: 'Todo el Mar' },
    { id: 'pescados', label: 'Pescados Frescos' },
    { id: 'mariscos', label: 'Mariscos & Camarón' },
    { id: 'cefalopodos', label: 'Pulpos & Calamares' },
    { id: 'moluscos', label: 'Moluscos & Ostras' }
  ];

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.scientificName.toLowerCase().includes(search.toLowerCase()) ||
                          p.origin.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'todos' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-4">
      {/* Buscador y Filtros Náuticos */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por especie, lonja o nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-cyan-500/30 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 outline-none backdrop-blur-sm"
          />
        </div>

        {/* Categorías */}
        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Productos de Pescadería */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {filtered.map((prod) => {
          const isSelected = selectedProduct?.id === prod.id;
          const livePriceForScale = currentWeight > 0 ? (prod.pricePerKg * currentWeight).toFixed(2) : prod.pricePerKg.toFixed(2);

          return (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className={`marine-glass-card rounded-2xl p-3.5 flex flex-col justify-between cursor-pointer relative group ${
                isSelected
                  ? 'border-2 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.35)] bg-cyan-950/40'
                  : 'hover:border-cyan-400/50'
              }`}
            >
              {/* Badge de frescura */}
              <div className="flex justify-between items-start mb-2">
                <span className="text-3xl filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform">
                  {prod.image}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono">
                  {prod.stockKg} kg stock
                </span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm leading-tight group-hover:text-cyan-300 transition-colors">
                  {prod.name}
                </h4>
                <p className="text-[11px] text-slate-400 italic truncate mb-2">{prod.scientificName}</p>
                <div className="text-[10px] text-cyan-200/70 flex items-center gap-1 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                  <span className="truncate">{prod.origin}</span>
                </div>
              </div>

              {/* Precio y Acciones */}
              <div className="pt-2 border-t border-cyan-950/80 flex items-end justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    {currentWeight > 0 ? `Por ${currentWeight.toFixed(3)}kg:` : 'Precio por Kg:'}
                  </span>
                  <div className="text-base font-black font-mono text-cyan-300">
                    ${livePriceForScale}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    title="Ver Ficha de Trazabilidad y Etiqueta"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenTraceability(prod);
                    }}
                    className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-900/60 text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 group-hover:text-cyan-300'}`}>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
