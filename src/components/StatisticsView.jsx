import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Fish, 
  Award, 
  Calendar, 
  Layers, 
  Scale, 
  CheckCircle2 
} from 'lucide-react';

export default function StatisticsView({
  transactions,
  products
}) {
  // Ordenar productos con mayor rotación estimada
  const sortedProducts = [...products].sort((a, b) => b.stockKg - a.stockKg);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cyan-950">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            Estadísticas & Rendimiento de Especies
          </h2>
          <p className="text-xs text-slate-400">Análisis de rotación de pescados, métodos de pago y horas punta</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ranking de Especies */}
        <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
          <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Especies con Mayor Demanda en Mostrador
          </h3>

          <div className="space-y-3 text-xs">
            {sortedProducts.slice(0, 5).map((p, idx) => (
              <div key={p.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-100 flex items-center gap-2">
                    <span className="text-base">{p.image}</span>
                    <span>{idx + 1}. {p.name}</span>
                  </span>
                  <span className="font-mono font-bold text-cyan-300">${p.pricePerKg.toFixed(2)}/kg</span>
                </div>
                
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (p.stockKg / 60) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Stock actual: {p.stockKg.toFixed(1)} kg</span>
                  <span className="text-emerald-400 font-semibold">{p.freshnessTier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canales de Pago */}
        <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Preferencias de Pago de Clientes
            </h3>
            
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span className="text-cyan-300">Pago Móvil (Venezuela)</span>
                  <span className="font-mono text-white">55%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: '55%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span className="text-emerald-300">Efectivo ($ Divisas / Bs)</span>
                  <span className="font-mono text-white">25%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '25%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span className="text-sky-300">Punto de Venta / Tarjetas</span>
                  <span className="font-mono text-white">15%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-sky-400 h-full rounded-full" style={{ width: '15%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span className="text-violet-300">Pagos Divididos (Mixto)</span>
                  <span className="font-mono text-white">5%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-violet-400 h-full rounded-full" style={{ width: '5%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800 text-[11px] text-cyan-200 mt-4">
            💡 <strong>Recomendación:</strong> Mantén la tasa BCV actualizada antes de la apertura de caja a las 8:00 AM para agilizar cobros en Pago Móvil.
          </div>
        </div>
      </div>
    </div>
  );
}
