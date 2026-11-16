import React, { useState } from 'react';
import { 
  Soup, 
  Plus, 
  Sparkles, 
  ShoppingBag, 
  Users, 
  Trash2, 
  CheckCircle2, 
  X,
  PackageCheck
} from 'lucide-react';

export default function CombosManager({
  combos,
  onAddComboToCart,
  onAddNewCombo
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCombo, setNewCombo] = useState({
    name: '',
    description: '',
    priceUSD: '',
    yieldServings: '4 personas',
    image: '🍲',
    stockAvailable: 10
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCombo.name || !newCombo.priceUSD) return;
    onAddNewCombo({
      ...newCombo,
      id: 'combo-' + Date.now(),
      priceUSD: parseFloat(newCombo.priceUSD),
      stockAvailable: parseInt(newCombo.stockAvailable) || 10
    });
    setIsModalOpen(false);
    setNewCombo({
      name: '',
      description: '',
      priceUSD: '',
      yieldServings: '4 personas',
      image: '🍲',
      stockAvailable: 10
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cyan-950">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Soup className="w-6 h-6 text-cyan-400" />
            Recetas Preparadas & Combos Marinos
          </h2>
          <p className="text-xs text-slate-400">Packs de sopa marinera, ceviches listos y bandejas de parrillada</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Crear Nuevo Combo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">{combo.image}</span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-mono text-[11px]">
                  {combo.stockAvailable} packs listos
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{combo.name}</h3>
              <p className="text-xs text-slate-400 mb-3">{combo.description}</p>
              
              <div className="flex items-center gap-2 text-xs text-cyan-300 font-medium mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>Rinde: {combo.yieldServings}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-cyan-950 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">Precio Pack:</span>
                <span className="text-2xl font-black font-mono text-emerald-400">${combo.priceUSD.toFixed(2)}</span>
              </div>

              <button
                onClick={() => onAddComboToCart(combo)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/25 cursor-pointer active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" /> Añadir a Pedido
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="marine-glass-card w-full max-w-md rounded-3xl p-6 border-2 border-cyan-400/40 relative shadow-2xl text-slate-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/60 hover:bg-rose-500/30 text-slate-300 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-4">Armar Nuevo Combo Marinero</h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Nombre del Combo:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Bandeja Mariscada en Salsa"
                  value={newCombo.name}
                  onChange={(e) => setNewCombo({ ...newCombo, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:border-cyan-400 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Descripción e Ingredientes:</label>
                <textarea
                  rows={2}
                  placeholder="Ej: Calamar en anillas, mejillones y camarón con adobo costero"
                  value={newCombo.description}
                  onChange={(e) => setNewCombo({ ...newCombo, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:border-cyan-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Precio ($ USD):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="15.00"
                    value={newCombo.priceUSD}
                    onChange={(e) => setNewCombo({ ...newCombo, priceUSD: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-sm focus:border-emerald-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Packs Listos:</label>
                  <input
                    type="number"
                    value={newCombo.stockAvailable}
                    onChange={(e) => setNewCombo({ ...newCombo, stockAvailable: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-mono outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black cursor-pointer shadow-lg shadow-cyan-500/25"
                >
                  Guardar Combo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
