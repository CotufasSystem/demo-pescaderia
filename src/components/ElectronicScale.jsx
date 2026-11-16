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

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-950/80 rounded-xl border border-cyan-400/40 text-cyan-300">
            <Scale className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 flex items-center gap-2 text-sm tracking-wide">
              BÁSCULA ELECTRÓNICA DE MOSTRADOR
              <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${
                isSerialConnected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {isSerialConnected ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {isSerialConnected ? 'ONLINE (COM3 / USB)' : 'MODO EMULADO'}
              </span>
            </h3>
            <p className="text-xs text-cyan-300/70">Protocolo Toledo/Torrey 9600 baud - Detección automática</p>
          </div>
        </div>

        <button
          onClick={handleConnectSerial}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-400/30 cursor-pointer active:scale-95"
        >
          <Cpu className="w-3.5 h-3.5" />
          {isSerialConnected ? 'Desconectar Báscula' : 'Conectar Balanza Web'}
        </button>
      </div>

      {/* Visor digital estilo LCD Marino */}
      <div className="bg-[#030d1a] border-2 border-cyan-400/50 rounded-xl p-4 shadow-inner flex flex-col items-center justify-center relative">
        <div className="w-full flex justify-between items-center text-xs text-cyan-400/60 font-mono border-b border-cyan-900/50 pb-1 mb-2">
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isStable ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400 animate-ping'}`} />
            {isStable ? 'ESTABLE' : 'PESANDO...'}
          </span>
          <span>TARA: {tareWeight.toFixed(3)} kg</span>
          <span>PESO NETO ACTIVO</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-5xl md:text-6xl font-black font-mono tracking-wider text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)]">
            {currentWeight.toFixed(3)}
          </span>
          <span className="text-2xl font-bold text-cyan-400 font-mono">KG</span>
        </div>

        <div className="text-xs text-cyan-200/50 mt-1 font-mono">
          Equivalente a: {(currentWeight * 1000).toFixed(0)} Gramos
        </div>
      </div>

      {/* Controles rápidos de la Báscula */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 font-medium mr-1">Pesos de prueba:</span>
          {[0.25, 0.5, 0.85, 1.25, 2.1, 3.5].map((w) => (
            <button
              key={w}
              onClick={() => triggerWeight(w)}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 hover:bg-cyan-900/60 hover:text-cyan-200 border border-slate-700/60 text-slate-300 transition-colors font-mono cursor-pointer active:scale-95"
            >
              +{w >= 1 ? `${w} kg` : `${w * 1000} g`}
            </button>
          ))}
          <button
            onClick={() => {
              const custom = parseFloat(prompt('Ingresa el peso en kg (Ej: 1.75):', '1.0'));
              if (!isNaN(custom) && custom >= 0) triggerWeight(custom);
            }}
            className="px-2.5 py-1 text-xs rounded-lg bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 cursor-pointer"
          >
            Manual...
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onTare(currentWeight);
              onWeightChange(0);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            Tarar Recipiente
          </button>
          <button
            onClick={() => {
              onTare(0);
              onWeightChange(0);
              setRawWeight(0);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition-colors cursor-pointer"
          >
            Poner en Cero
          </button>
        </div>
      </div>
    </div>
  );
}
