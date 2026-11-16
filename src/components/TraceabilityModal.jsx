import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  X, 
  QrCode, 
  ShieldCheck, 
  Calendar, 
  Compass, 
  Tag,
  Scale
} from 'lucide-react';

export default function TraceabilityModal({
  isOpen,
  onClose,
  product,
  currentWeight
}) {
  if (!isOpen || !product) return null;

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 3); // 3 días para pescado fresco

  const handlePrintLabel = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="marine-glass-card w-full max-w-xl rounded-3xl p-6 border-2 border-cyan-400/40 relative shadow-2xl text-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/60 hover:bg-rose-500/30 text-slate-300 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2.5 bg-cyan-950 rounded-xl border border-cyan-400/30 text-cyan-300">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Ficha de Trazabilidad y Etiqueta Sanitaria</h3>
            <p className="text-xs text-cyan-300/70">Cumplimiento de normativa de pesca fresca y origen</p>
          </div>
        </div>

        {/* Datos de Trazabilidad */}
        <div className="grid grid-cols-2 gap-3 text-xs mb-6 p-4 rounded-2xl bg-[#040e1b] border border-cyan-900/60">
          <div>
            <span className="text-slate-400 block">Especie Comercial:</span>
            <strong className="text-white text-sm">{product.name}</strong>
            <span className="text-cyan-400/80 italic block">{product.scientificName}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Lote Sanitario:</span>
            <strong className="text-amber-400 font-mono text-sm">{product.lotNumber}</strong>
          </div>
          <div>
            <span className="text-slate-400 block flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> Lonja / Origen:
            </span>
            <strong className="text-slate-200">{product.origin}</strong>
          </div>
          <div>
            <span className="text-slate-400 block flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Fecha Desembarco:
            </span>
            <strong className="text-slate-200">{product.catchDate}</strong>
          </div>
          <div className="col-span-2 pt-2 border-t border-cyan-950 flex justify-between">
            <span className="text-slate-400">Método de Captura: <strong className="text-cyan-200">{product.captureMethod}</strong></span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
              {product.freshnessTier}
            </span>
          </div>
        </div>

        {/* Vista previa de Etiqueta Térmica Autoadhesiva para Báscula */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-cyan-200 block mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <Tag className="w-4 h-4" /> Vista Previa de Etiqueta Adhesiva de Bandeja
          </label>
          <div id="printable-ticket" className="bg-white text-slate-900 rounded-xl p-4 font-mono text-xs border border-slate-300 max-w-sm mx-auto shadow-md">
            <div className="text-center border-b-2 border-black pb-2 mb-2">
              <h4 className="font-black text-sm uppercase">PESCADERÍA MAR & SAL</h4>
              <p className="text-[10px] font-bold text-slate-700">CERTIFICADO DE ORIGEN FRESCO</p>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between font-black text-xs">
                <span>{product.name}</span>
                <span>${(product.pricePerKg * (currentWeight || 1)).toFixed(2)}</span>
              </div>
              <p className="text-[9px] text-slate-600 italic">{product.scientificName}</p>
              
              <div className="grid grid-cols-2 gap-1 pt-1 text-[10px] border-t border-slate-300">
                <div>
                  <span className="text-slate-500 block">PESO NETO:</span>
                  <span className="font-bold text-xs">{(currentWeight || 1).toFixed(3)} kg</span>
                </div>
                <div>
                  <span className="text-slate-500 block">PRECIO/KG:</span>
                  <span className="font-bold">${product.pricePerKg.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-[9px] text-slate-600 pt-1 border-t border-slate-300">
                <p>ORIGEN: {product.origin}</p>
                <p>LOTE: {product.lotNumber}</p>
                <p>CADUCIDAD REFRIGERADO: {expiryDate.toISOString().split('T')[0]}</p>
              </div>
            </div>

            {/* Código de barras simulado para lector óptico de caja */}
            <div className="mt-3 text-center border-t border-dashed border-slate-400 pt-2">
              <div className="text-lg tracking-[0.2em] font-black select-none">
                || | |||| | ||||| ||| ||| |
              </div>
              <span className="text-[9px] text-slate-500 tracking-wider">2001928374659</span>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 font-semibold text-xs cursor-pointer"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={handlePrintLabel}
            className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/25"
          >
            <Printer className="w-4 h-4" /> Imprimir Etiqueta Térmica
          </button>
        </div>
      </div>
    </div>
  );
}
