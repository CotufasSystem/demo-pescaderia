import React from 'react';
import { 
  DollarSign, 
  Scale, 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  PlusCircle,
  FileSpreadsheet,
  Layers,
  Smartphone
} from 'lucide-react';

export default function HomeDashboard({
  transactions,
  products,
  exchangeRate,
  onNavigateToPOS,
  onOpenReport,
  onOpenAddExpense
}) {
  const totalUSD = transactions.reduce((sum, t) => sum + t.totalUSD, 0);
  const totalBS = totalUSD * exchangeRate;
  const totalKgSold = transactions.reduce((sum, t) => {
    return sum + t.items.reduce((itemSum, item) => itemSum + item.weightKg, 0);
  }, 0);

  const pendingWasteCount = products.filter(p => p.stockKg <= 15).length;

  return (
    <div className="space-y-6">
      {/* Top Banner de Bienvenida y Acciones Rápidas */}
      <div className="marine-glass-card rounded-3xl p-6 border border-cyan-400/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            PANEL DE CONTROL • MOSTRADOR MARINO
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-wide">
            Resumen Operativo de la Pescadería
          </h2>
          <p className="text-xs text-cyan-200/70 max-w-xl">
            Control en vivo de transacciones, pesaje acumulado, flujo de efectivo y estado de inventario en frío.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onNavigateToPOS}
            className="flex-1 md:flex-none px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:brightness-110 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 cursor-pointer active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            Nueva Venta (Báscula POS)
          </button>
          <button
            onClick={onOpenAddExpense}
            className="flex-1 md:flex-none px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-rose-300 border border-rose-500/40 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4 text-rose-400" />
            Registrar Gasto
          </button>
        </div>
      </div>

      {/* Métricas Principales (Cards estilo referencia) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Facturado */}
        <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Facturado</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black font-mono text-white mb-1">
            ${totalUSD.toFixed(2)}
          </div>
          <div className="text-xs font-mono text-emerald-400 flex items-center justify-between">
            <span>Bs. {totalBS.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-[10px] text-slate-500">Tasa: {exchangeRate.toFixed(2)}</span>
          </div>
        </div>

        {/* Kilos Despachados */}
        <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pescado Despachado</span>
            <Scale className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black font-mono text-cyan-300 mb-1">
            {totalKgSold.toFixed(2)} <span className="text-lg">KG</span>
          </div>
          <div className="text-xs text-slate-400">
            {transactions.length} pedidos pesados hoy
          </div>
        </div>

        {/* Especies en Cámara */}
        <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Especies en Stock</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black font-mono text-emerald-300 mb-1">
            {products.length} <span className="text-lg">Tipos</span>
          </div>
          <div className="text-xs text-slate-400">
            Cámara a 1.8°C óptima
          </div>
        </div>

        {/* Alertas de Merma / Stock */}
        <div className="marine-glass-card rounded-2xl p-5 border border-amber-500/30">
          <div className="flex items-center justify-between text-amber-300 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Alertas de Stock</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black font-mono text-amber-300 mb-1">
            {pendingWasteCount} <span className="text-lg">Lotes</span>
          </div>
          <div className="text-xs text-amber-200/80">
            Stock menor a 15 kg
          </div>
        </div>
      </div>

      {/* Tabla de Pagos Recientes (Idéntica a la tabla de la referencia) */}
      <div className="marine-glass-card rounded-3xl p-6 border border-cyan-500/30 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-cyan-950 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Pagos y Transacciones Recientes
            </h3>
            <p className="text-xs text-slate-400">Historial cronológico de cobros en mostrador</p>
          </div>

          <button
            onClick={onOpenReport}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" /> Ver Arqueo Completo (Corte Z)
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#030d1a] text-slate-400 border-b border-cyan-950">
              <tr>
                <th className="p-3">IMPORTE</th>
                <th className="p-3">ESTADO</th>
                <th className="p-3">MÉTODO DE PAGO</th>
                <th className="p-3">FECHA Y HORA</th>
                <th className="p-3 text-right">TICKET REF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-sans">
                    Aún no se han procesado cobros hoy. Realiza tu primera venta desde la báscula POS.
                  </td>
                </tr>
              ) : (
                transactions.slice(0, 8).map((t) => (
                  <tr key={t.id} className="hover:bg-cyan-950/20 transition-colors">
                    <td className="p-3">
                      <strong className="text-emerald-400 font-black text-sm block">
                        USD {t.totalUSD.toFixed(2)}
                      </strong>
                      <span className="text-[10px] text-slate-400">
                        Bs. {t.totalBS.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Exitoso
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 uppercase font-semibold text-[11px]">
                        {t.method === 'pago_movil' ? 'PAGO MÓVIL' : t.method === 'cash' ? 'EFECTIVO' : t.method === 'card' ? 'PUNTO BANCARIO' : 'PAGO MIXTO'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">
                      {t.date}
                    </td>
                    <td className="p-3 text-right font-bold text-cyan-400">
                      {t.id}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
