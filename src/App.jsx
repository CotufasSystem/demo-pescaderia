import React, { useState, useEffect } from 'react';

const COLOR_MAP = {
  cyan: { hex: '#00f5d4', rgb: '0, 245, 212' },
  blue: { hex: '#38bdf8', rgb: '56, 189, 248' },
  emerald: { hex: '#10b981', rgb: '16, 185, 129' },
  indigo: { hex: '#6366f1', rgb: '99, 102, 241' },
  amber: { hex: '#f59e0b', rgb: '245, 158, 11' },
  teal: { hex: '#06b6d4', rgb: '6, 182, 212' },
  yellow: { hex: '#eab308', rgb: '234, 179, 8' },
  rose: { hex: '#f43f5e', rgb: '244, 63, 94' },
  purple: { hex: '#a855f7', rgb: '168, 85, 247' },
  lime: { hex: '#84cc16', rgb: '132, 204, 22' }
};

import MarineBubbleCanvas from './components/MarineBubbleCanvas';
import MarineSidebar from './components/MarineSidebar';
import HomeDashboard from './components/HomeDashboard';
import ElectronicScale from './components/ElectronicScale';
import ProductCatalog from './components/ProductCatalog';
import CartAndWastePanel from './components/CartAndWastePanel';
import ExpensesManager from './components/ExpensesManager';
import CombosManager from './components/CombosManager';
import FinancialSummary from './components/FinancialSummary';
import MarketingPanel from './components/MarketingPanel';
import StatisticsView from './components/StatisticsView';

import PaymentModal from './components/PaymentModal';
import TraceabilityModal from './components/TraceabilityModal';
import CashRegisterReportModal from './components/CashRegisterReportModal';
import InventoryModal from './components/InventoryModal';
import SettingsDrawer from './components/SettingsDrawer';

import { 
  INITIAL_PRODUCTS, 
  INITIAL_COMBOS, 
  INITIAL_EXPENSES, 
  INITIAL_CLIENTS 
} from './data/mockData';

