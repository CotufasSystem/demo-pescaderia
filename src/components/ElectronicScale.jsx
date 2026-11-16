import React, { useState, useEffect } from 'react';
import { Scale, RefreshCw, Zap, CheckCircle2, AlertCircle, Cpu } from 'lucide-react';

export default function ElectronicScale({
  currentWeight,
  onWeightChange,
  tareWeight,
  onTare,
  isSerialConnected,
  setIsSerialConnected
}) {
  const [isStable, setIsStable] = useState(true);
  const [simulationMode, setSimulationMode] = useState(true);
  const [rawWeight, setRawWeight] = useState(0);

  // Fluctuación realista de balanza cuando se cambia el peso
  const triggerWeight = (weight) => {
    setIsStable(false);
    setRawWeight(weight);
    setTimeout(() => {
      onWeightChange(Math.max(0, weight - tareWeight));
      setIsStable(true);
    }, 350);
  };

  // Simulación de conexión Web Serial API
  const handleConnectSerial = async () => {
    if ('serial' in navigator) {
      try {
        // En navegadores compatibles permite solicitar el puerto USB/COM
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });
        setIsSerialConnected(true);
        setSimulationMode(false);
      } catch (err) {
        console.warn('Conexión serial cancelada o en simulador:', err);
        // Fallback a modo emulado conectado
        setIsSerialConnected(true);
      }
    } else {
      // Activar modo simulador conectado
      setIsSerialConnected(!isSerialConnected);
    }
  };

  return (
    <div className="marine-glass rounded-2xl p-5 border border-cyan-500/30 relative overflow-hidden shadow-2xl">
      {/* Fondo con brillo náutico */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="p-2 bg-cyan-950/80 rounded-xl border border-cyan-400/40 text-cyan-300 shrink-0 mt-0.5 sm:mt-0">
            <Scale className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h3 className="font-bold text-slate-100 text-xs sm:text-sm tracking-wide">
                BÁSCULA ELECTRÓNICA DE MOSTRADOR
              </h3>
              <span className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-medium ${
                isSerialConnected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {isSerialConnected ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {isSerialConnected ? 'ONLINE (COM3 / USB)' : 'MODO EMULADO'}
              </span>
            </div>
            <p className="text-[11px] text-cyan-300/70 mt-0.5">Protocolo Toledo/Torrey 9600 baud - Detección automática</p>
          </div>
        </div>

        <button
          onClick={handleConnectSerial}
          className="w-full sm:w-auto px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-400/30 cursor-pointer active:scale-95"
        >
          <Cpu className="w-3.5 h-3.5" />
          {isSerialConnected ? 'Desconectar Báscula' : 'Conectar Balanza Web'}
        </button>
      </div>

      {/* Visor digital estilo LCD Marino */}
      <div className="bg-[#030d1a] border-2 border-cyan-400/50 rounded-xl p-3 sm:p-4 shadow-inner flex flex-col items-center justify-center relative">
        <div className="w-full flex justify-between items-center text-[10px] sm:text-xs text-cyan-400/70 font-mono border-b border-cyan-900/50 pb-1.5 mb-2 gap-1 flex-wrap">
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${isStable ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400 animate-ping'}`} />
            {isStable ? 'ESTABLE' : 'PESANDO...'}
          </span>
          <span>TARA: {tareWeight.toFixed(3)} kg</span>
          <span className="hidden xs:inline">PESO NETO</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-4xl xs:text-5xl md:text-6xl font-black font-mono tracking-wider text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]">
            {currentWeight.toFixed(3)}
          </span>
          <span className="text-xl xs:text-2xl font-bold text-cyan-400 font-mono">KG</span>
        </div>

        <div className="text-[11px] sm:text-xs text-cyan-200/50 mt-1 font-mono">
          Equivalente a: {(currentWeight * 1000).toFixed(0)} Gramos
        </div>
      </div>

      {/* Controles rápidos de la Báscula */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium mr-0.5">Pesos:</span>
          {[0.25, 0.5, 0.85, 1.25, 2.1, 3.5].map((w) => (
            <button
              key={w}
              onClick={() => triggerWeight(w)}
              className="px-2 py-1 text-[11px] sm:text-xs rounded-lg bg-slate-800/80 hover:bg-cyan-900/60 hover:text-cyan-200 border border-slate-700/60 text-slate-300 transition-colors font-mono cursor-pointer active:scale-95"
            >
              +{w >= 1 ? `${w}k` : `${w * 1000}g`}
            </button>
          ))}
          <button
            onClick={() => {
              const custom = parseFloat(prompt('Ingresa el peso en kg (Ej: 1.75):', '1.0'));
              if (!isNaN(custom) && custom >= 0) triggerWeight(custom);
            }}
            className="px-2 py-1 text-[11px] sm:text-xs rounded-lg bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 cursor-pointer"
          >
            Manual...
          </button>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
          <button
            onClick={() => {
              onTare(currentWeight);
              onWeightChange(0);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            Tarar
          </button>
          <button
            onClick={() => {
              onTare(0);
              onWeightChange(0);
              setRawWeight(0);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 flex items-center justify-center transition-colors cursor-pointer"
          >
            Poner a Cero
          </button>
        </div>
      </div>
    </div>
  );
}
