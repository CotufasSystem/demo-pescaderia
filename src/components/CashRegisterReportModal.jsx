import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  DollarSign, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  Clock, 
  X, 
  Printer,
  AlertTriangle
} from 'lucide-react';

export default function CashRegisterReportModal({
  isOpen,
  onClose,
  transactions,
  wasteLogs,
  exchangeRate
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('closing'); // closing | waste

  // Cálculos de Caja
  const totalSalesUSD = transactions.reduce((sum, t) => sum + t.totalUSD, 0);
  const totalSalesBS = totalSalesUSD * exchangeRate;

  const totalPagoMovilUSD = transactions
    .filter((t) => t.method === 'pago_movil')
    .reduce((sum, t) => sum + t.totalUSD, 0);

  const totalCashUSD = transactions
    .filter((t) => t.method === 'cash')
    .reduce((sum, t) => sum + t.totalUSD, 0);

  const totalCardUSD = transactions
    .filter((t) => t.method === 'card')
    .reduce((sum, t) => sum + t.totalUSD, 0);

  const totalMixedUSD = transactions
    .filter((t) => t.method === 'mixed')
    .reduce((sum, t) => sum + t.totalUSD, 0);

  // Mermas
  const totalWasteKg = wasteLogs.reduce((sum, w) => sum + w.wasteKg, 0);
  const totalWasteCostUSD = wasteLogs.reduce((sum, w) => sum + w.costLossUSD, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="marine-glass-card w-full max-w-3xl rounded-3xl p-6 border-2 border-cyan-400/40 relative shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/60 hover:bg-rose-500/30 text-slate-300 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-950 rounded-2xl border border-cyan-400/30 text-cyan-300">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Corte de Caja & Control Financiero</h2>
            <p className="text-xs text-cyan-300/70">
              Arqueo de turno, desglose de métodos de pago y auditoría de mermas
            </p>
          </div>
        </div>

        {/* Pestañas */}
        <div className="flex gap-2 mb-6 border-b border-cyan-950 pb-2">
          <button
            onClick={() => setActiveTab('closing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'closing'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Arqueo de Turno (Reporte Z)
          </button>
          <button
            onClick={() => setActiveTab('waste')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'waste'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Control de Merma por Limpieza/Hielo
          </button>
        </div>

        {activeTab === 'closing' ? (
          <div>
            {/* Resumen Total */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-[#041122] border border-cyan-500/30">
                <span className="text-xs text-cyan-400/80 block">VENTAS TOTALES ($)</span>
                <span className="text-3xl font-black text-white font-mono">${totalSalesUSD.toFixed(2)}</span>
                <span className="text-[11px] text-slate-400 block mt-1">{transactions.length} transacciones registradas</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#041122] border border-emerald-500/30">
                <span className="text-xs text-emerald-400/80 block">TOTAL EN BOLÍVARES (BS)</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  Bs. {totalSalesBS.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">Tasa BCV: {exchangeRate.toFixed(2)} Bs/$</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#041122] border border-rose-500/30">
                <span className="text-xs text-rose-400/80 block">PÉRDIDAS POR MERMA ($)</span>
                <span className="text-2xl font-black text-rose-400 font-mono">-${totalWasteCostUSD.toFixed(2)}</span>
                <span className="text-[11px] text-slate-400 block mt-1">{totalWasteKg.toFixed(2)} kg descartados</span>
              </div>
            </div>

            {/* Desglose por método de cobro */}
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Desglose de Ingresos por Canal
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-900/40">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" /> Pago Móvil
                </span>
                <strong className="text-lg font-mono text-cyan-200 block mt-1">${totalPagoMovilUSD.toFixed(2)}</strong>
                <span className="text-[10px] text-slate-500">Bs. {(totalPagoMovilUSD * exchangeRate).toFixed(2)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-900/40">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Banknote className="w-3.5 h-3.5 text-emerald-400" /> Efectivo
                </span>
                <strong className="text-lg font-mono text-emerald-200 block mt-1">${totalCashUSD.toFixed(2)}</strong>
                <span className="text-[10px] text-slate-500">En caja física</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-sky-900/40">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-sky-400" /> Tarjetas / POS
                </span>
                <strong className="text-lg font-mono text-sky-200 block mt-1">${totalCardUSD.toFixed(2)}</strong>
                <span className="text-[10px] text-slate-500">Lote bancario</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-violet-900/40">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-violet-400" /> Mixtos
                </span>
                <strong className="text-lg font-mono text-violet-200 block mt-1">${totalMixedUSD.toFixed(2)}</strong>
                <span className="text-[10px] text-slate-500">Efectivo + Digital</span>
              </div>
            </div>

            {/* Historial reciente de tickets */}
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Últimas Transacciones del Turno
            </h4>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 max-h-48 overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400 sticky top-0">
                  <tr>
                    <th className="p-2.5">Ticket ID</th>
                    <th className="p-2.5">Hora</th>
                    <th className="p-2.5">Método</th>
                    <th className="p-2.5 text-right">Total ($)</th>
                    <th className="p-2.5 text-right">Total (Bs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-500 font-sans">
                        No hay ventas registradas en este turno aún.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-900/40">
                        <td className="p-2.5 font-bold text-cyan-300">{t.id}</td>
                        <td className="p-2.5 text-slate-400">{t.date}</td>
                        <td className="p-2.5 uppercase font-semibold text-slate-300">{t.method}</td>
                        <td className="p-2.5 text-right text-emerald-400 font-bold">${t.totalUSD.toFixed(2)}</td>
                        <td className="p-2.5 text-right text-slate-300">Bs. {t.totalBS.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Pestaña de Mermas */
          <div>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-amber-300 text-sm">Auditoría de Merma por Limpieza y Deshielo</h4>
                <p className="text-xs text-amber-200/70">
                  Monitoreo de vísceras, cabezas, espinas y deshidratación de mostrador
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black font-mono text-amber-300">
                  {totalWasteKg.toFixed(2)} KG
                </span>
                <span className="block text-[11px] text-slate-400">Total Desperdicio Acumulado</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 max-h-60 overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400 sticky top-0">
                  <tr>
                    <th className="p-2.5">Producto</th>
                    <th className="p-2.5">Tipo de Preparación</th>
                    <th className="p-2.5 text-right">% Merma</th>
                    <th className="p-2.5 text-right">Peso Perdido</th>
                    <th className="p-2.5 text-right">Costo Estimado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {wasteLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-500 font-sans">
                        Aún no se han generado mermas en este turno.
                      </td>
                    </tr>
                  ) : (
                    wasteLogs.map((w, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="p-2.5 text-slate-200 font-bold">{w.productName}</td>
                        <td className="p-2.5 text-cyan-300">{w.preparation}</td>
                        <td className="p-2.5 text-right text-amber-400 font-bold">{w.wastePercent}%</td>
                        <td className="p-2.5 text-right text-rose-400 font-bold">{w.wasteKg.toFixed(3)} kg</td>
                        <td className="p-2.5 text-right text-slate-300">${w.costLossUSD.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-cyan-950">
          <div className="text-xs text-slate-400">
            Cajero en turno: <strong className="text-slate-200">Mostrador Principal #1</strong>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-cyan-500/30"
            >
              <Printer className="w-4 h-4" /> Imprimir Cierre (Z)
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
            >
              Cerrar Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
