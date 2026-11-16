import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Scale, 
  AlertTriangle, 
  PieChart, 
  BarChart, 
  Printer,
  Calendar,
  Layers
} from 'lucide-react';

export default function FinancialSummary({
  transactions,
  expenses,
  wasteLogs,
  exchangeRate
}) {
  const totalIncomeUSD = transactions.reduce((sum, t) => sum + t.totalUSD, 0);
  const totalExpensesUSD = expenses.reduce((sum, e) => sum + e.amountUSD, 0);
  const totalWasteLossUSD = wasteLogs.reduce((sum, w) => sum + w.costLossUSD, 0);
  
  // Utilidad Neta Real
  const netProfitUSD = totalIncomeUSD - totalExpensesUSD - totalWasteLossUSD;

  // Porcentaje de margen
  const marginPercent = totalIncomeUSD > 0 ? ((netProfitUSD / totalIncomeUSD) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cyan-950">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Resumen Financiero & Balance Operativo
          </h2>
          <p className="text-xs text-slate-400">Auditoría consolidada de ingresos, mermas de lonja y rentabilidad real</p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Printer className="w-4 h-4" /> Imprimir Balance
        </button>
      </div>

      {/* Tarjetas Principales de Balance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Ingresos Totales */}
        <div className="marine-glass-card rounded-2xl p-5 border border-emerald-500/30">
          <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider mb-1">Total Ingresos</span>
          <div className="text-3xl font-black font-mono text-emerald-400">
            ${totalIncomeUSD.toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Bs. {(totalIncomeUSD * exchangeRate).toFixed(2)}</span>
        </div>

        {/* Egresos / Gastos */}
        <div className="marine-glass-card rounded-2xl p-5 border border-rose-500/30">
          <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider mb-1">Gastos Operativos</span>
          <div className="text-3xl font-black font-mono text-rose-400">
            -${totalExpensesUSD.toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">{expenses.length} conceptos registrados</span>
        </div>

        {/* Pérdidas por Merma / Hielo */}
        <div className="marine-glass-card rounded-2xl p-5 border border-amber-500/30">
          <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider mb-1">Costo de Mermas</span>
          <div className="text-3xl font-black font-mono text-amber-400">
            -${totalWasteLossUSD.toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Vísceras, piel y deshidratación</span>
        </div>

        {/* Ganancia Neta */}
        <div className={`marine-glass-card rounded-2xl p-5 border ${netProfitUSD >= 0 ? 'border-cyan-400/50' : 'border-rose-500/50'}`}>
          <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider mb-1">Margen Neto Estimado</span>
          <div className={`text-3xl font-black font-mono ${netProfitUSD >= 0 ? 'text-cyan-300' : 'text-rose-400'}`}>
            ${netProfitUSD.toFixed(2)}
          </div>
          <span className="text-[11px] font-bold text-cyan-400 mt-1 block">
            {marginPercent}% margen sobre ventas
          </span>
        </div>
      </div>

      {/* Desglose de Gastos e Ingresos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
          <h3 className="font-bold text-white text-sm mb-3">Distribución de Gastos</h3>
          <div className="space-y-2.5 text-xs">
            {expenses.map((e) => (
              <div key={e.id} className="flex justify-between items-center p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <strong className="text-slate-200 block">{e.name}</strong>
                  <span className="text-[10px] text-cyan-400">{e.category} ({e.type})</span>
                </div>
                <div className="text-right font-mono font-bold text-rose-300">
                  ${e.amountUSD.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
          <h3 className="font-bold text-white text-sm mb-3">Registro de Mermas de Mostrador</h3>
          <div className="space-y-2.5 text-xs">
            {wasteLogs.length === 0 ? (
              <div className="p-6 text-center text-slate-500 font-sans">
                Sin mermas registradas en el período.
              </div>
            ) : (
              wasteLogs.map((w, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div>
                    <strong className="text-slate-200 block">{w.productName}</strong>
                    <span className="text-[10px] text-amber-300">{w.preparation}</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-amber-400 block font-bold">{w.wasteKg.toFixed(3)} kg</span>
                    <span className="text-[10px] text-rose-400">-${w.costLossUSD.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
