import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  TrendingDown, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Save,
  Filter
} from 'lucide-react';

export default function ExpensesManager({
  expenses,
  onAddExpense,
  onPayExpense
}) {
  const [activeTab, setActiveTab] = useState('fijos'); // 'fijos' | 'variables'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Formulario de nuevo gasto
  const [newExpense, setNewExpense] = useState({
    name: '',
    category: 'Insumos Marinos',
    type: 'variable',
    amountUSD: '',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const fixedExpenses = expenses.filter(e => e.type === 'fijo');
  const variableExpenses = expenses.filter(e => e.type === 'variable');

  const totalFixedUSD = fixedExpenses.reduce((sum, e) => sum + e.amountUSD, 0);
  const totalVariableUSD = variableExpenses.reduce((sum, e) => sum + e.amountUSD, 0);
  const totalGeneralUSD = totalFixedUSD + totalVariableUSD;

  const currentList = activeTab === 'fijos' ? fixedExpenses : variableExpenses;

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!newExpense.name || !newExpense.amountUSD) {
      alert('Ingresa el nombre y monto del gasto');
      return;
    }

    const created = {
      id: 'exp-' + Date.now(),
      name: newExpense.name,
      category: newExpense.category,
      type: newExpense.type,
      amountUSD: parseFloat(newExpense.amountUSD),
      dueDate: newExpense.dueDate,
      lastPaymentDate: '-',
      daysRemaining: 15,
      status: 'Pendiente'
    };

    onAddExpense(created);
    setIsAddModalOpen(false);
    setNewExpense({
      name: '',
      category: 'Insumos Marinos',
      type: 'variable',
      amountUSD: '',
      dueDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      {/* Header del Módulo de Gastos */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cyan-950">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Receipt className="w-6 h-6 text-cyan-400" />
            Gastos Fijos & Variables
          </h2>
          <p className="text-xs text-slate-400">Control de egresos, pagos a lonjas, insumos y mantenimiento de frío</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Agregar Gasto
        </button>
      </div>

      {/* Tarjetas de Resumen (Idéntico a imagen 2 de referencia) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
          <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider mb-1">Gastos Totales</span>
          <div className="text-3xl font-black font-mono text-white">
            ${totalGeneralUSD.toFixed(2)}
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Presupuesto mensual controlado</span>
        </div>

        <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
          <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider mb-1">Gastos Fijos</span>
          <div className="text-3xl font-black font-mono text-cyan-300">
            ${totalFixedUSD.toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Alquiler, electricidad, nómina fija</span>
        </div>

        <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
          <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider mb-1">Gastos Variables</span>
          <div className="text-3xl font-black font-mono text-amber-300">
            ${totalVariableUSD.toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Barras de hielo, transporte, empaques</span>
        </div>
      </div>

      {/* Pestañas de Gastos */}
      <div className="flex gap-2 border-b border-cyan-950 pb-2">
        <button
          onClick={() => setActiveTab('variables')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'variables'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Gastos Variables ({variableExpenses.length})
        </button>
        <button
          onClick={() => setActiveTab('fijos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'fijos'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Gastos Fijos ({fixedExpenses.length})
        </button>
      </div>

      {/* Tabla de Gastos Estilo Referencia */}
      <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#030d1a] text-slate-400 border-b border-cyan-950">
              <tr>
                <th className="p-3">NOMBRE</th>
                <th className="p-3">CATEGORÍA</th>
                <th className="p-3">MONTO ($)</th>
                <th className="p-3">FECHA DE PAGO</th>
                <th className="p-3">ÚLTIMO PAGO</th>
                <th className="p-3">DÍAS RESTANTES</th>
                <th className="p-3 text-center">ACCIÓN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {currentList.map((gasto) => (
                <tr key={gasto.id} className="hover:bg-cyan-950/20 transition-colors">
                  <td className="p-3 font-bold text-slate-100 font-sans">{gasto.name}</td>
                  <td className="p-3 text-cyan-300 font-sans">{gasto.category}</td>
                  <td className="p-3 font-bold text-emerald-400 text-sm">${gasto.amountUSD.toFixed(2)}</td>
                  <td className="p-3 text-slate-300">{gasto.dueDate}</td>
                  <td className="p-3 text-slate-400">{gasto.lastPaymentDate}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      gasto.status === 'Pagado'
                        ? 'bg-slate-800 text-slate-400'
                        : gasto.daysRemaining <= 2
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {gasto.status === 'Pagado' ? 'Pagado' : `${gasto.daysRemaining} días`}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {gasto.status === 'Pagado' ? (
                      <span className="text-[11px] text-emerald-400 font-sans font-bold flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Al día
                      </span>
                    ) : (
                      <button
                        onClick={() => onPayExpense(gasto.id)}
                        className="px-3 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 font-bold text-xs cursor-pointer active:scale-95 transition-all"
                      >
                        Pagar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Agregar Gasto */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="marine-glass-card w-full max-w-md rounded-3xl p-6 border-2 border-cyan-400/40 relative shadow-2xl text-slate-100">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/60 hover:bg-rose-500/30 text-slate-300 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-4">Registrar Nuevo Gasto</h3>

            <form onSubmit={handleCreateExpense} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Concepto del Gasto:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Mantenimiento de motor de cava"
                  value={newExpense.name}
                  onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 focus:border-cyan-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Tipo:</label>
                  <select
                    value={newExpense.type}
                    onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none cursor-pointer"
                  >
                    <option value="variable">Variable</option>
                    <option value="fijo">Fijo</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Monto ($ USD):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={newExpense.amountUSD}
                    onChange={(e) => setNewExpense({ ...newExpense, amountUSD: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 font-mono font-bold text-emerald-300 text-sm focus:border-emerald-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Categoría:</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none cursor-pointer"
                >
                  <option value="Insumos Marinos">Insumos Marinos (Hielo, Sal)</option>
                  <option value="Alquiler">Alquiler de Local / Puesto</option>
                  <option value="Servicios Básicos">Electricidad & Agua</option>
                  <option value="Nómina">Nómina y Mano de Obra</option>
                  <option value="Transporte">Transporte / Flete de Puerto</option>
                  <option value="Empaque">Empaque y Bolsas al Vacío</option>
                  <option value="Mantenimiento">Mantenimiento y Reparaciones</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Fecha Límite / Pago:</label>
                <input
                  type="date"
                  value={newExpense.dueDate}
                  onChange={(e) => setNewExpense({ ...newExpense, dueDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 cursor-pointer active:scale-95"
                >
                  <Save className="w-4 h-4" /> Guardar Gasto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
