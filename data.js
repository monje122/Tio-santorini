// Catálogo completo de Tío Santorini basado fielmente en el Menú Oficial
// San Diego, Carabobo - WhatsApp: +584123714136

const INITIAL_CATEGORIES = [
  { id: 'todos', name: 'Todo el Menú', icon: 'fa-utensils' },
  { id: 'promos', name: 'Promociones', icon: 'fa-fire' },
  { id: 'sopas', name: 'Sopas y Cremas', icon: 'fa-bowl-rice' },
  { id: 'entradas', name: 'Entradas', icon: 'fa-cheese' },
  { id: 'ensaladas', name: 'Ensaladas', icon: 'fa-leaf' },
  { id: 'pastas', name: 'Pastas', icon: 'fa-wheat-awn' },
  { id: 'paellas', name: 'Paellas', icon: 'fa-drumstick-bite' },
  { id: 'mariscos', name: 'Pescados y Mariscos', icon: 'fa-fish' },
  { id: 'carnes', name: 'Especialidades / Carnes', icon: 'fa-bacon' },
  { id: 'parrillas', name: 'Parrillas', icon: 'fa-stroopwafel' },
  { id: 'pizzas', name: 'Pizzas', icon: 'fa-pizza-slice' },
  { id: 'shawarmas', name: 'Shawarmas', icon: 'fa-bread-slice' },
  { id: 'raciones', name: 'Raciones Árabes', icon: 'fa-cubes-stacked' },
  { id: 'hamburguesas', name: 'Hamburguesas y Pepitos', icon: 'fa-burger' },
  { id: 'kids', name: 'Menú Kids', icon: 'fa-child' },
  { id: 'cocteles', name: 'Cócteles', icon: 'fa-martini-glass-citrus' },
  { id: 'bebidas', name: 'Bebidas y Jugos', icon: 'fa-glass-water' }
];

const CONTORNOS_OPTIONS = [
  "Papas Fritas",
  "Papas al Vapor",
  "Puré de Papas",
  "Vegetales Salteados",
  "Ensalada Mixta",
  "Ensalada César"
];

const PROTEINAS_SHAWARMA = ["Pollo", "Pernil", "Carne", "Falafel"];
const PROTEINAS_BURGER = ["Carne de Res", "Pollo Crispy", "Pollo a la Plancha"];

