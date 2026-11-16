import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  TrendingUp, 
  Snowflake, 
  CheckCircle2, 
  X, 
  Save, 
  RotateCcw,
  Boxes,
  ThermometerSnowflake,
  ShieldAlert
} from 'lucide-react';

export default function InventoryModal({
  isOpen,
  onClose,
  products,
  onUpdateProductStock,
  onAddProduct,
  onRegisterIceMeltWaste
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('stock'); // 'stock' | 'reception' | 'ice_waste'
  const [searchTerm, setSearchTerm] = useState('');

  // Formulario para entrada de nuevo lote / recepción de lonja
  const [newFish, setNewFish] = useState({
    name: '',
    scientificName: '',
    category: 'pescados',
    pricePerKg: '',
    stockKg: '',
    image: '🐟',
    origin: '',
    captureMethod: 'Pesca artesanal costera',
    freshnessTier: 'Extra Fresco (Clase A)',
    lotNumber: 'LOT-LONJA-' + Math.floor(1000 + Math.random() * 9000),
    catchDate: new Date().toISOString().split('T')[0]
  });

  // Formulario de merma por deshielo en mostrador
  const [selectedFishForMelt, setSelectedFishForMelt] = useState(products[0]?.id || '');
  const [meltWeightKg, setMeltWeightKg] = useState('');
  const [meltReason, setMeltReason] = useState('Deshidratación / Deshielo en cama de hielo');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.lotNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Totales de inventario
  const totalKgInStock = products.reduce((acc, p) => acc + p.stockKg, 0);
  const totalValuationUSD = products.reduce((acc, p) => acc + (p.stockKg * p.pricePerKg), 0);
  const lowStockCount = products.filter(p => p.stockKg <= 15).length;

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newFish.name || !newFish.pricePerKg || !newFish.stockKg) {
      alert('Por favor completa el nombre, precio y kilos recibidos.');
      return;
    }

    const created = {
      ...newFish,
      id: 'prod-' + Date.now(),
      pricePerKg: parseFloat(newFish.pricePerKg),
      stockKg: parseFloat(newFish.stockKg),
      allowedPreparations: [
        { id: 'entero', label: 'Entero eviscerado', wastePercent: 12 },
        { id: 'filete', label: 'Fileteado con piel', wastePercent: 35 },
        { id: 'ruedas', label: 'Ruedas frescas', wastePercent: 18 }
      ]
    };

    onAddProduct(created);
    alert(`¡Lote de ${created.name} (${created.stockKg} kg) recibido con éxito!`);
    
    setNewFish({
      name: '',
      scientificName: '',
      category: 'pescados',
      pricePerKg: '',
      stockKg: '',
      image: '🐟',
      origin: '',
      captureMethod: 'Pesca artesanal costera',
      freshnessTier: 'Extra Fresco (Clase A)',
      lotNumber: 'LOT-LONJA-' + Math.floor(1000 + Math.random() * 9000),
      catchDate: new Date().toISOString().split('T')[0]
    });
    setActiveTab('stock');
  };

  const handleApplyIceMelt = (e) => {
    e.preventDefault();
    const kg = parseFloat(meltWeightKg);
    if (isNaN(kg) || kg <= 0) {
      alert('Ingresa una cantidad de merma válida en kg');
      return;
    }

    const fish = products.find(p => p.id === selectedFishForMelt);
    if (!fish) return;

    if (kg > fish.stockKg) {
      alert('La merma no puede ser mayor al stock actual del producto.');
      return;
    }

    onRegisterIceMeltWaste(fish.id, kg, meltReason, fish.name, fish.pricePerKg);
    alert(`Se descontaron ${kg} kg de ${fish.name} por concepto de ${meltReason}.`);
    setMeltWeightKg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="marine-glass-card w-full max-w-4xl rounded-3xl p-6 border-2 border-cyan-400/40 relative shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/60 hover:bg-rose-500/30 text-slate-300 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-950 rounded-2xl border border-cyan-400/30 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Boxes className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              Gestor Integral de Inventario & Cámara de Frío
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                CADENA DE FRÍO 0°C a 4°C
              </span>
            </h2>
            <p className="text-xs text-cyan-300/70">
              Control de existencias por lote, recepción de desembarque y ajuste de merma por hielo
            </p>
          </div>
        </div>

        {/* Resumen de Existencias */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-[#041122] border border-cyan-500/30">
            <span className="text-xs text-cyan-400/80 block font-medium">TOTAL EN CÁMARA (STOCK)</span>
            <span className="text-3xl font-black text-cyan-300 font-mono">{totalKgInStock.toFixed(2)} KG</span>
            <span className="text-[11px] text-slate-400 block mt-1">{products.length} especies activas en mostrador</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#041122] border border-emerald-500/30">
            <span className="text-xs text-emerald-400/80 block font-medium">VALORACIÓN TOTAL ESTIMADA</span>
            <span className="text-3xl font-black text-emerald-400 font-mono">${totalValuationUSD.toFixed(2)}</span>
            <span className="text-[11px] text-slate-400 block mt-1">Precio mostrador promedio</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#041122] border border-amber-500/30">
            <span className="text-xs text-amber-400/80 block font-medium">ALERTAS DE STOCK BAJO</span>
            <span className="text-3xl font-black text-amber-400 font-mono">{lowStockCount} ESPECIES</span>
            <span className="text-[11px] text-slate-400 block mt-1">Existencia menor o igual a 15 kg</span>
          </div>
        </div>

        {/* Pestañas de Navegación del Inventario */}
        <div className="flex gap-2 mb-6 border-b border-cyan-950 pb-2">
          <button
            onClick={() => setActiveTab('stock')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'stock'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            Control de Existencias & Ajustes
          </button>
          
          <button
            onClick={() => setActiveTab('reception')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reception'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Entrada de Lote / Recepción de Lonja
          </button>

          <button
            onClick={() => setActiveTab('ice_waste')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'ice_waste'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <ThermometerSnowflake className="w-3.5 h-3.5" />
            Ajuste de Merma por Hielo y Deshidratación
          </button>
        </div>

        {/* 1. TAB: Control de Existencias */}
        {activeTab === 'stock' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Filtrar por especie o número de lote..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-72 px-3 py-2 bg-slate-900/90 border border-cyan-500/30 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 outline-none"
              />
              <span className="text-xs text-slate-400 font-mono">
                Mostrando {filteredProducts.length} productos
              </span>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 overflow-hidden shadow-inner">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#030d1a] text-slate-400 border-b border-cyan-950">
                  <tr>
                    <th className="p-3">Especie & Icono</th>
                    <th className="p-3">Lote Sanitario</th>
                    <th className="p-3">Origen / Lonja</th>
                    <th className="p-3 text-right">Precio/Kg</th>
                    <th className="p-3 text-right">Stock Actual</th>
                    <th className="p-3 text-center">Ajuste Rápido (+/- Kg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((p) => {
                    const isLow = p.stockKg <= 15;
                    return (
                      <tr key={p.id} className="hover:bg-cyan-950/20 transition-colors">
                        <td className="p-3 flex items-center gap-2">
                          <span className="text-xl">{p.image}</span>
                          <div>
                            <strong className="text-slate-100 block text-xs font-sans">{p.name}</strong>
                            <span className="text-[10px] text-cyan-400/80 italic">{p.scientificName}</span>
                          </div>
                        </td>
                        <td className="p-3 text-amber-300 font-bold">{p.lotNumber}</td>
                        <td className="p-3 text-slate-300 truncate max-w-[150px]">{p.origin}</td>
                        <td className="p-3 text-right text-emerald-400 font-bold">${p.pricePerKg.toFixed(2)}</td>
                        <td className="p-3 text-right font-black">
                          <span className={`px-2 py-1 rounded-lg ${isLow ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-cyan-300'}`}>
                            {p.stockKg.toFixed(2)} kg
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => onUpdateProductStock(p.id, Math.max(0, p.stockKg - 1))}
                              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 font-bold flex items-center justify-center transition-colors cursor-pointer"
                              title="Restar 1 kg"
                            >
                              -1
                            </button>
                            <button
                              onClick={() => onUpdateProductStock(p.id, p.stockKg + 5)}
                              className="px-2 h-7 rounded-lg bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 font-bold flex items-center justify-center transition-colors cursor-pointer"
                              title="Sumar 5 kg"
                            >
                              +5 kg
                            </button>
                            <button
                              onClick={() => {
                                const custom = parseFloat(prompt(`Ingresa el nuevo stock total para ${p.name} en kg:`, p.stockKg));
                                if (!isNaN(custom) && custom >= 0) {
                                  onUpdateProductStock(p.id, custom);
                                }
                              }}
                              className="px-2 h-7 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 font-semibold text-[11px] cursor-pointer"
                              title="Editar valor manual"
                            >
                              Fijar...
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. TAB: Recepción de Nuevo Lote */}
        {activeTab === 'reception' && (
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <div className="text-xs">
                <span className="font-bold text-white block">Recepción Sanitaria y Registro de Entrada</span>
                <span className="text-cyan-200/70">
                  Ingresa los cargamentos recién desembarcados para etiquetado, pesaje en muelle y asignación de lote sanitario.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Nombre Comercial de la Especie *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Sierra o Peto del Caribe"
                  value={newFish.name}
                  onChange={(e) => setNewFish({ ...newFish, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 outline-none text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Nombre Científico (Para Trazabilidad)</label>
                <input
                  type="text"
                  placeholder="Ej: Scomberomorus cavalla"
                  value={newFish.scientificName}
                  onChange={(e) => setNewFish({ ...newFish, scientificName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 outline-none text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Categoría Marina</label>
                <select
                  value={newFish.category}
                  onChange={(e) => setNewFish({ ...newFish, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 outline-none text-slate-100 cursor-pointer"
                >
                  <option value="pescados">Pescados Frescos</option>
                  <option value="mariscos">Mariscos & Crustáceos</option>
                  <option value="cefalopodos">Cefalópodos (Pulpo/Calamar)</option>
                  <option value="moluscos">Moluscos (Ostras/Mejillones)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Icono Representativo</label>
                <select
                  value={newFish.image}
                  onChange={(e) => setNewFish({ ...newFish, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 outline-none text-slate-100 cursor-pointer text-base"
                >
                  <option value="🐟">🐟 Pez Marino</option>
                  <option value="🐠">🐠 Pargo / Tropical</option>
                  <option value="🦐">🦐 Camarón / Langostino</option>
                  <option value="🐙">🐙 Pulpo</option>
                  <option value="🦑">🦑 Calamar</option>
                  <option value="🦪">🦪 Ostra / Molusco</option>
                  <option value="🦀">🦀 Cangrejo / Jaiba</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Kilos Recibidos en Báscula de Muelle (Kg) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="Ej: 50.00"
                  value={newFish.stockKg}
                  onChange={(e) => setNewFish({ ...newFish, stockKg: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-cyan-500/50 focus:border-cyan-400 outline-none text-cyan-300 font-mono font-bold text-sm"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Precio de Venta al Público por Kg ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="Ej: 15.50"
                  value={newFish.pricePerKg}
                  onChange={(e) => setNewFish({ ...newFish, pricePerKg: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-emerald-500/50 focus:border-emerald-400 outline-none text-emerald-300 font-mono font-bold text-sm"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Lonja / Puerto de Procedencia</label>
                <input
                  type="text"
                  placeholder="Ej: Lonja Puerto Francés / Higuerote"
                  value={newFish.origin}
                  onChange={(e) => setNewFish({ ...newFish, origin: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 outline-none text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Lote Sanitario Asignado</label>
                <input
                  type="text"
                  value={newFish.lotNumber}
                  onChange={(e) => setNewFish({ ...newFish, lotNumber: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-cyan-950 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('stock')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 cursor-pointer active:scale-95"
              >
                <Save className="w-4 h-4" /> Registrar Lote e Ingresar al Inventario
              </button>
            </div>
          </form>
        )}

        {/* 3. TAB: Merma por Deshielo y Deshidratación */}
        {activeTab === 'ice_waste' && (
          <form onSubmit={handleApplyIceMelt} className="space-y-4 max-w-xl mx-auto py-2">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
              <ThermometerSnowflake className="w-8 h-8 text-amber-400" />
              <div className="text-xs">
                <strong className="text-amber-300 block text-sm">Ajuste de Merma por Cama de Hielo / Deshidratación</strong>
                <p className="text-amber-200/70">
                  En productos pesqueros sobre hielo en escamas, ocurre pérdida de peso por goteo o derretimiento. Registra esta merma periódicamente para cuadrar el inventario exacto.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Seleccionar Especie Afectada:</label>
                <select
                  value={selectedFishForMelt}
                  onChange={(e) => setSelectedFishForMelt(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs outline-none cursor-pointer"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Stock en cámara: {p.stockKg.toFixed(2)} kg - ${p.pricePerKg}/kg)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Kilos de Merma a Descontar (Kg):</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="Ej: 1.50"
                  value={meltWeightKg}
                  onChange={(e) => setMeltWeightKg(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-300 font-mono text-base font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Motivo del Ajuste:</label>
                <select
                  value={meltReason}
                  onChange={(e) => setMeltReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs outline-none cursor-pointer"
                >
                  <option value="Deshidratación / Deshielo en cama de hielo">Deshidratación / Deshielo en cama de hielo</option>
                  <option value="Muestra para control de calidad / cata">Muestra para control de calidad / cata</option>
                  <option value="Merma por golpe en transporte">Merma por golpe en transporte</option>
                  <option value="Caducidad preventiva de refrigeración">Caducidad preventiva de refrigeración</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors shadow-lg shadow-amber-500/20 cursor-pointer active:scale-98"
            >
              Aplicar Descuento de Merma al Inventario
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
