export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Salmón del Atlántico',
    scientificName: 'Salmo salar',
    category: 'pescados',
    pricePerKg: 18.50,
    stockKg: 45.0,
    image: '🐟',
    origin: 'Lonja Puerto La Cruz, Sucre',
    captureMethod: 'Línea de fondo / Pesca artesanal',
    catchDate: '2026-11-13',
    freshnessTier: 'Extra Fresco (Clase A)',
    lotNumber: 'LOT-SAL-2026-1104',
    allowedPreparations: [
      { id: 'entero', label: 'Entero eviscerado', wastePercent: 12 },
      { id: 'filete', label: 'Fileteado con piel', wastePercent: 35 },
      { id: 'sin_piel', label: 'Lomo limpio sin piel', wastePercent: 42 },
      { id: 'ruedas', label: 'Cortado en ruedas', wastePercent: 18 }
    ]
  },
  {
    id: 'prod-2',
    name: 'Pargo Rojo de Piedra',
    scientificName: 'Lutjanus campechanus',
    category: 'pescados',
    pricePerKg: 14.00,
    stockKg: 32.5,
    image: '🐠',
    origin: 'Archipiélago Los Roques',
    captureMethod: 'Nasa marina sustentable',
    catchDate: '2026-11-14',
    freshnessTier: 'Recién Desembarcado',
    lotNumber: 'LOT-PAR-2026-1108',
    allowedPreparations: [
      { id: 'entero', label: 'Entero con escamas', wastePercent: 0 },
      { id: 'limpio', label: 'Eviscerado y descamado', wastePercent: 20 },
      { id: 'filete', label: 'Filetes limpios', wastePercent: 40 },
      { id: 'abierto', label: 'Abierto para parrillada', wastePercent: 15 }
    ]
  },
  {
    id: 'prod-3',
    name: 'Camarón Jumbo Rosado',
    scientificName: 'Farfantepenaeus duorarum',
    category: 'mariscos',
    pricePerKg: 16.80,
    stockKg: 28.0,
    image: '🦐',
    origin: 'Golfo de Venezuela',
    captureMethod: 'Pesca costera selectiva',
    catchDate: '2026-11-13',
    freshnessTier: 'Congelado a bordo IQF',
    lotNumber: 'LOT-CAM-2026-1101',
    allowedPreparations: [
      { id: 'entero', label: 'Entero con cabeza', wastePercent: 0 },
      { id: 'sin_cabeza', label: 'Cola sin cabeza', wastePercent: 32 },
      { id: 'limpio_mariposa', label: 'Desvenado corte mariposa', wastePercent: 45 }
    ]
  },
  {
    id: 'prod-4',
    name: 'Pulpo de Roca',
    scientificName: 'Octopus vulgaris',
    category: 'cefalopodos',
    pricePerKg: 21.00,
    stockKg: 19.5,
    image: '🐙',
    origin: 'Península de Araya',
    captureMethod: 'Buceo libre tradicional',
    catchDate: '2026-11-14',
    freshnessTier: 'Fresco del Día',
    lotNumber: 'LOT-PUL-2026-1099',
    allowedPreparations: [
      { id: 'entero', label: 'Entero fresco', wastePercent: 0 },
      { id: 'limpio', label: 'Eviscerado sin boca/ojos', wastePercent: 15 },
      { id: 'asustado', label: 'Golpeado y precocido', wastePercent: 25 }
    ]
  },
  {
    id: 'prod-5',
    name: 'Mero Criollo Guasa',
    scientificName: 'Epinephelus marginatus',
    category: 'pescados',
    pricePerKg: 22.50,
    stockKg: 15.0,
    image: '🐟',
    origin: 'Isla La Tortuga',
    captureMethod: 'Línea de anzuelo profundo',
    catchDate: '2026-11-12',
    freshnessTier: 'Clase A Selección',
    lotNumber: 'LOT-MER-2026-1102',
    allowedPreparations: [
      { id: 'entero', label: 'Entero eviscerado', wastePercent: 15 },
      { id: 'ruedas', label: 'Ruedas gruesas', wastePercent: 18 },
      { id: 'filete', label: 'Suprema de mero', wastePercent: 38 }
    ]
  },
  {
    id: 'prod-6',
    name: 'Calamar Blanco Nacional',
    scientificName: 'Loligo vulgaris',
    category: 'cefalopodos',
    pricePerKg: 11.50,
    stockKg: 24.0,
    image: '🦑',
    origin: 'Isla de Margarita (Pampatar)',
    captureMethod: 'Potera artesanal nocturna',
    catchDate: '2026-11-13',
    freshnessTier: 'Extra Fresco',
    lotNumber: 'LOT-CAL-2026-1105',
    allowedPreparations: [
      { id: 'entero', label: 'Entero con tinta', wastePercent: 0 },
      { id: 'tubos_anillos', label: 'Tubo limpio para aros', wastePercent: 30 }
    ]
  },
  {
    id: 'prod-7',
    name: 'Mejillones de Roca Frescos',
    scientificName: 'Mytilus edulis',
    category: 'moluscos',
    pricePerKg: 6.50,
    stockKg: 50.0,
    image: '🦪',
    origin: 'Ensenada de Yaguaraparo',
    captureMethod: 'Cultivo en batea certificada',
    catchDate: '2026-11-14',
    freshnessTier: 'Vivo en Concha',
    lotNumber: 'LOT-MEJ-2026-1110',
    allowedPreparations: [
      { id: 'entero', label: 'En concha con barbas limpias', wastePercent: 5 },
      { id: 'pulpa', label: 'Pulpa desconchada fresca', wastePercent: 65 }
    ]
  },
  {
    id: 'prod-8',
    name: 'Atún Aleta Amarilla',
    scientificName: 'Thunnus albacares',
    category: 'pescados',
    pricePerKg: 19.80,
    stockKg: 60.0,
    image: '🐟',
    origin: 'Alta mar Caribe Oriental',
    captureMethod: 'Pesca con caña (Dolphin Safe)',
    catchDate: '2026-11-13',
    freshnessTier: 'Grado Sashimi',
    lotNumber: 'LOT-ATU-2026-1109',
    allowedPreparations: [
      { id: 'lomo', label: 'Lomo limpio para tataki/sashimi', wastePercent: 20 },
      { id: 'medallones', label: 'Medallones gruesos', wastePercent: 12 },
      { id: 'tartar', label: 'Picado para tartar', wastePercent: 15 }
    ]
  }
];

