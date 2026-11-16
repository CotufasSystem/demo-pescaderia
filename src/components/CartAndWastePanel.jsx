import React, { useState } from 'react';
import { 
  Fish, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  ShoppingBag, 
  Layers, 
  Sparkles,
  Scissors
} from 'lucide-react';

export default function CartAndWastePanel({
  cart,
  onUpdateCartItem,
  onRemoveCartItem,
  onClearCart,
  onOpenPayment,
  exchangeRate
}) {
  const totalUSD = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const totalBS = totalUSD * exchangeRate;

  return (
    <div className="marine-glass rounded-3xl p-5 border border-cyan-500/30 flex flex-col h-full shadow-2xl relative">
      {/* Header Carrito */}
      <div className="flex items-center justify-between pb-4 border-b border-cyan-900/50 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-950/80 rounded-xl border border-cyan-400/40 text-cyan-300">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Orden del Mostrador</h3>
            <p className="text-xs text-cyan-300/70">{cart.length} productos pesados</p>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="text-xs text-rose-400/80 hover:text-rose-300 hover:underline cursor-pointer flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Vaciar
          </button>
        )}
      </div>

      {/* Lista de Items con control de merma / preparación */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[460px]">
        {cart.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-slate-500 text-center p-4">
            <Fish className="w-12 h-12 stroke-[1.2] mb-2 opacity-40 animate-bounce" />
            <p className="text-xs">No hay pescados en la orden actual.</p>
            <p className="text-[11px] text-slate-600 mt-1">Coloca un producto en la báscula y presiona "Agregar a la Orden".</p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.cartId}
              className="p-3 rounded-2xl bg-[#030d1a]/80 border border-cyan-500/20 hover:border-cyan-400/40 transition-all text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.image}</span>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm leading-tight">{item.name}</h4>
                    <span className="text-[11px] text-cyan-300 font-mono">
                      ${item.pricePerKg.toFixed(2)}/kg
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-base font-black text-cyan-300 block">
                    ${item.subtotal.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Bs. {(item.subtotal * exchangeRate).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Selector de Preparación / Merma */}
              <div className="mt-2.5 pt-2 border-t border-cyan-950/80 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <Scissors className="w-3 h-3 text-cyan-400" />
                  <span className="text-[11px] text-slate-400">Preparación:</span>
                  <select
                    value={item.preparationId}
                    onChange={(e) => {
                      const prep = item.allowedPreparations.find(p => p.id === e.target.value);
                      if (prep) {
                        onUpdateCartItem(item.cartId, {
                          preparationId: prep.id,
                          preparation: prep.label,
                          wastePercent: prep.wastePercent
                        });
                      }
                    }}
                    className="bg-slate-900 border border-cyan-900 rounded-lg px-2 py-0.5 text-[11px] text-cyan-200 outline-none cursor-pointer"
                  >
                    {item.allowedPreparations.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label} ({p.wastePercent}% merma)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-300 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    {item.weightKg.toFixed(3)} kg
                  </span>
                  <button
                    onClick={() => onRemoveCartItem(item.cartId)}
                    className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Detalle del peso neto entregado al cliente tras eviscerado */}
              {item.wastePercent > 0 && (
                <div className="mt-1.5 flex justify-between text-[10px] text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded">
                  <span>Merma de limpieza: -{(item.weightKg * (item.wastePercent / 100)).toFixed(3)} kg</span>
                  <span>Entrega neta limpia: {(item.weightKg * (1 - item.wastePercent / 100)).toFixed(3)} kg</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Resumen Final y Botón de Pago */}
      <div className="mt-4 pt-4 border-t border-cyan-900/60">
        <div className="space-y-1.5 mb-4 font-mono text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal Bruto:</span>
            <span>${totalUSD.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Tasa de Conversión (BCV):</span>
            <span>Bs. {exchangeRate.toFixed(2)} / $</span>
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-cyan-950 text-white">
            <span className="font-bold text-sm">TOTAL A PAGAR:</span>
            <div className="text-right">
              <span className="text-2xl font-black text-cyan-300 block">${totalUSD.toFixed(2)}</span>
              <span className="text-xs font-bold text-emerald-400">
                Bs. {totalBS.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenPayment}
          disabled={cart.length === 0}
          className={`w-full py-3.5 rounded-2xl font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
            cart.length > 0
              ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 hover:brightness-110 shadow-cyan-500/30 active:scale-98'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          COBRAR AHORA (F8)
        </button>
      </div>
    </div>
  );
}