const INITIAL_PRODUCTS = [
  // --- SOPAS Y CREMAS (1-4) ---
  {
    id: 'sopa-1',
    num: 1,
    name: 'Viejo Pescador',
    category: 'sopas',
    price: 20.00,
    description: 'Calamares, pulpo y camarones en crema de leche tradicional con toque de hierbas frescas.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Especialidad'
  },
  {
    id: 'sopa-2',
    num: 2,
    name: 'Sopa de Marisco',
    category: 'sopas',
    price: 21.00,
    description: 'Consomé concentrado de pescado fresco, calamares, pulpo, jaibas, mejillones y camarones seleccionados.',
    image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'sopa-3',
    num: 3,
    name: 'Asopado de Marisco',
    category: 'sopas',
    price: 21.00,
    description: 'Arroz caldoso en consomé criollo de pescado con calamares, pulpo tierno y camarones.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'sopa-4',
    num: 4,
    name: 'Chupe de Camarones',
    category: 'sopas',
    price: 21.00,
    description: 'Crema untuosa de guacuco, camarones frescos, papas suaves, maíz tierno en grano y queso blanco llanero.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // --- ENTRADAS (5-15) ---
  {
    id: 'ent-5',
    num: 5,
    name: 'Ración de Tequeños',
    category: 'entradas',
    price: 6.00,
    description: 'Crujientes deditos de masa hojaldrada rellenos de abundante queso blanco derretido (con salsa tártara de la casa).',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Favorito'
  },
  {
    id: 'ent-6',
    num: 6,
    name: 'Ración de Empanaditas',
    category: 'entradas',
    price: 6.00,
    description: 'Mini empanadas crocantes doraditas con variedad de rellenos tradicionales y salsita especial.',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ent-7',
    num: 7,
    name: 'Queso a la Plancha',
    category: 'entradas',
    price: 5.00,
    description: 'Generosa porción de queso blanco sellado a la plancha con corteza dorada y centro elástico.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ent-8',
    num: 8,
    name: 'Arepitas Rellenas',
    category: 'entradas',
    price: 6.00,
    description: 'Canasta de arepitas fritas doraditas rellenas de queso y nata.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ent-9',
    num: 9,
    name: 'Arepitas con Natilla',
    category: 'entradas',
    price: 6.00,
    description: 'Mini arepitas fritas calientes acompañadas de natilla criolla suave y cremosa.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ent-10',
    num: 10,
    name: 'Dedos de Mozzarella',
    category: 'entradas',
    price: 9.50,
    description: 'Bastones de auténtico queso mozzarella empanizados al panko crocante servidos con salsa de la casa.',
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ent-11',
    num: 11,
    name: 'Bruschettas Mixtas',
    category: 'entradas',
    price: 14.00,
    description: 'Pan artesanal tostado con toque de ajo, aceite de oliva virgen, tomate confitado, albahaca fresca y queso.',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ent-12',
    num: 12,
    name: 'Carpaccio de Salmón',
    category: 'entradas',
    price: 30.00,
    description: 'Finas láminas de salmón fresco con alcaparras finas, reducción balsámica, parmesano reggiano y tostadas.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Premium'
  },
  {
    id: 'ent-13',
    num: 13,
    name: 'Carpaccio de Lomito',
    category: 'entradas',
    price: 21.00,
    description: 'Cortes milimétricos de lomito de res selecto marinado al limón, con alcaparras baby, aceite de oliva y queso parmesano.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ent-14',
    num: 14,
    name: 'Cóctel de Camarones',
    category: 'entradas',
    price: 21.00,
    description: 'Camarones jumbo pochados en copa con clásica salsa rosa golf, limón fresco y toque de especias del chef.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ent-15',
    num: 15,
    name: 'Salpicón de Mariscos',
    category: 'entradas',
    price: 20.00,
    description: 'Exquisito mix frío de frutos del mar aderezado con vinagreta cítrica, pimentón dulce, cebolla morada y cilantro.',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // --- ENSALADAS (16-20) ---
  {
    id: 'ens-16',
    num: 16,
    name: 'César Tradicional',
    category: 'ensaladas',
    price: 9.50,
    description: 'Hojas frescas de lechuga romana, tocineta crocante, crotones dorados aromatizados, queso parmesano y dressing césar.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ens-17',
    num: 17,
    name: 'César con Pollo',
    category: 'ensaladas',
    price: 12.00,
    description: 'Lechuga romana, tocineta crocante, crotones crujientes, lluvia de queso parmesano, pechuga de pollo a la plancha y aderezo césar.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ens-18',
    num: 18,
    name: 'César con Camarones',
    category: 'ensaladas',
    price: 15.50,
    description: 'Fresca lechuga romana con camarones salteados al punto, tocineta crocante, crotones, parmesano y aderezo césar.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ens-19',
    num: 19,
    name: 'Ensalada Española',
    category: 'ensaladas',
    price: 18.50,
    description: 'Lechuga seleccionada, tomates jugosos, jamón curado, queso blanco, aceitunas negras y camarones salteados.',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ens-20',
    num: 20,
    name: 'Mixta Tradicional',
    category: 'ensaladas',
    price: 12.00,
    description: 'Tomate fresco de huerto, pepino crujiente, cebolla en julianas, lechuga tierna y aguacate cremoso.',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // --- PASTAS (21-28) ---
  {
    id: 'pas-21',
    num: 21,
    name: '4 Quesos con Camarones',
    category: 'pastas',
    price: 21.00,
    description: 'Linguinis al dente en cremosa salsa blanca de cuatro quesos seleccionados (pecorino, mozzarella, parmesano y fontina) con camarones salteados.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Recomendado'
  },
  {
    id: 'pas-22',
    num: 22,
    name: 'Frutos del Mar',
    category: 'pastas',
    price: 25.00,
    description: 'Linguinis en salsa blanca aterciopelada, camarones, calamares tiernos, pulpo y un toque exótico de piña caramelizada.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'pas-23',
    num: 23,
    name: 'Frank Sinatra',
    category: 'pastas',
    price: 25.00,
    description: 'Linguinis en suave salsa blanca de la casa, tiras de lomito jugoso a la plancha y camarones dorados al ajo.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'pas-24',
    num: 24,
    name: 'Pasta Marinera',
    category: 'pastas',
    price: 25.00,
    description: 'Linguinis bañados en salsa roja artesanal de tomates maduros con mejillones, cangrejo, camarones, pulpo y calamares.',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'pas-25',
    num: 25,
    name: 'Pasta Bolognesa',
    category: 'pastas',
    price: 12.00,
    description: 'Linguini con salsa bolognesa de cocción lenta con carne seleccionada, finas hierbas y queso parmesano.',
    image: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'pas-26',
    num: 26,
    name: 'Pasta Carbonara',
    category: 'pastas',
    price: 14.00,
    description: 'Linguini en salsa blanca cremosa tradicional con tocineta crocante ahumada y queso parmesano.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'pas-27',
    num: 27,
    name: 'Fideuá de Mariscos (Para 2)',
    category: 'pastas',
    price: 43.00,
    description: 'Linguini corto en suculenta salsa de mariscos, calamares, camarones, pulpo, jaibas, mejillones y conchas españolas.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Para 2 Personas'
  },
  {
    id: 'pas-28',
    num: 28,
    name: 'Pasticho Tradicional',
    category: 'pastas',
    price: 13.00,
    description: 'Capas de pasta fresca, salsa bolognesa tradicional de la nonna, queso mozzarella derretido, salsa bechamel, jamón y parmesano gratinado.',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Popular'
  },

  // --- PAELLAS (29-30) ---
  {
    id: 'pae-29',
    num: 29,
    name: 'Paella de Mariscos (Para 2)',
    category: 'paellas',
    price: 50.00,
    description: 'Arroz sazonado con azafrán español, pulpo, calamares, camarones, jaibas, mejillones enteros y conchas españolas en paellera.',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Para 2 Personas'
  },
  {
    id: 'pae-30',
    num: 30,
    name: 'Paella Valenciana (Para 2)',
    category: 'paellas',
    price: 43.00,
    description: 'Arroz al azafrán con trozos tiernos de pollo campesino, pulpa de cerdo, calamares, camarones, pulpo, jaibas y mejillones.',
    image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Para 2 Personas'
  },

  // --- PESCADOS Y MARISCOS (31-35) ---
  {
    id: 'mar-31',
    num: 31,
    name: 'Churrasco de Robalo al Gusto',
    category: 'mariscos',
    price: 35.00,
    description: '280gr de pesca blanca de robalo fresco, con salsa de su elección y 2 contornos a elegir.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasContornos: true
  },
  {
    id: 'mar-32',
    num: 32,
    name: 'Caldereta de Pescados y Mariscos (Para 2)',
    category: 'mariscos',
    price: 40.00,
    description: 'Calamares, camarones, mejillones, pulpo en salsa napolitana con pasta de tomate y consomé de pescado, servido con papas al vapor.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Para 2 Personas'
  },
  {
    id: 'mar-33',
    num: 33,
    name: 'Trío Marino',
    category: 'mariscos',
    price: 37.00,
    description: '1 Cazuela de pulpo, 1 cazuela de calamares al ajillo y 1 cazuela de camarones a la vinagreta. Acompañado con papas chips, casabito, tostones y aros de cebolla.',
    image: 'https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Especial'
  },
  {
    id: 'mar-34',
    num: 34,
    name: 'Pulpo a la Gallega',
    category: 'mariscos',
    price: 40.00,
    description: 'Pulpo fileteado en rodajas tiernas sobre cama de papas al vapor, rociado con pimentón español de la Vera, sal marina gruesa y aceite de oliva.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'mar-35',
    num: 35,
    name: 'Pulpo Grillado',
    category: 'mariscos',
    price: 40.00,
    description: 'Tentáculos de pulpo entero grillados a la plancha con costra dorada, papas al vapor al romero, pimentón español y aceite de oliva virgen extra.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Chef Choice'
  },

  // --- ESPECIALIDAD DE LA CASA / PLATOS FUERTES (36-46) ---
  {
    id: 'car-36',
    num: 36,
    name: 'Trío de Carnes Santorini',
    category: 'carnes',
    price: 55.00,
    description: '1 chorizo, 2 medallones de lomito, 2 medallones de pollo, 2 bistec de solomo, yuca frita, queso a la plancha, salsa 4 quesos, salsa de champiñones y pico de gallo.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Plato Insignia'
  },
  {
    id: 'car-37',
    num: 37,
    name: 'Lomito a la Llanera',
    category: 'carnes',
    price: 31.00,
    description: 'Lomito suave en corte mariposa a la parrilla, queso llanero a la plancha, chorizo parrillero y 2 contornos de su elección.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasContornos: true
  },
  {
    id: 'car-38',
    num: 38,
    name: 'Punta Trasera (350gr)',
    category: 'carnes',
    price: 21.00,
    description: '350gr de corte de punta trasera premium jugosa al término de su preferencia, acompañada de 2 contornos de su elección.',
    image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasContornos: true
  },
  {
    id: 'car-39',
    num: 39,
    name: 'Punta de Cerdo (350gr)',
    category: 'carnes',
    price: 21.00,
    description: '350gr de jugosa punta de cerdo marinada a la brasa, acompañada de 2 contornos de su elección.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasContornos: true
  },
  {
    id: 'car-40',
    num: 40,
    name: 'Churrasco de Solomo a la Criolla',
    category: 'carnes',
    price: 35.00,
    description: 'Solomo tierno en corte mariposa, queso a la plancha, chorizo artesanal y 2 contornos a su gusto.',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasContornos: true
  },
  {
    id: 'car-41',
    num: 41,
    name: 'Cartoccio de Lomito',
    category: 'carnes',
    price: 31.00,
    description: 'Lomito envuelto en papel plata horneado con salsa de champiñones frescos, jamón serrano y queso amarillo, acompañado de linguini 4 quesos.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'car-42',
    num: 42,
    name: 'Medallones de Lomito al Vino',
    category: 'carnes',
    price: 30.00,
    description: '2 Medallones de lomito sellados en salsa de vino tinto reducción, crema de leche y demi-glace francés, más 2 contornos a elegir.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasContornos: true
  },
  {
    id: 'car-43',
    num: 43,
    name: 'Lechón al Horno Pequeño',
    category: 'carnes',
    price: 250.00,
    description: 'Pieza de lechón entero sazonado a fuego lento con piel hiper crujiente y carne jugosa (Solo bajo pedido anticipado).',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Bajo Pedido'
  },
  {
    id: 'car-44',
    num: 44,
    name: 'Suprema de Pollo a la Suiza',
    category: 'carnes',
    price: 19.00,
    description: 'Pechuga de pollo en salsa blanca, queso mozzarella abundante, gratinado con queso parmesano dorado y 2 contornos a elegir.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasContornos: true
  },
  {
    id: 'car-45',
    num: 45,
    name: 'Estofado de Cordero',
    category: 'carnes',
    price: 25.00,
    description: 'Cordero tierno cocido lentamente en su propio jugo con vegetales frescos de temporada y papas al vapor al romero.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'car-46',
    num: 46,
    name: 'Tiras de Lomito a la Mostaza',
    category: 'carnes',
    price: 15.00,
    description: 'Tiras de lomito tierno salteadas en suave crema de mostaza dijon y 2 contornos a su gusto.',
    image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasContornos: true
  },

  // --- PARRILLAS (47-52) ---
  {
    id: 'par-47',
    num: 47,
    name: 'Parrilla Mixta (Para 6)',
    category: 'parrillas',
    price: 50.00,
    description: 'Gran banquete familiar: Lomito jugoso, pollo a la brasa, papas fritas abundantes, queso a la plancha en tiras y ensalada mixta.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Para 6 Personas'
  },
  {
    id: 'par-48',
    num: 48,
    name: 'Mini Parrilla Mixta',
    category: 'parrillas',
    price: 13.00,
    description: 'Salteado de lomito suave y pollo a la plancha, papas fritas crujientes, queso a la plancha en tiras y ensalada mixta.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'par-49',
    num: 49,
    name: 'Parrilla Mar y Tierra (Para 6)',
    category: 'parrillas',
    price: 60.00,
    description: 'Pulpo, camarones, calamares salteados con lomito de res y pollo, pimentón, cebolla, papas fritas y queso a la plancha.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Para 6 Personas'
  },
  {
    id: 'par-50',
    num: 50,
    name: 'Mini Parrilla Mar y Tierra',
    category: 'parrillas',
    price: 13.00,
    description: 'Pulpo, camarones, calamares, pollo y lomito salteados con pimentón y cebolla, servidos con papas fritas y queso a la plancha.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'par-51',
    num: 51,
    name: 'Parrilla de Pollo (Para 6)',
    category: 'parrillas',
    price: 35.00,
    description: 'Milanesa de pechuga en finos cortes a la plancha salteada con pimentón y cebolla, papas fritas y queso a la plancha.',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Para 6 Personas'
  },
  {
    id: 'par-52',
    num: 52,
    name: 'Parrilla de Mariscos (Para 6)',
    category: 'parrillas',
    price: 60.00,
    description: 'Pulpo entero, camarones jumbo, calamares, almejas y mejillones salteados al fuego vivo con papas fritas y queso a la plancha.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Para 6 Personas'
  },

  // --- PIZZAS (53-62) ---
  {
    id: 'piz-53',
    num: 53,
    name: 'Pizza Rellena Mediana',
    category: 'pizzas',
    price: 25.00,
    description: 'Masa gruesa rellena: Doble queso mozzarella fundido, doble jamón, carne molida especiada, pollo desmechado y salsa artesanal.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Favorito'
  },
  {
    id: 'piz-54',
    num: 54,
    name: 'Pizza Rellena Pequeña',
    category: 'pizzas',
    price: 18.00,
    description: 'Doble porción de queso derretido, doble jamón, carne molida, pollo sazonado y abundante salsa especial.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'piz-55',
    num: 55,
    name: 'Pizza Santorini Mediana (+ Refresco)',
    category: 'pizzas',
    price: 12.00,
    description: 'Jamón, queso mozzarella, maíz dulce, tocineta ahumada, pepperoni crocante. ¡Incluye refresco de lata gratis!',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Incluye Bebida'
  },
  {
    id: 'piz-56',
    num: 56,
    name: 'Pizza Santorini Pequeña',
    category: 'pizzas',
    price: 8.00,
    description: 'Jamón tierno, queso mozzarella abundante, maíz dulce y tocineta con pepperoni.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'piz-57',
    num: 57,
    name: 'Pizza Capressa Mediana (+ Refresco)',
    category: 'pizzas',
    price: 12.00,
    description: 'Salsa nápoles, pesto de albahaca fresca, mozzarella derretido y ruedas de tomate maduro. Incluye refresco de lata.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'piz-58',
    num: 58,
    name: 'Pizza Capressa Pequeña',
    category: 'pizzas',
    price: 8.00,
    description: 'Salsa nápoles casera, toque aromático de pesto, queso mozzarella y rodajas de tomate fresco.',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'piz-59',
    num: 59,
    name: 'Pizza Volcán Mediana (+ Refresco 1L)',
    category: 'pizzas',
    price: 16.00,
    description: 'Explosión de sabor: Carne de cerdo, res, abundante queso, jamón y tocineta crocante. Incluye refresco familiar de 1 Litro.',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Refresco 1L'
  },
  {
    id: 'piz-60',
    num: 60,
    name: 'Pizza Margarita Mediana (+ Refresco)',
    category: 'pizzas',
    price: 12.00,
    description: 'Clásica salsa nápoles, queso mozzarella dorado y maíz dulce en granos. Incluye refresco en lata.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'piz-61',
    num: 61,
    name: 'Pizza Marinera Mediana (+ Refresco 1L)',
    category: 'pizzas',
    price: 16.00,
    description: 'Masa fina con calamares salteados, pulpo tierno, camarones frescos y salsa de la casa. Incluye refresco de 1 Litro.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Refresco 1L'
  },
  {
    id: 'piz-62',
    num: 62,
    name: 'Pizza Marinera Pequeña (+ Refresco)',
    category: 'pizzas',
    price: 10.00,
    description: 'Calamares, pulpo y camarones dorados sobre mozzarella fundido. Incluye refresco en lata.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // --- SHAWARMAS (63-67) ---
  {
    id: 'sha-63',
    num: 63,
    name: 'Shawarma de 1 Proteína',
    category: 'shawarmas',
    price: 6.00,
    description: 'Pan árabe enrollado con la proteína de tu preferencia (Pollo, Pernil, Carne o Falafel), ensalada tabule fresca, pepinillo, crema de garbanzo y salsa de ajo.',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasProteina: true
  },
  {
    id: 'sha-64',
    num: 64,
    name: 'Shawarma Mixto (2 Proteínas)',
    category: 'shawarmas',
    price: 7.00,
    description: 'Pan árabe relleno de 2 proteínas a tu elección, fresca ensalada tabule, pepinillos crujientes, crema hummous y exquisita crema de ajo.',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasProteina: true
  },
  {
    id: 'sha-65',
    num: 65,
    name: 'Shawarma Triple (3 Proteínas)',
    category: 'shawarmas',
    price: 8.00,
    description: 'Mega shawarma con 3 proteínas a tu gusto, tabule, pepinillos encurtidos, salsa de garbanzo y salsa de ajo libanesa.',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasProteina: true
  },
  {
    id: 'sha-66',
    num: 66,
    name: 'Plato Árabe Mixto',
    category: 'shawarmas',
    price: 35.00,
    description: 'Festín tradicional: Ración de kibbe frito, ración de tabaquitos en hoja de parra, falafel crujiente, ensalada tabule y 2 pinchos a elección.',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Gran Plato'
  },
  {
    id: 'sha-67',
    num: 67,
    name: 'Plato de Shawarma Picado',
    category: 'shawarmas',
    price: 15.00,
    description: '2 Shawarmas cortados en bocados rellenos de tabule, pepinillo, proteína de su elección, salsas árabes, papas fritas, falafel y pollo.',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // --- RACIONES ÁRABES (68-73) ---
  {
    id: 'rac-68',
    num: 68,
    name: 'Tabaquitos de Hoja de Uva',
    category: 'raciones',
    price: 10.00,
    description: 'Hojas tiernas de parra rellenas de arroz y carne molida sazonada con especias árabes, acompañadas de suave crema de garbanzos.',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'rac-69',
    num: 69,
    name: 'Kibbe Frito Tradicional',
    category: 'raciones',
    price: 12.00,
    description: 'Frituras ovaladas crocantes de trigo burgol rellenas de carne molida aromática con especias árabes, servidas con salsa de garbanzos.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'rac-70',
    num: 70,
    name: 'Falafel Crocante',
    category: 'raciones',
    price: 10.00,
    description: 'Croquetas doradas de garbanzos frescos molidos con perejil, ajo y especias del oriente, servidas con salsa tahini/garbanzos.',
    image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'rac-71',
    num: 71,
    name: 'Pan Árabe Frito',
    category: 'raciones',
    price: 2.51,
    description: 'Triángulos de pan árabe fritos crocantes bañados con deliciosa salsa de melaza de granadina.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'rac-72',
    num: 72,
    name: 'Tabule Tradicional',
    category: 'raciones',
    price: 6.00,
    description: 'Ensalada tradicional de perejil picado muy fino, tomate fresco, trigo burgol, cebollín, hierbabuena, aceite de oliva y limón.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'rac-73',
    num: 73,
    name: 'Ensalada Fatush',
    category: 'raciones',
    price: 6.00,
    description: 'Mezcla de verduras frescas, hierbas aromáticas, trozos crocantes de pan frito y un aderezo cítrico con sumac y especias árabes.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // --- HAMBURGUESAS Y PEPITOS (74-79) ---
  {
    id: 'ham-74',
    num: 74,
    name: 'Hamburguesa Clásica (+ Vaso Refresco)',
    category: 'hamburguesas',
    price: 9.00,
    description: 'Pan brioche artesanal, 100gr de proteína a su gusto, vegetales frescos, queso cheddar kraft, salsas de la casa, papas fritas y vaso de refresco.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasProteina: true
  },
  {
    id: 'ham-75',
    num: 75,
    name: 'Hamburguesa Sweet Onion',
    category: 'hamburguesas',
    price: 10.00,
    description: 'Pan brioche, 100gr de proteína a elección, queso crema, cebolla dulce caramelizada, queso facilita derretido, tocineta crocante y papas fritas.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasProteina: true,
    badge: 'Recomendada'
  },
  {
    id: 'ham-76',
    num: 76,
    name: 'Hamburguesa César',
    category: 'hamburguesas',
    price: 10.00,
    description: 'Pan brioche tostado con pollo crispy dorado, salsa de la casa, lechuga romana, queso crema, queso kraft, lluvia de queso parmesano y tocineta.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'ham-77',
    num: 77,
    name: 'Hamburguesa Callejera Tío Santorini',
    category: 'hamburguesas',
    price: 12.00,
    description: 'Pan brioche, 100gr de proteína a elección, huevo frito, tocineta, lluvia de papitas de perro, maíz dulce, salsas especiales, vegetales frescos y papas fritas.',
    image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasProteina: true,
    badge: 'Muy Vendida'
  },
  {
    id: 'ham-78',
    num: 78,
    name: 'Pepito Tradicional',
    category: 'hamburguesas',
    price: 11.00,
    description: 'Baguette suave relleno de una (1) proteína a su gusto (carne o pollo), vegetales frescos, queso fundido, papitas de perro, salsas y papas fritas.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasProteina: true
  },
  {
    id: 'ham-79',
    num: 79,
    name: 'Pepito Mixto (Carne y Pollo)',
    category: 'hamburguesas',
    price: 13.00,
    description: 'Pan baguette relleno de dos (2) proteínas a su elección salteadas con vegetales, salsa tártara de ajo, queso derretido, papitas de perro y papas fritas.',
    image: 'https://images.unsplash.com/photo-1627042633706-0498a44b971a?auto=format&fit=crop&w=600&q=80',
    available: true,
    hasProteina: true
  },

  // --- MENU KIDS (80-84) ---
  {
    id: 'kid-80',
    num: 80,
    name: 'Hamburguesa Kids',
    category: 'kids',
    price: 8.00,
    description: 'Pan brioche tierno, pechuga de pollo crispy o a la plancha, queso kraft suave, salsas básicas y papas fritas doraditas.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'kid-81',
    num: 81,
    name: 'Sándwich Kids Triangulares',
    category: 'kids',
    price: 8.00,
    description: '4 panes de sándwich triangulares rellenos de jamón dulce, queso facilita, huevo, salsas básicas y papas fritas.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'kid-82',
    num: 82,
    name: 'Tender de Pollo Kids',
    category: 'kids',
    price: 10.00,
    description: '4 Tenders de pechuga crujiente más 200gr de papas fritas doradas acompañadas de suave crema dip.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'kid-83',
    num: 83,
    name: 'Choripapas Kids',
    category: 'kids',
    price: 12.00,
    description: '350gr de chorizo parrillero rebanado, 300gr de papas fritas, bañadas en salsa de queso amarillo fundido y aderezos.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'kid-84',
    num: 84,
    name: 'Pollo a la Broaster Kids',
    category: 'kids',
    price: 12.00,
    description: '4 piezas de pollo crocante frito estilo broaster, papas fritas crujientes y ensalada rallada fresca.',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // --- PROMOS ESPECIALES (85-88) ---
  {
    id: 'pro-85',
    num: 85,
    name: 'Promo 2 Shawarmas (1 Prot) + Refresco 1.5L',
    category: 'promos',
    price: 11.99,
    description: '2 Shawarmas de 1 proteína a tu elección (pollo, pernil o carne), ensalada tabule, salsa de garbanzo, ajo + Refresco familiar de 1.5L.',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Super Oferta'
  },
  {
    id: 'pro-86',
    num: 86,
    name: 'Promo Plato Shawarma Picado + Refresco 1.5L',
    category: 'promos',
    price: 15.00,
    description: '2 Shawarmas picados rellenos de tabule, pepinillo, proteína a elección, salsas, papas fritas, falafel, pollo + Refresco de 1.5L.',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Ahorro'
  },
  {
    id: 'pro-87',
    num: 87,
    name: 'Promo 2 Hamburguesas + Refresco 1.5L',
    category: 'promos',
    price: 16.00,
    description: '2 Hamburguesas en pan brioche con 100gr de proteína a tu elección, vegetales, queso kraft, salsas + papas fritas para compartir + Refresco 1.5L.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Combo Dúo'
  },
  {
    id: 'pro-88',
    num: 88,
    name: 'Promo 2 Pizzas Santorini Med + Refresco 1.5L',
    category: 'promos',
    price: 22.01,
    description: '2 Pizzas medianas Santorini (Jamón, mozzarella, maíz, tocineta y pepperoni) + Refresco familiar de 1.5L.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Combo Familiar'
  },

  // --- COCTELES DESTACADOS (Pág 8-9) ---
  {
    id: 'coc-1',
    num: 101,
    name: 'Margarita Clásica',
    category: 'cocteles',
    price: 5.00,
    description: 'Tequila blanco, licor triple seco Triple C, zumo de limón fresco y escarchado de sal en copa.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'coc-2',
    num: 102,
    name: 'Margarita Afrutado (Fresa o Parchita)',
    category: 'cocteles',
    price: 5.00,
    description: 'Tequila premium, triple C, limón fresco y pulpa concentrada de fresa o parchita al gusto.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'coc-6',
    num: 106,
    name: 'Piña Colada Tradicional',
    category: 'cocteles',
    price: 5.00,
    description: 'Piña dulce, ron blanco caribeño, licor de coco, crema de coco, leche condensada, batido frapé.',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=600&q=80',
    available: true,
    badge: 'Coctel Estrella'
  },
  {
    id: 'coc-7',
    num: 107,
    name: 'Piña Colada Silver',
    category: 'cocteles',
    price: 5.00,
    description: 'Piña natural, ron, licor y crema de coco, leche condensada y un toque de crema de whisky Baileys con hielo agitado.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'coc-8',
    num: 108,
    name: 'Mojito Clásico',
    category: 'cocteles',
    price: 3.50,
    description: 'Hojas frescas de hierbabuena maceradas con azúcar morena, zumo de limón verde, ron blanco y soda.',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'coc-9',
    num: 109,
    name: 'Mojito Afrutado (Fresa o Parchita)',
    category: 'cocteles',
    price: 3.50,
    description: 'Hierbabuena, ron blanco, limón, azúcar, soda y pulpa natural fresca de fruta de su preferencia.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'coc-10',
    num: 110,
    name: 'Tequila Sunrise',
    category: 'cocteles',
    price: 5.00,
    description: 'Tequila de la casa, zumo natural de naranja colado y jarabe de granadina con degradé solar.',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'coc-12',
    num: 112,
    name: 'Gin Tonic Clásico',
    category: 'cocteles',
    price: 5.50,
    description: 'Ginebra destilada aromatizada, rodaja fresca de limón, agua tónica Aguakina y abundante hielo cristalino.',
    image: 'https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'coc-21',
    num: 121,
    name: 'Cuba Libre',
    category: 'cocteles',
    price: 3.50,
    description: 'Ron añejo venezolano, limón fresco exprimido, gotas de amargo de angostura y refresco de cola frío.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'coc-24',
    num: 124,
    name: 'Tinto de Verano',
    category: 'cocteles',
    price: 4.00,
    description: 'Vino tinto joven, toque cítrico de limón o parchita, licor triple seco y refresco de lima limón.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'coc-25',
    num: 125,
    name: 'Sex on the Beach',
    category: 'cocteles',
    price: 5.00,
    description: 'Vodka destilado, licor de durazno, zumo de arándanos rojos y zumo natural de naranja.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
    available: true
  },

  // --- BEBIDAS NO ALCOHÓLICAS Y JUGOS (Pág 11) ---
  {
    id: 'beb-85',
    num: 185,
    name: 'Jugo Natural (Fresa, Mora, Piña, Guanábana, Parchita)',
    category: 'bebidas',
    price: 5.00,
    description: 'Pulpa de fruta natural recién licuada: Fresa, mora, piña, guanábana, parchita, durazno, naranja o limonadas especiales.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'beb-86',
    num: 186,
    name: 'Smoothie Cremoso (Fresa o Mora)',
    category: 'bebidas',
    price: 5.00,
    description: 'Batido frapé espeso de fruta natural con base cremosa y hielo triturado.',
    image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'beb-87',
    num: 187,
    name: 'Café Expreso Italiano',
    category: 'bebidas',
    price: 1.30,
    description: 'Shot de café espresso concentrado con crema avellana aromática.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'beb-88',
    num: 188,
    name: 'Café Americano',
    category: 'bebidas',
    price: 1.50,
    description: 'Café negro tradicional suave y reconfortante en taza grande.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'beb-91',
    num: 191,
    name: 'Agua Mineral / Aguakina',
    category: 'bebidas',
    price: 1.50,
    description: 'Botella de agua mineral pura o lata de agua tónica bien fría.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'beb-96',
    num: 196,
    name: 'Refresco en Lata',
    category: 'bebidas',
    price: 1.50,
    description: 'Lata fría de 355ml a elección (Coca-Cola, Chinotto, Frescolita, Pepsi).',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'beb-97',
    num: 197,
    name: 'Refresco Familiar de 1 Litro',
    category: 'bebidas',
    price: 2.00,
    description: 'Botella de refresco de 1 litro bien frío para acompañar sus comidas.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'beb-98',
    num: 198,
    name: 'Refresco Familiar 1.5 Litros',
    category: 'bebidas',
    price: 2.50,
    description: 'Botella de refresco de 1.5 litros ideal para familias y grupos.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'beb-99',
    num: 199,
    name: 'Refresco Familiar 2 Litros',
    category: 'bebidas',
    price: 3.00,
    description: 'Botella de 2 litros bien fría.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    available: true
  },
  {
    id: 'beb-103',
    num: 203,
    name: 'Lata de Caroreña / Sangría',
    category: 'bebidas',
    price: 2.00,
    description: 'Lata helada de sangría Caroreña blanca o tinta para disfrutar.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    available: true
  }
];

// Configuración general del negocio
const RESTAURANT_CONFIG = {
  name: "Tío Santorini",
  slogan: "Una experiencia culinaria que embelesa tus sentidos",
  phone: "+584123714136",
  phoneDisplay: "(0412) 371-4136",
  phoneAlt: "(0424) 4463511",
  instagram: "@Santorini_venezuela",
  location: "San Diego, Carabobo, Venezuela",
  schedule: "Lunes a Domingo: 11:00 AM - 3:00 AM",
  defaultBcvRate: 40.50, // Tasa de cambio aproximada editable desde el admin
  currencySymbol: "$",
  pinAdmin: "1234"
};

// 4 Shows en Vivo Oficiales (Miércoles a Sábados) - Editables en el Panel Admin
const INITIAL_SHOWS = [
  {
    id: "show-1",
    day: "Miércoles",
    schedule: "Todos los Miércoles • 8:00 PM",
    title: "Miércoles de Saxo & Noche de Copas",
    description: "Ambiente íntimo con saxofón en vivo, gastronomía mediterránea y promociones exclusivas en cócteles.",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
    badge: "🔴 EN VIVO • MIÉRCOLES",
    active: true
  },
  {
    id: "show-2",
    day: "Jueves",
    schedule: "Todos los Jueves • 8:30 PM",
    title: "Jueves Acústico & Noche de Carnes",
    description: "Música en vivo en formato acústico (pop, baladas y clásicos) para acompañar los mejores cortes de carne.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    badge: "🔴 EN VIVO • JUEVES",
    active: true
  },
  {
    id: "show-3",
    day: "Viernes",
    schedule: "Todos los Viernes • 9:00 PM",
    title: "Viernes de Agrupación en Vivo & Rumba",
    description: "Banda en vivo con lo mejor de la música latina bailable, salsa y fiesta total para encender el fin de semana.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    badge: "🔴 EN VIVO • VIERNES",
    active: true
  },
  {
    id: "show-4",
    day: "Sábado",
    schedule: "Todos los Sábados • 9:30 PM",
    title: "Sábado de Gala, Show en Vivo & DJ Set",
    description: "La rumba más elegante de San Diego con gran show musical, DJ residente y coctelería abierta hasta las 3:00 AM.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    badge: "🔴 EN VIVO • SÁBADO",
    active: true
  }
];

// Ventas y Pedidos de Muestra Iniciales (Se registran automáticamente en cada pedido)
const INITIAL_ORDERS = [
  {
    id: "TS-5042",
    timestamp: Date.now() - 3600000 * 2,
    dateFormatted: "26/10/2026",
    timeFormatted: "11:45 AM",
    clientName: "Alejandro Mendoza",
    clientPhone: "0412-4458921",
    orderType: "delivery",
    orderTypeLabel: "🛵 Delivery a Domicilio",
    deliveryAddress: "Urb. El Remanso, Calle 4, Casa #18, San Diego",
    paymentMethod: "Pago Móvil (Bs)",
    generalNotes: "Tocar el timbre blanco en la reja",
    items: [
      { name: "Punta Trasera (350gr)", quantity: 1, price: 21.00, total: 21.00, customOptions: "Contornos: Papas Fritas y Ensalada César | Término 3/4" },
      { name: "Ración de Tequeños", quantity: 1, price: 6.00, total: 6.00, customOptions: "" },
      { name: "Refresco Familiar 1.5 Litros", quantity: 1, price: 2.50, total: 2.50, customOptions: "" }
    ],
    totalUSD: 29.50,
    totalVES: 1194.75,
    bcvRate: 40.50
  },
  {
    id: "TS-5041",
    timestamp: Date.now() - 3600000 * 5,
    dateFormatted: "26/10/2026",
    timeFormatted: "08:15 PM",
    clientName: "Dra. Valentina Morales",
    clientPhone: "0414-3419082",
    orderType: "llevar",
    orderTypeLabel: "🛍️ Para Llevar / Pick Up",
    deliveryAddress: "Retiro en Local",
    paymentMethod: "Zelle",
    generalNotes: "Pasará a retirar en 25 minutos",
    items: [
      { name: "Promo 2 Shawarmas (1 Prot) + Refresco 1.5L", quantity: 1, price: 11.99, total: 11.99, customOptions: "Proteína: Pollo" },
      { name: "Ración de Empanaditas", quantity: 1, price: 6.00, total: 6.00, customOptions: "" }
    ],
    totalUSD: 17.99,
    totalVES: 728.60,
    bcvRate: 40.50
  },
  {
    id: "TS-5040",
    timestamp: Date.now() - 3600000 * 8,
    dateFormatted: "25/10/2026",
    timeFormatted: "09:30 PM",
    clientName: "Roberto Gómez",
    clientPhone: "0424-4128833",
    orderType: "mesa",
    orderTypeLabel: "🍽️ En el Restaurante (Mesa #6)",
    deliveryAddress: "Mesa #6",
    paymentMethod: "Efectivo Divisas ($)",
    generalNotes: "Cubiertos adicionales",
    items: [
      { name: "Paella de Mariscos (Para 2)", quantity: 1, price: 50.00, total: 50.00, customOptions: "" },
      { name: "Mojito Clásico", quantity: 2, price: 3.50, total: 7.00, customOptions: "" }
    ],
    totalUSD: 57.00,
    totalVES: 2308.50,
    bcvRate: 40.50
  },
  {
    id: "TS-5039",
    timestamp: Date.now() - 3600000 * 24,
    dateFormatted: "25/10/2026",
    timeFormatted: "01:10 PM",
    clientName: "Carlos Eduardo Silva",
    clientPhone: "0412-9981240",
    orderType: "delivery",
    orderTypeLabel: "🛵 Delivery a Domicilio",
    deliveryAddress: "Residencias San Diego Suites, Torre B, Apto 4-2",
    paymentMethod: "Pago Móvil (Bs)",
    generalNotes: "Entregar en vigilancia",
    items: [
      { name: "Promo 2 Pizzas Santorini Med + Refresco 1.5L", quantity: 1, price: 22.01, total: 22.01, customOptions: "" },
      { name: "Dedos de Mozzarella", quantity: 1, price: 9.50, total: 9.50, customOptions: "" }
    ],
    totalUSD: 31.51,
    totalVES: 1276.16,
    bcvRate: 40.50
  },
  {
    id: "TS-5038",
    timestamp: Date.now() - 3600000 * 28,
    dateFormatted: "24/10/2026",
    timeFormatted: "07:40 PM",
    clientName: "María Gabriela Castro",
    clientPhone: "0416-5412398",
    orderType: "llevar",
    orderTypeLabel: "🛍️ Para Llevar / Pick Up",
    deliveryAddress: "Retiro en Local",
    paymentMethod: "Punto de Venta",
    generalNotes: "Sin cebolla en las hamburguesas",
    items: [
      { name: "Hamburguesa Callejera Tío Santorini", quantity: 2, price: 12.00, total: 24.00, customOptions: "Proteína: Carne de Res | Sin cebolla" },
      { name: "Jugo Natural (Fresa, Mora, Piña, Guanábana, Parchita)", quantity: 2, price: 5.00, total: 10.00, customOptions: "Sabor: Fresa y Parchita" }
    ],
    totalUSD: 34.00,
    totalVES: 1377.00,
    bcvRate: 40.50
  }
];
