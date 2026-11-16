import React from 'react';
import { 
  Fish, 
  Home, 
  ShoppingCart, 
  Package, 
  ChevronDown, 
  ChevronRight, 
  Receipt, 
  TrendingUp, 
  Megaphone, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  Boxes,
  Soup,
  ThermometerSnowflake,
  ShieldCheck,
  UserCheck,
  X
} from 'lucide-react';

export default function MarineSidebar({
  currentView,
  onSelectView,
  onOpenSettings,
  inventorySubmenuOpen,
  setInventorySubmenuOpen,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  cartCount,
  lowStockCount,
  config
}) {
  const isSlim = collapsed || config?.menuType === 'slim' || config?.menuType === 'slim_plus';
  const isSuperpuesto = config?.menuType === 'superpuesto';

  const menuBg = config?.menuTheme === 'color_tema' 
    ? 'bg-gradient-to-b from-[#0a2540] via-[#06335a] to-[#041c33] border-cyan-400/50'
    : (config?.colorScheme === 'claro' ? 'bg-slate-100/95 text-slate-800 border-slate-300' : 'marine-glass border-cyan-500/30 text-slate-100');

  const navItemClass = (isActive) => `
    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all cursor-pointer
    ${isActive ? 'accent-bg-subtle accent-border-active' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 border border-transparent'}
  `;

  const handleItemClick = (viewId) => {
    onSelectView(viewId);
    if (window.innerWidth < 768 && setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Overlay oscuro para móviles */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen z-50 transition-all duration-300 flex flex-col justify-between border-r shadow-2xl backdrop-blur-xl ${menuBg}
          ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
          ${isSlim ? (config?.menuType === 'slim_plus' ? 'md:w-16' : 'md:w-20') : 'md:w-64'}
          ${isSuperpuesto ? 'shadow-[0_0_50px_rgba(0,0,0,0.85)]' : ''}
        `}
      >
        <div className="flex-1 overflow-y-auto pr-0.5">
          
          {/* Brand Header */}
          <div className="p-4 border-b border-cyan-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => handleItemClick('home')}>
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-slate-950"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <Fish className="w-5 h-5 animate-float" />
              </div>
              {(!isSlim || mobileOpen) && (
                <div className="truncate">
                  <h2 className="font-black text-sm tracking-wider text-white">DEMO</h2>
                  <span className="text-[10px] accent-text font-mono block">GESTIÓN PESQUERA</span>
                </div>
              )}
            </div>

            {/* Botón cerrar para móvil */}
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-xl bg-slate-900/80 text-slate-400 hover:text-rose-300 md:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Botón contraer para desktop */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 accent-text border border-cyan-500/30 cursor-pointer hidden md:flex items-center justify-center transition-transform"
              title={isSlim ? 'Expandir' : 'Contraer'}
            >
              {isSlim ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Sección: MÓDULOS */}
          <div className="p-3">
            {(!isSlim || mobileOpen) && (
              <span className="text-[10px] font-mono font-bold tracking-widest accent-text uppercase px-3 block mb-2 opacity-80">
                MÓDULOS
              </span>
            )}

            <nav className="space-y-1 text-xs">
              {/* 1. Panel Principal */}
              <button
                onClick={() => handleItemClick('home')}
                className={navItemClass(currentView === 'home')}
                title="Panel Principal"
              >
                <Home className="w-4 h-4 shrink-0 accent-text" />
                {(!isSlim || mobileOpen) && <span className="flex-1 text-left">Panel Principal</span>}
              </button>

              {/* 2. Pedidos / Vender POS */}
              <button
                onClick={() => handleItemClick('pos')}
                className={navItemClass(currentView === 'pos')}
                title="Pedidos & Balanza POS"
              >
                <ShoppingCart className="w-4 h-4 shrink-0 accent-text" />
                {(!isSlim || mobileOpen) && (
                  <>
                    <span className="flex-1 text-left">Pedidos (POS)</span>
                    {cartCount > 0 && (
                      <span 
                        className="px-2 py-0.5 rounded-full text-slate-950 font-mono text-[10px] font-bold"
                        style={{ backgroundColor: 'var(--primary)' }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </>
                )}
              </button>

              {/* 3. Inventario (Desplegable) */}
              <div>
                <button
                  onClick={() => {
                    if (isSlim && !mobileOpen) {
                      handleItemClick('inventory_stock');
                    } else {
                      setInventorySubmenuOpen(!inventorySubmenuOpen);
                    }
                  }}
                  className={navItemClass(currentView.startsWith('inventory'))}
                  title="Inventario"
                >
                  <Package className="w-4 h-4 shrink-0 accent-text" />
                  {(!isSlim || mobileOpen) && (
                    <>
                      <span className="flex-1 text-left">Inventario</span>
                      {inventorySubmenuOpen ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </>
                  )}
                </button>

                {/* Submenú de Inventario */}
                {(!isSlim || mobileOpen) && inventorySubmenuOpen && (
                  <div className="pl-6 pr-1 py-1.5 space-y-1 border-l-2 ml-4 mt-1 accent-border">
                    <button
                      onClick={() => handleItemClick('inventory_stock')}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors text-left cursor-pointer ${
                        currentView === 'inventory_stock'
                          ? 'accent-text accent-bg-subtle font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Boxes className="w-3.5 h-3.5" />
                      <span>Stock & Existencias</span>
                    </button>

                    <button
                      onClick={() => handleItemClick('inventory_combos')}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors text-left cursor-pointer ${
                        currentView === 'inventory_combos'
                          ? 'accent-text accent-bg-subtle font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Soup className="w-3.5 h-3.5" />
                      <span>Recetas / Combos</span>
                    </button>

                    <button
                      onClick={() => handleItemClick('inventory_waste')}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors text-left cursor-pointer ${
                        currentView === 'inventory_waste'
                          ? 'accent-text accent-bg-subtle font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <ThermometerSnowflake className="w-3.5 h-3.5" />
                      <span>Merma & Hielo</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Gastos */}
              <button
                onClick={() => handleItemClick('expenses')}
                className={navItemClass(currentView === 'expenses')}
                title="Gastos Fijos y Variables"
              >
                <Receipt className="w-4 h-4 shrink-0 accent-text" />
                {(!isSlim || mobileOpen) && <span className="flex-1 text-left">Gastos</span>}
              </button>

              {/* 5. Resumen Financiero */}
              <button
                onClick={() => handleItemClick('financial')}
                className={navItemClass(currentView === 'financial')}
                title="Resumen Financiero"
              >
                <TrendingUp className="w-4 h-4 shrink-0 accent-text" />
                {(!isSlim || mobileOpen) && <span className="flex-1 text-left">Resumen Financiero</span>}
              </button>

              {/* 6. Marketing */}
              <button
                onClick={() => handleItemClick('marketing')}
                className={navItemClass(currentView === 'marketing')}
                title="Marketing & Difusión"
              >
                <Megaphone className="w-4 h-4 shrink-0 accent-text" />
                {(!isSlim || mobileOpen) && <span className="flex-1 text-left">Marketing</span>}
              </button>

              {/* 7. Estadísticas */}
              <button
                onClick={() => handleItemClick('stats')}
                className={navItemClass(currentView === 'stats')}
                title="Estadísticas de Pesca"
              >
                <BarChart3 className="w-4 h-4 shrink-0 accent-text" />
                {(!isSlim || mobileOpen) && <span className="flex-1 text-left">Estadísticas</span>}
              </button>
            </nav>
          </div>

          {/* Sección: CONFIGURACIÓN */}
          <div className="p-3 border-t border-cyan-950/60">
            {(!isSlim || mobileOpen) && (
              <span className="text-[10px] font-mono font-bold tracking-widest accent-text uppercase px-3 block mb-2 opacity-80">
                CONFIGURACIÓN
              </span>
            )}

            <nav className="space-y-1 text-xs">
              <button
                onClick={() => {
                  onOpenSettings();
                  if (window.innerWidth < 768 && setMobileOpen) setMobileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 transition-colors font-medium cursor-pointer"
                title="Configuración de Interfaz"
              >
                <Settings className="w-4 h-4 shrink-0 accent-text" />
                {(!isSlim || mobileOpen) && <span className="flex-1 text-left">Configuración</span>}
              </button>
            </nav>
          </div>
        </div>

        {/* Footer Info / Usuario Activo */}
        <div className="p-3 border-t border-cyan-950/80 bg-[#030d1a]/50">
          {(!isSlim || mobileOpen) ? (
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-slate-950"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="truncate text-left">
                <span className="text-[10px] text-slate-400 block leading-tight">Cajero en Turno:</span>
                <strong className="text-xs text-slate-200 truncate block">Mostrador Principal</strong>
              </div>
            </div>
          ) : (
            <div 
              className="w-8 h-8 mx-auto rounded-full flex items-center justify-center text-slate-950 text-xs font-bold"
              style={{ backgroundColor: 'var(--primary)' }}
              title="Cajero en Turno"
            >
              MP
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
