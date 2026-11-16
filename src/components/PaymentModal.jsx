import React, { useState } from 'react';
import { 
  CreditCard, 
  Banknote, 
  Smartphone, 
  QrCode, 
  CheckCircle2, 
  Printer, 
  X, 
  Layers, 
  Copy,
  Receipt,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VENEZUELA_BANKS } from '../data/mockData';

export default function PaymentModal({
  isOpen,
  onClose,
  totalUSD,
  exchangeRate,
  cartItems,
  onPaymentSuccess
}) {
  if (!isOpen) return null;

  const totalBS = totalUSD * exchangeRate;
  const [paymentMethod, setPaymentMethod] = useState('pago_movil'); // pago_movil, cash, card, mixed
  
  // Datos de Pago Móvil
  const [pmBank, setPmBank] = useState('0102');
  const [pmPhone, setPmPhone] = useState('0414-7896541');
  const [pmCedula, setPmCedula] = useState('V-24589632');
  const [pmReference, setPmReference] = useState('');
  
  // Datos de Efectivo
  const [cashAmountUSD, setCashAmountUSD] = useState('');
  const [cashAmountBS, setCashAmountBS] = useState('');
  
  // Datos de Pago Mixto
  const [mixedCashUSD, setMixedCashUSD] = useState(0);
  const [mixedDigitalBS, setMixedDigitalBS] = useState(0);

  // Estado de éxito e impresión
  const [isSuccess, setIsSuccess] = useState(false);
  const [completedTransaction, setCompletedTransaction] = useState(null);

  // Calcular vuelto
  const paidCashTotal = parseFloat(cashAmountUSD || 0) + (parseFloat(cashAmountBS || 0) / exchangeRate);
  const cashChangeUSD = Math.max(0, paidCashTotal - totalUSD);
  const cashChangeBS = cashChangeUSD * exchangeRate;

  const handleCompletePayment = (e) => {
    e.preventDefault();

    if (paymentMethod === 'pago_movil' && !pmReference) {
      alert('Por favor ingresa los últimos 4 o 6 dígitos de la referencia de Pago Móvil');
      return;
    }

    const transaction = {
      id: 'TRX-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString(),
      totalUSD,
      totalBS,
      exchangeRate,
      method: paymentMethod,
      details: {
        pagoMovil: paymentMethod === 'pago_movil' ? { bank: pmBank, phone: pmPhone, reference: pmReference } : null,
        cash: paymentMethod === 'cash' ? { paidUSD: paidCashTotal, changeUSD: cashChangeUSD, changeBS: cashChangeBS } : null
      },
      items: cartItems
    };

    setCompletedTransaction(transaction);
    setIsSuccess(true);

    // Efecto de celebración marina
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f5d4', '#38bdf8', '#0ea5e9', '#67e8f9']
    });

    onPaymentSuccess(transaction);
  };

  const handlePrintTicket = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="marine-glass-card w-full max-w-2xl rounded-3xl p-6 border-2 border-cyan-400/40 relative shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-100 max-h-[92vh] overflow-y-auto">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/60 hover:bg-rose-500/30 text-slate-300 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header del Gestor */}
            <div className="mb-6">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PROCESADOR DE COBRO INMEDIATO
              </span>
              <h2 className="text-2xl font-bold mt-2 text-white flex items-center gap-2">
                Finalizar Venta de Pescadería
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 p-3 sm:p-4 rounded-2xl bg-[#040e1b] border border-cyan-900/60 font-mono">
                <div>
                  <span className="text-[11px] sm:text-xs text-slate-400 block">TOTAL EN DIVISAS:</span>
                  <span className="text-2xl sm:text-3xl font-black text-cyan-300">${totalUSD.toFixed(2)}</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[11px] sm:text-xs text-slate-400 block">TOTAL EN BS. (BCV {exchangeRate.toFixed(2)}):</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400">Bs. {totalBS.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Selector de Método de Pago */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-cyan-200 block mb-2 uppercase tracking-wider">
                Selecciona Método de Pago
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'pago_movil', label: 'Pago Móvil', icon: Smartphone, color: 'text-cyan-400' },
                  { id: 'cash', label: 'Efectivo', icon: Banknote, color: 'text-emerald-400' },
                  { id: 'card', label: 'Punto / Tarjeta', icon: CreditCard, color: 'text-sky-400' },
                  { id: 'mixed', label: 'Pago Mixto', icon: Layers, color: 'text-violet-400' }
                ].map((m) => {
                  const Icon = m.icon;
                  const active = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        active
                          ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-slate-900/40 border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${m.color}`} />
                      <span className="text-xs font-bold">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Formularios Específicos por Método */}
            <div className="p-4 rounded-2xl bg-[#030c18] border border-cyan-900/60 mb-6">
              {paymentMethod === 'pago_movil' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-cyan-950">
                    <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4" /> Datos de Recepción de la Pescadería
                    </span>
                    <span className="text-[11px] text-cyan-400/80 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      Tasa: Bs. {exchangeRate.toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Banco Destino:</span>
                      <strong className="text-cyan-200">0102 - Banco de Venezuela</strong>
                      <span className="text-slate-400 block mt-1">Teléfono Comercio:</span>
                      <strong className="text-cyan-200">0412-5558899</strong>
                    </div>
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">RIF Comercio:</span>
                      <strong className="text-cyan-200">J-31456987-0</strong>
                      <span className="text-slate-400 block mt-1">Monto Exacto a Recibir:</span>
                      <strong className="text-emerald-400 text-sm font-mono">Bs. {totalBS.toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="text-xs text-slate-300 font-semibold block">
                      Datos del Cliente y Confirmación:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <select
                        value={pmBank}
                        onChange={(e) => setPmBank(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:border-cyan-400 outline-none"
                      >
                        {VENEZUELA_BANKS.map((b) => (
                          <option key={b.code} value={b.code}>
                            {b.code} - {b.name}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        placeholder="Últimos 4 o 6 dígitos de Referencia"
                        value={pmReference}
                        onChange={(e) => setPmReference(e.target.value)}
                        className="bg-slate-900 border border-cyan-500/50 rounded-xl p-2.5 text-xs text-cyan-200 font-mono tracking-widest focus:border-cyan-400 outline-none placeholder:text-slate-600"
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="space-y-4">
                  <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 pb-2 border-b border-cyan-950">
                    <Banknote className="w-4 h-4" /> Calculadora de Vuelto en Efectivo
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Efectivo Recibido en USD ($):</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Ej: 20.00"
                        value={cashAmountUSD}
                        onChange={(e) => setCashAmountUSD(e.target.value)}
                        className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl p-2.5 text-lg font-mono text-emerald-300 focus:border-emerald-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">O Efectivo en Bolívares (Bs.):</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Ej: 1000.00"
                        value={cashAmountBS}
                        onChange={(e) => setCashAmountBS(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-lg font-mono text-cyan-300 focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center font-mono">
                    <div>
                      <span className="text-xs text-slate-400 block">Vuelto a devolver ($):</span>
                      <span className="text-2xl font-bold text-emerald-400">${cashChangeUSD.toFixed(2)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Vuelto en Bolívares:</span>
                      <span className="text-xl font-bold text-cyan-300">Bs. {cashChangeBS.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3 text-center py-4">
                  <CreditCard className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
                  <h4 className="text-sm font-bold text-slate-200">Terminal de Punto de Venta POS</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Pase la tarjeta de débito o crédito por el terminal bancario físico por el importe de:
                  </p>
                  <div className="text-2xl font-black font-mono text-cyan-300">
                    Bs. {totalBS.toFixed(2)}
                  </div>
                  <input
                    type="text"
                    placeholder="Número de Aprobación / Lote (Opcional)"
                    className="max-w-xs mx-auto block w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-200 text-center font-mono focus:border-cyan-400 outline-none"
                  />
                </div>
              )}

              {paymentMethod === 'mixed' && (
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-violet-300 flex items-center gap-1.5 pb-2 border-b border-cyan-950">
                    <Layers className="w-4 h-4" /> Pago Dividido (Efectivo + Pago Móvil)
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Parte en Efectivo ($):</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={mixedCashUSD}
                        onChange={(e) => {
                          const cash = parseFloat(e.target.value) || 0;
                          setMixedCashUSD(cash);
                          const remainingUSD = Math.max(0, totalUSD - cash);
                          setMixedDigitalBS(remainingUSD * exchangeRate);
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs font-mono text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Resto en Pago Móvil (Bs.):</label>
                      <input
                        type="text"
                        readOnly
                        value={`Bs. ${mixedDigitalBS.toFixed(2)}`}
                        className="w-full bg-slate-950 border border-cyan-500/40 rounded-xl p-2 text-xs font-mono text-cyan-300 font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botón de Confirmación */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold text-sm cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCompletePayment}
                className="flex-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Registrar y Procesar Pago
              </button>
            </div>
          </div>
        ) : (
          /* Pantalla de Venta Exitosa y Emisión de Ticket */
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-300 shadow-[0_0_20px_#10b981]">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              Transacción Exitosa • {completedTransaction?.id}
            </span>
            <h3 className="text-2xl font-black text-white mt-1">¡Cobro Realizado con Éxito!</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              El inventario se ha actualizado y se registró el método de pago en el corte de caja.
            </p>

            {/* Formato de Ticket Impreso */}
            <div id="printable-ticket" className="bg-white text-slate-900 rounded-xl p-5 max-w-sm mx-auto font-mono text-xs shadow-xl text-left border border-slate-300">
              <div className="text-center border-b border-dashed border-slate-400 pb-3 mb-3">
                <h4 className="font-black text-base uppercase">🐟 Pescadería Mar & Sal C.A.</h4>
                <p className="text-[10px] text-slate-600">RIF: J-31456987-0 • Lonja Pesquera Central</p>
                <p className="text-[10px] text-slate-600">Tel: (0281) 265-8899 • Puerto La Cruz</p>
                <p className="text-[10px] text-slate-500 mt-1">{completedTransaction?.date}</p>
                <p className="text-[10px] font-bold">TICKET: {completedTransaction?.id}</p>
              </div>

              <div className="border-b border-dashed border-slate-400 pb-2 mb-2">
                <div className="flex justify-between font-bold text-[11px] mb-1">
                  <span>Cant / Peso</span>
                  <span>Prod / Corte</span>
                  <span>Total</span>
                </div>
                {completedTransaction?.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-0.5 text-[10px]">
                    <span>{item.weightKg.toFixed(3)}kg</span>
                    <span className="truncate max-w-[120px]">{item.name} ({item.preparation})</span>
                    <span className="font-bold">${item.subtotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-right text-[11px] border-b border-dashed border-slate-400 pb-2 mb-2">
                <div className="flex justify-between">
                  <span>TOTAL DIVISAS:</span>
                  <span className="font-bold">${completedTransaction?.totalUSD.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>TOTAL BS (BCV {completedTransaction?.exchangeRate.toFixed(2)}):</span>
                  <span>Bs. {completedTransaction?.totalBS.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 text-[10px]">
                  <span>Forma de Pago:</span>
                  <span className="uppercase font-semibold">{completedTransaction?.method}</span>
                </div>
              </div>

              <div className="text-center pt-2">
                <p className="text-[9px] text-slate-500 uppercase">Garantía de Cadena de Frío</p>
                <p className="text-[9px] text-slate-500">Mantener refrigerado entre 0°C y 4°C</p>
                <p className="text-[10px] font-bold mt-2">¡Gracias por preferir pesca fresca!</p>
                {/* Código de barras simulado */}
                <div className="mt-2 tracking-widest font-black text-center text-xs select-none">
                  ||||| | |||| ||| ||||||| | ||
                </div>
              </div>
            </div>

            {/* Acciones de post-cobro */}
            <div className="flex gap-3 max-w-sm mx-auto mt-6">
              <button
                type="button"
                onClick={handlePrintTicket}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-cyan-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Imprimir Ticket
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-lg shadow-cyan-500/30"
              >
                Nueva Venta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
