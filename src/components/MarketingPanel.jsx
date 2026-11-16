import React, { useState } from 'react';
import { 
  Megaphone, 
  Send, 
  Users, 
  PhoneCall, 
  Share2, 
  CheckCircle2, 
  Sparkles,
  MessageSquare
} from 'lucide-react';

export default function MarketingPanel({
  products,
  clients,
  exchangeRate
}) {
  const [broadcastText, setBroadcastText] = useState(
    '🌊 ¡Buenas tardes pescadores! Acaban de llegar a la pescadería: Pargo Rojo de Piedra, Salmón y Camarón Jumbo recién desembarcados. ¡Pide tu filete o lomo limpio!'
  );
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyBroadcast = () => {
    navigator.clipboard.writeText(broadcastText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cyan-950">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-cyan-400" />
            Marketing & Difusión Marina
          </h2>
          <p className="text-xs text-slate-400">Difusión de pesca fresca del día a restaurantes, chefs y clientes recurrentes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Generador de Mensajes de WhatsApp de Pescadería */}
        <div className="lg:col-span-7 space-y-4">
          <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
            <h3 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Plantilla de Difusión por WhatsApp
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Redacta o copia la lista de precios y ofertas para compartir a tus grupos de clientes:
            </p>

            <textarea
              rows={4}
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs text-slate-100 focus:border-cyan-400 outline-none mb-3"
            />

            <div className="flex flex-wrap gap-2 justify-between items-center">
              <button
                onClick={() => {
                  const list = products.slice(0, 4).map(p => `• ${p.name}: $${p.pricePerKg}/kg (Bs. ${(p.pricePerKg * exchangeRate).toFixed(2)})`).join('\n');
                  setBroadcastText(`🐟 OFERTAS DE HOY EN PESCADERÍA:\n${list}\n\n¡Garantía de frescura y cadena de frío! Escríbenos para apartar tu pedido.`);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold cursor-pointer"
              >
                Insertar Precios del Día
              </button>

              <button
                onClick={handleCopyBroadcast}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/25 cursor-pointer"
              >
                {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                {isCopied ? '¡Texto Copiado!' : 'Copiar para WhatsApp'}
              </button>
            </div>
          </div>
        </div>

        {/* Directorio de Clientes Frecuentes */}
        <div className="lg:col-span-5 space-y-3">
          <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <Users className="w-4 h-4 text-cyan-400" />
                Clientes Frecuentes
              </h3>
              <span className="text-[11px] font-mono text-cyan-300 font-bold">{clients.length} registrados</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {clients.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100 block">{c.name}</strong>
                    <span className="text-[10px] text-cyan-400">{c.phone} • {c.category}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Último: {c.lastOrder}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-400 block">${c.totalSpentUSD.toFixed(2)}</span>
                    <a
                      href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(broadcastText)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-1 text-[10px] text-emerald-400 hover:underline font-semibold"
                    >
                      Enviar WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