export const INITIAL_COMBOS = [
  {
    id: 'combo-1',
    name: 'Combo Sopa Marinera Familiar',
    description: '1.2 kg Surtido de cabezas de mero, pargo, almejas y calamar fresco para hervido',
    priceUSD: 14.50,
    category: 'sopa',
    stockAvailable: 15,
    image: '🍲',
    yieldServings: '4 a 6 personas'
  },
  {
    id: 'combo-2',
    name: 'Bandeja Ceviche Costero',
    description: '800g de cubos de mero y atún fresco, cebolla morada, limón criollo y cilantro',
    priceUSD: 18.00,
    category: 'ceviche',
    stockAvailable: 10,
    image: '🥗',
    yieldServings: '3 a 4 personas'
  },
  {
    id: 'combo-3',
    name: 'Kit Parrilla del Pescador',
    description: '1 Pargo rojo abierto (1.5 kg) + 400g camarones jumbo + salmuera de ajo y orégano',
    priceUSD: 27.50,
    category: 'parrilla',
    stockAvailable: 8,
    image: '🔥',
    yieldServings: '4 personas'
  }
];

export const INITIAL_EXPENSES = [
  {
    id: 'exp-1',
    name: 'Alquiler Local Mostrador Lonja',
    category: 'Alquiler',
    type: 'fijo',
    amountUSD: 300.00,
    dueDate: '2026-11-30',
    lastPaymentDate: '2026-10-30',
    daysRemaining: 15,
    status: 'Pendiente'
  },
  {
    id: 'exp-2',
    name: 'Electricidad Cámara Frigorífica',
    category: 'Servicios Básicos',
    type: 'fijo',
    amountUSD: 120.00,
    dueDate: '2026-11-25',
    lastPaymentDate: '2026-10-25',
    daysRemaining: 10,
    status: 'Pendiente'
  },
  {
    id: 'exp-3',
    name: 'Nómina Maestro Fileteador & Descamador',
    category: 'Nómina',
    type: 'fijo',
    amountUSD: 150.00,
    dueDate: '2026-11-15',
    lastPaymentDate: '2026-11-01',
    daysRemaining: 0,
    status: 'Pagado'
  },
  {
    id: 'exp-4',
    name: 'Carga de Hielo en Escamas (15 Barras)',
    category: 'Insumos Marinos',
    type: 'variable',
    amountUSD: 45.00,
    dueDate: '2026-11-14',
    lastPaymentDate: '2026-11-14',
    daysRemaining: 0,
    status: 'Pagado'
  },
  {
    id: 'exp-5',
    name: 'Bolsas al Vacío y Empaques Térmicos',
    category: 'Empaque',
    type: 'variable',
    amountUSD: 35.00,
    dueDate: '2026-11-18',
    lastPaymentDate: '2026-11-02',
    daysRemaining: 3,
    status: 'Pendiente'
  },
  {
    id: 'exp-6',
    name: 'Flete de Muelle a Pescadería',
    category: 'Transporte',
    type: 'variable',
    amountUSD: 40.00,
    dueDate: '2026-11-16',
    lastPaymentDate: '2026-11-09',
    daysRemaining: 1,
    status: 'Pendiente'
  }
];

export const INITIAL_CLIENTS = [
  {
    id: 'cli-1',
    name: 'Restaurante El Muelle Azul',
    phone: '+58 412 8899112',
    category: 'Restaurante / Mayorista',
    lastOrder: '12 kg Pargo + 5 kg Camarón',
    totalSpentUSD: 1240.00
  },
  {
    id: 'cli-2',
    name: 'Chef Carlos Montilla',
    phone: '+58 414 7722331',
    category: 'Chef Particular',
    lastOrder: '3 kg Atún Sashimi',
    totalSpentUSD: 580.00
  },
  {
    id: 'cli-3',
    name: 'Familia Mendoza',
    phone: '+58 424 9911223',
    category: 'Cliente Frecuente',
    lastOrder: 'Combo Sopa Marinera',
    totalSpentUSD: 310.00
  }
];

export const VENEZUELA_BANKS = [
  { code: '0102', name: 'Banco de Venezuela' },
  { code: '0105', name: 'Banco Mercantil' },
  { code: '0108', name: 'Banco Provincial' },
  { code: '0134', name: 'Banesco' },
  { code: '0114', name: 'Bancaribe' },
  { code: '0172', name: 'Bancamiga' },
  { code: '0169', name: 'Mi Banco' },
  { code: '0191', name: 'Banco Nacional de Crédito (BNC)' }
];
