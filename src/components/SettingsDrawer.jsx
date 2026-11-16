import React from 'react';
import { 
  X, 
  Sliders, 
  Check, 
  Sun, 
  Moon, 
  RotateCcw
} from 'lucide-react';

export default function SettingsDrawer({
  isOpen,
  onClose,
  config,
  onChangeConfig,
  onResetDefaults
}) {
  if (!isOpen) return null;

  const colorThemes = [
    { id: 'cyan', bg: '#00f5d4', label: 'Cian Bioluminiscente' },
    { id: 'blue', bg: '#38bdf8', label: 'Azul Océano' },
    { id: 'emerald', bg: '#10b981', label: 'Verde Alga' },
    { id: 'indigo', bg: '#6366f1', label: 'Índigo Profundo' },
    { id: 'amber', bg: '#f59e0b', label: 'Coral Ámbar' },
    { id: 'teal', bg: '#06b6d4', label: 'Turquesa Marino' },
    { id: 'yellow', bg: '#eab308', label: 'Dorado Solar' },
    { id: 'rose', bg: '#f43f5e', label: 'Rosa Salmón' },
    { id: 'purple', bg: '#a855f7', label: 'Púrpura Abisal' },
    { id: 'lime', bg: '#84cc16', label: 'Verde Lima' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-all animate-fadeIn">
      <div 
        className="w-full max-w-sm h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l transition-all duration-300 marine-glass text-slate-100"
        style={{ borderColor: 'var(--primary)' }}
      >
        {/* Header */}
        <div>
          <div className="p-5 border-b border-cyan-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div 
                className="p-2 rounded-xl text-slate-950 font-bold"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white">Configuración</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900/60 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-6 text-sm">
            
            {/* 1. Tipo de menú */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2.5 tracking-wide">
                Tipo de menú
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'estatico', label: 'Estático' },
                  { id: 'superpuesto', label: 'Superpuesto' },
                  { id: 'slim', label: 'Delgado' },
                  { id: 'slim_plus', label: 'Delgado +' }
                ].map((type) => {
                  const isSelected = config.menuType === type.id;
                  return (
                    <label
                      key={type.id}
                      onClick={() => onChangeConfig('menuType', type.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'accent-border-active accent-bg-subtle font-bold'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border flex items-center justify-center"
                        style={{ borderColor: isSelected ? 'var(--primary)' : '#475569' }}
                      >
                        {isSelected && (
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: 'var(--primary)' }} 
                          />
                        )}
                      </span>
                      <span>{type.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 2. Esquema de color */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2.5 tracking-wide">
                Esquema de color
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'oscuro', label: 'Oscuro (Abisal)', icon: Moon },
                  { id: 'claro', label: 'Claro (Espuma)', icon: Sun }
                ].map((s) => {
                  const Icon = s.icon;
                  const active = config.colorScheme === s.id;
                  return (
                    <label
                      key={s.id}
                      onClick={() => onChangeConfig('colorScheme', s.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        active
                          ? 'accent-border-active accent-bg-subtle font-bold'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border flex items-center justify-center"
                        style={{ borderColor: active ? 'var(--primary)' : '#475569' }}
                      >
                        {active && (
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: 'var(--primary)' }} 
                          />
                        )}
                      </span>
                      <Icon className="w-3.5 h-3.5 accent-text" />
                      <span>{s.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. Tema del menú */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2.5 tracking-wide">
                Tema del menú
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'segun_esquema', label: 'Según el esquema' },
                  { id: 'color_tema', label: 'Color del tema' }
                ].map((tm) => {
                  const active = config.menuTheme === tm.id;
                  return (
                    <label
                      key={tm.id}
                      onClick={() => onChangeConfig('menuTheme', tm.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        active
                          ? 'accent-border-active accent-bg-subtle font-bold'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border flex items-center justify-center"
                        style={{ borderColor: active ? 'var(--primary)' : '#475569' }}
                      >
                        {active && (
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: 'var(--primary)' }} 
                          />
                        )}
                      </span>
                      <span>{tm.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 4. Tema (Paleta de colores) */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-slate-300 block tracking-wide">
                  Tema
                </label>
                <span className="text-[11px] accent-text font-mono font-bold">
                  {colorThemes.find(c => c.id === config.themeColor)?.label}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {colorThemes.map((c) => {
                  const isSelected = config.themeColor === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => onChangeConfig('themeColor', c.id)}
                      style={{ backgroundColor: c.bg }}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-md ${
                        isSelected ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-85'
                      }`}
                      title={c.label}
                    >
                      {isSelected && <Check className="w-4 h-4 text-slate-950 font-black stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Escala */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 block tracking-wide">
                  Escala
                </label>
                <span className="text-xs font-mono accent-text font-bold">{config.scale}%</span>
              </div>
              <div className="flex items-center justify-between gap-2 px-2 py-2 rounded-xl bg-slate-900/80 border border-slate-800">
                <button
                  onClick={() => onChangeConfig('scale', Math.max(85, config.scale - 5))}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold cursor-pointer"
                >
                  -
                </button>
                <div className="flex items-center gap-2">
                  {[85, 90, 95, 100, 105, 110].map((step) => {
                    const isStepActive = config.scale === step;
                    return (
                      <button
                        key={step}
                        onClick={() => onChangeConfig('scale', step)}
                        style={{ backgroundColor: isStepActive ? 'var(--primary)' : undefined }}
                        className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                          isStepActive ? 'scale-125 shadow-md' : 'bg-slate-700 hover:bg-slate-500'
                        }`}
                        title={`${step}%`}
                      />
                    );
                  })}
                </div>
                <button
                  onClick={() => onChangeConfig('scale', Math.min(110, config.scale + 5))}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* 6. Estilo de los campos */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2.5 tracking-wide">
                Estilo de los campos
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'con_borde', label: 'Con borde' },
                  { id: 'relleno', label: 'Relleno' }
                ].map((st) => {
                  const active = config.inputStyle === st.id;
                  return (
                    <label
                      key={st.id}
                      onClick={() => onChangeConfig('inputStyle', st.id)}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        active
                          ? 'accent-border-active accent-bg-subtle font-bold'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border flex items-center justify-center"
                        style={{ borderColor: active ? 'var(--primary)' : '#475569' }}
                      >
                        {active && (
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: 'var(--primary)' }} 
                          />
                        )}
                      </span>
                      <span>{st.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cyan-950 flex items-center justify-between">
          <button
            onClick={onResetDefaults}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restaurar por defecto
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-slate-950 font-bold text-xs cursor-pointer shadow-lg active:scale-95"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
}