import { 
  Fish, 
  ShoppingCart, 
  PlusCircle, 
  FileSpreadsheet, 
  Menu, 
  Receipt,
  Settings
} from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [combos, setCombos] = useState(INITIAL_COMBOS);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [clients, setClients] = useState(INITIAL_CLIENTS);

  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCTS[0]);
  const [currentWeight, setCurrentWeight] = useState(1.250);
  const [tareWeight, setTareWeight] = useState(0);
  const [isSerialConnected, setIsSerialConnected] = useState(false);
  
  // Tasa BCV
  const [exchangeRate, setExchangeRate] = useState(48.50);

  // Carrito de mostrador
  const [cart, setCart] = useState([]);
  
  // Vista activa de navegación
  const [currentView, setCurrentView] = useState('home');
  const [inventorySubmenuOpen, setInventorySubmenuOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);


  // Configuración del sistema
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('demo_pescaderia_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading localStorage', e);
    }
    return {
      menuType: 'estatico',
      colorScheme: 'oscuro',
      menuTheme: 'segun_esquema',
      themeColor: 'cyan',
      scale: 100,
      inputStyle: 'con_borde'
    };
  });

  // Efecto que aplica el color del tema a todo el DOM
  useEffect(() => {
    const theme = COLOR_MAP[config.themeColor] || COLOR_MAP.cyan;
    document.documentElement.style.setProperty('--primary', theme.hex);
    document.documentElement.style.setProperty('--primary-rgb', theme.rgb);
    try {
      localStorage.setItem('demo_pescaderia_config', JSON.stringify(config));
    } catch (e) {
      console.warn('Error saving to localStorage', e);
    }
  }, [config]);

  const handleChangeConfig = (key, value) => {
    setConfig(prev => {
      const updated = { ...prev, [key]: value };
      if (key === 'menuType') {
        if (value === 'slim' || value === 'slim_plus') {
          setSidebarCollapsed(true);
        } else {
          setSidebarCollapsed(false);
        }
      }
      return updated;
    });
  };


  const handleResetDefaults = () => {
    setConfig({
      menuType: 'estatico',
      colorScheme: 'oscuro',
      menuTheme: 'segun_esquema',
      themeColor: 'cyan',
      scale: 100,
      inputStyle: 'con_borde'
    });
    setSidebarCollapsed(false);
  };

  // Modales
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isTraceabilityOpen, setIsTraceabilityOpen] = useState(false);

  const [traceabilityProduct, setTraceabilityProduct] = useState(INITIAL_PRODUCTS[0]);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);

  // Registro de transacciones históricas
  const [transactions, setTransactions] = useState([]);
  // Auditoría de mermas
  const [wasteLogs, setWasteLogs] = useState([]);

  // Inventario Handlers
  const handleUpdateProductStock = (productId, newStockKg) => {
    setProducts(products.map(p => p.id === productId ? { ...p, stockKg: newStockKg } : p));
  };

  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const handleRegisterIceMeltWaste = (productId, meltKg, reason, productName, pricePerKg) => {
    setProducts(products.map(p => p.id === productId ? { ...p, stockKg: Math.max(0, p.stockKg - meltKg) } : p));
    setWasteLogs([
      ...wasteLogs,
      {
        productName,
        preparation: reason,
        wastePercent: 100,
        wasteKg: meltKg,
        costLossUSD: meltKg * pricePerKg
      }
    ]);
  };

  // Gastos Handlers
  const handleAddExpense = (newExp) => {
    setExpenses([newExp, ...expenses]);
  };

  const handlePayExpense = (expId) => {
    setExpenses(expenses.map(e => e.id === expId ? { ...e, status: 'Pagado', daysRemaining: 0, lastPaymentDate: new Date().toISOString().split('T')[0] } : e));
  };

  // Carrito y Cobro POS
  const handleAddToCart = () => {
    if (!selectedProduct || currentWeight <= 0) {
      alert('Por favor selecciona un pescado y coloca peso válido en la báscula.');
      return;
    }

    const defaultPrep = selectedProduct.allowedPreparations[0];
    const subtotal = selectedProduct.pricePerKg * currentWeight;

    const newItem = {
      cartId: 'item-' + Date.now(),
      productId: selectedProduct.id,
      name: selectedProduct.name,
      scientificName: selectedProduct.scientificName,
      pricePerKg: selectedProduct.pricePerKg,
      image: selectedProduct.image,
      weightKg: currentWeight,
      preparationId: defaultPrep.id,
      preparation: defaultPrep.label,
      wastePercent: defaultPrep.wastePercent,
      allowedPreparations: selectedProduct.allowedPreparations,
      subtotal
    };

    setCart([...cart, newItem]);
  };

  const handleAddComboToCart = (combo) => {
    const newItem = {
      cartId: 'combo-item-' + Date.now(),
      productId: combo.id,
      name: combo.name,
      scientificName: combo.description,
      pricePerKg: combo.priceUSD,
      image: combo.image,
      weightKg: 1.0,
      preparationId: 'combo',
      preparation: 'Pack Sellado al Vacío',
      wastePercent: 0,
      allowedPreparations: [{ id: 'combo', label: 'Pack Sellado', wastePercent: 0 }],
      subtotal: combo.priceUSD
    };
    setCart([...cart, newItem]);
    setCurrentView('pos');
  };

  const handleUpdateCartItem = (cartId, updates) => {
    setCart(cart.map((item) => (item.cartId === cartId ? { ...item, ...updates } : item)));
  };

  const handleRemoveCartItem = (cartId) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handlePaymentSuccess = (transaction) => {
    const newWaste = [];
    const updatedProducts = products.map((prod) => {
      const itemsInCart = transaction.items.filter((i) => i.productId === prod.id);
      if (itemsInCart.length > 0) {
        const totalUsedWeight = itemsInCart.reduce((sum, i) => sum + i.weightKg, 0);
        
        itemsInCart.forEach((i) => {
          if (i.wastePercent > 0) {
            const lostKg = i.weightKg * (i.wastePercent / 100);
            newWaste.push({
              productName: i.name,
              preparation: i.preparation,
              wastePercent: i.wastePercent,
              wasteKg: lostKg,
              costLossUSD: lostKg * i.pricePerKg
            });
          }
        });

        return {
          ...prod,
          stockKg: Math.max(0, prod.stockKg - totalUsedWeight)
        };
      }
      return prod;
    });

    setProducts(updatedProducts);
    setWasteLogs([...wasteLogs, ...newWaste]);
    setTransactions([transaction, ...transactions]);
    setCart([]);
    setCurrentWeight(0);
  };

  const lowStockCount = products.filter(p => p.stockKg <= 15).length;
  const isSlim = sidebarCollapsed || config.menuType === 'slim' || config.menuType === 'slim_plus';
  const isSuperpuesto = config.menuType === 'superpuesto';
  const sidebarMarginClass = isSuperpuesto ? 'ml-0' : (isSlim ? (config.menuType === 'slim_plus' ? 'md:ml-16' : 'md:ml-20') : 'md:ml-64');

  const bgThemeClass = config.colorScheme === 'claro'
    ? 'bg-gradient-to-b from-sky-50 via-slate-100 to-sky-100 text-slate-800'
    : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0b2447] via-[#05162a] to-[#020b14] text-slate-100';

  return (
    <div 
      className={`min-h-screen relative overflow-x-hidden flex transition-all duration-300 ${bgThemeClass}`}
      style={{ zoom: `${config.scale}%` }}
    >
      {/* Barra Lateral Modular */}
      <MarineSidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenSettings={() => setIsSettingsOpen(true)}
        inventorySubmenuOpen={inventorySubmenuOpen}
        setInventorySubmenuOpen={setInventorySubmenuOpen}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        cartCount={cart.length}
        lowStockCount={lowStockCount}
        config={config}
      />

      {/* Contenedor Principal Adaptativo */}
      <div className={`flex-1 flex flex-col transition-all duration-300 min-h-screen ${sidebarMarginClass}`}>
        
        {/* Barra de Navegación Superior con estilo de referencia */}
        <header className="marine-glass sticky top-0 z-30 border-b border-cyan-500/30 px-4 sm:px-6 py-3.5 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            
            <div className="flex items-center justify-between w-full md:w-auto gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                  className="p-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 cursor-pointer md:hidden flex items-center justify-center shrink-0"
                  title="Abrir menú"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-lg sm:text-xl font-black tracking-wider bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
                    DEMO
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono hidden sm:inline-block">
                      SISTEMA INTEGRAL DE PESCADERÍA
                    </span>
                  </h1>
                  <p className="text-[11px] sm:text-xs text-cyan-300/70 truncate max-w-[200px] sm:max-w-none">
                    Control de lonja, mermas, gastos y venta POS
                  </p>
                </div>
              </div>

              {/* Botón rápido de menú en móvil */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="p-2 rounded-xl bg-slate-900/90 hover:bg-cyan-900 text-cyan-400 border border-cyan-500/40"
                  title="Configuración"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Acciones Rápidas Superiores */}
            <div className="flex items-center gap-1.5 sm:gap-3 font-mono text-xs w-full md:w-auto justify-between md:justify-end overflow-x-auto pb-1 md:pb-0">
              {/* Tasa BCV */}
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 shadow-inner shrink-0">
                <span className="text-cyan-400 font-bold text-[10px] sm:text-xs">BCV:</span>
                <span className="text-slate-300 text-[10px] sm:text-xs">Bs.</span>
                <input
                  type="number"
                  step="0.10"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 1)}
                  className="w-14 sm:w-16 bg-transparent text-emerald-400 font-bold outline-none text-right text-xs"
                />
              </div>

              {/* Botón Principal Vender */}
              <button
                onClick={() => setCurrentView('pos')}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg cursor-pointer active:scale-95 transition-all hover:brightness-110 shrink-0"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>POS</span>
              </button>

              {/* Botón Agregar Gasto */}
              <button
                onClick={() => setCurrentView('expenses')}
                className="p-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 shrink-0"
                title="Agregar Gasto"
              >
                <PlusCircle className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline">Gasto</span>
              </button>

              {/* Botón Corte de Caja */}
              <button
                onClick={() => setIsReportOpen(true)}
                className="p-1.5 sm:px-3 sm:py-2 rounded-xl bg-cyan-900/40 hover:bg-cyan-800 text-cyan-200 border border-cyan-500/40 flex items-center gap-1.5 font-bold cursor-pointer transition-all active:scale-95 shrink-0"
                title="Corte Z / Arqueo de Caja"
              >
                <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Corte Z</span>
              </button>

              {/* Botón Configuración */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-900/90 hover:bg-cyan-900 text-slate-300 hover:text-cyan-300 border border-cyan-500/40 flex items-center justify-center cursor-pointer transition-all active:scale-95 shrink-0"
                title="Configuración de Interfaz"
              >
                <Settings className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Contenido Dinámico según la Sección Seleccionada */}
        <main className="max-w-7xl mx-auto p-4 md:p-6 w-full flex-1">
          {/* VISTA 1: HOME / DASHBOARD */}
          {currentView === 'home' && (
            <HomeDashboard
              transactions={transactions}
              products={products}
              exchangeRate={exchangeRate}
              onNavigateToPOS={() => setCurrentView('pos')}
              onOpenReport={() => setIsReportOpen(true)}
              onOpenAddExpense={() => setCurrentView('expenses')}
            />
          )}

          {/* VISTA 2: PEDIDOS & BALANZA POS */}
          {currentView === 'pos' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <section className="lg:col-span-8 space-y-6">
                <ElectronicScale
                  currentWeight={currentWeight}
                  onWeightChange={setCurrentWeight}
                  tareWeight={tareWeight}
                  onTare={setTareWeight}
                  isSerialConnected={isSerialConnected}
                  setIsSerialConnected={setIsSerialConnected}
                />

                {selectedProduct && (
                  <div className="marine-glass-card rounded-2xl p-3 sm:p-4 border border-cyan-400/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl sm:text-4xl shrink-0">{selectedProduct.image}</span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <h3 className="text-base sm:text-lg font-black text-white truncate">{selectedProduct.name}</h3>
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono shrink-0">
                            ${selectedProduct.pricePerKg.toFixed(2)}/kg
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                          Báscula: <strong className="text-cyan-300 font-mono">{currentWeight.toFixed(3)} kg</strong>
                          {' '}— Total:{' '}
                          <strong className="text-emerald-400 font-mono text-sm">
                            ${(selectedProduct.pricePerKg * currentWeight).toFixed(2)}
                          </strong>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setTraceabilityProduct(selectedProduct);
                          setIsTraceabilityOpen(true);
                        }}
                        className="px-3 py-2 sm:py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-cyan-500/30 cursor-pointer text-center"
                      >
                        Etiqueta
                      </button>
                      <button
                        onClick={handleAddToCart}
                        className="px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/30 cursor-pointer active:scale-95"
                      >
                        <PlusCircle className="w-4 h-4 shrink-0" />
                        <span>Agregar</span>
                      </button>
                    </div>
                  </div>
                )}

                <ProductCatalog
                  products={products}
                  onSelectProduct={setSelectedProduct}
                  selectedProduct={selectedProduct}
                  currentWeight={currentWeight}
                  onOpenTraceability={(prod) => {
                    setTraceabilityProduct(prod);
                    setIsTraceabilityOpen(true);
                  }}
                />
              </section>

              <section className="lg:col-span-4">
                <CartAndWastePanel
                  cart={cart}
                  onUpdateCartItem={handleUpdateCartItem}
                  onRemoveCartItem={handleRemoveCartItem}
                  onClearCart={handleClearCart}
                  onOpenPayment={() => setIsPaymentOpen(true)}
                  exchangeRate={exchangeRate}
                />
              </section>
            </div>
          )}

          {/* VISTA 3.1: INVENTARIO STOCK */}
          {currentView === 'inventory_stock' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-cyan-950">
                <div>
                  <h2 className="text-2xl font-black text-white">Inventario de Cámara de Frío & Mostrador</h2>
                  <p className="text-xs text-slate-400">Control de existencias por especie marina y lotes sanitarios</p>
                </div>
                <button
                  onClick={() => setIsInventoryModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 cursor-pointer"
                >
                  Abrir Gestor Completo & Ajustes
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map(p => (
                  <div key={p.id} className="marine-glass-card rounded-2xl p-4 border border-cyan-500/30">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-3xl">{p.image}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        p.stockKg <= 15 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}>
                        {p.stockKg.toFixed(1)} kg
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm">{p.name}</h4>
                    <p className="text-[10px] text-cyan-400/80 italic mb-2">{p.scientificName}</p>
                    <div className="text-xs font-mono text-emerald-400 font-bold">${p.pricePerKg.toFixed(2)}/kg</div>
                    <div className="text-[10px] text-slate-400 mt-2 border-t border-cyan-950/60 pt-1">
                      Lote: {p.lotNumber}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VISTA 3.2: INVENTARIO RECETAS / COMBOS */}
          {currentView === 'inventory_combos' && (
            <CombosManager
              combos={combos}
              onAddComboToCart={handleAddComboToCart}
              onAddNewCombo={(c) => setCombos([...combos, c])}
            />
          )}

          {/* VISTA 3.3: INVENTARIO MERMA */}
          {currentView === 'inventory_waste' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-cyan-950">
                <div>
                  <h2 className="text-2xl font-black text-white">Auditoría de Merma por Limpieza & Deshielo</h2>
                  <p className="text-xs text-slate-400">Control de pérdidas por deshidratación, escamas y vísceras</p>
                </div>
                <button
                  onClick={() => setIsInventoryModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Ajustar Deshielo en Cama de Hielo
                </button>
              </div>

              <div className="marine-glass-card rounded-2xl p-5 border border-cyan-500/30">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#030d1a] text-slate-400 border-b border-cyan-950">
                    <tr>
                      <th className="p-3">PRODUCTO</th>
                      <th className="p-3">CONCEPTO / PREPARACIÓN</th>
                      <th className="p-3 text-right">% MERMA</th>
                      <th className="p-3 text-right">PESO PERDIDO</th>
                      <th className="p-3 text-right">COSTO TOTAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {wasteLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500 font-sans">
                          No se han registrado mermas en este turno.
                        </td>
                      </tr>
                    ) : (
                      wasteLogs.map((w, idx) => (
                        <tr key={idx} className="hover:bg-cyan-950/20">
                          <td className="p-3 font-bold text-white">{w.productName}</td>
                          <td className="p-3 text-cyan-300">{w.preparation}</td>
                          <td className="p-3 text-right text-amber-400 font-bold">{w.wastePercent}%</td>
                          <td className="p-3 text-right text-rose-400 font-bold">{w.wasteKg.toFixed(3)} kg</td>
                          <td className="p-3 text-right font-bold text-slate-200">${w.costLossUSD.toFixed(2)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VISTA 4: GASTOS FIJOS Y VARIABLES */}
          {currentView === 'expenses' && (
            <ExpensesManager
              expenses={expenses}
              onAddExpense={handleAddExpense}
              onPayExpense={handlePayExpense}
            />
          )}

          {/* VISTA 5: RESUMEN FINANCIERO */}
          {currentView === 'financial' && (
            <FinancialSummary
              transactions={transactions}
              expenses={expenses}
              wasteLogs={wasteLogs}
              exchangeRate={exchangeRate}
            />
          )}

          {/* VISTA 6: MARKETING */}
          {currentView === 'marketing' && (
            <MarketingPanel
              products={products}
              clients={clients}
              exchangeRate={exchangeRate}
            />
          )}

          {/* VISTA 7: ESTADÍSTICAS */}
          {currentView === 'stats' && (
            <StatisticsView
              transactions={transactions}
              products={products}
            />
          )}
        </main>
      </div>

      {/* Modales Globales */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        totalUSD={cart.reduce((sum, item) => sum + item.subtotal, 0)}
        exchangeRate={exchangeRate}
        cartItems={cart}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <TraceabilityModal
        isOpen={isTraceabilityOpen}
        onClose={() => setIsTraceabilityOpen(false)}
        product={traceabilityProduct}
        currentWeight={currentWeight}
      />

      <CashRegisterReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        transactions={transactions}
        wasteLogs={wasteLogs}
        exchangeRate={exchangeRate}
      />

      <InventoryModal
        isOpen={isInventoryModalOpen}
        onClose={() => setIsInventoryModalOpen(false)}
        products={products}
        onUpdateProductStock={handleUpdateProductStock}
        onAddProduct={handleAddProduct}
        onRegisterIceMeltWaste={handleRegisterIceMeltWaste}
      />

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onChangeConfig={handleChangeConfig}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
