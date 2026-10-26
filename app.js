// Lógica Principal - Tío Santorini Menú Digital & Admin
// WhatsApp Pedidos: +584123714136

// --- ESTADO GLOBAL ---
let products = [];
let shows = [];
let cart = [];
let currentCategory = 'todos';
let searchQuery = '';
let currentCustomizingProduct = null;
let editingProductId = null;
let editingShowId = null;
let isAdminAuthenticated = false;
let currentShowIndex = 0;
let showAutoplayTimer = null;

// Configuración cargada de LocalStorage o por defecto
let appConfig = {
  phone: RESTAURANT_CONFIG.phone,
  phoneDisplay: RESTAURANT_CONFIG.phoneDisplay,
  bcvRate: RESTAURANT_CONFIG.defaultBcvRate,
  pin: RESTAURANT_CONFIG.pinAdmin
};

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  loadConfig();
  loadProducts();
  loadShows();
  loadCart();
  renderCategories();
  renderProducts();
  renderShowSlider();
  startShowAutoplay();
  setupSliderTouchEvents();
  updateCartUI();
  setupEventListeners();
  updateConfigDisplay();
});

// Cargar configuración guardada
function loadConfig() {
  const saved = localStorage.getItem('santorini_config');
  if (saved) {
    try {
      appConfig = { ...appConfig, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Error al cargar config:', e);
    }
  }
}

function saveConfig() {
  localStorage.setItem('santorini_config', JSON.stringify(appConfig));
  updateConfigDisplay();
}

function updateConfigDisplay() {
  const bcvEls = document.querySelectorAll('.bcv-rate-text');
  bcvEls.forEach(el => el.textContent = `Bs. ${Number(appConfig.bcvRate).toFixed(2)}`);

  const phoneEls = document.querySelectorAll('.phone-display-text');
  phoneEls.forEach(el => el.textContent = appConfig.phoneDisplay || appConfig.phone);

  const phoneInputs = document.querySelectorAll('#admin-phone-input');
  phoneInputs.forEach(el => el.value = appConfig.phone);

  const bcvInputs = document.querySelectorAll('#admin-bcv-input');
  bcvInputs.forEach(el => el.value = appConfig.bcvRate);
}

// Cargar productos de LocalStorage o iniciales
function loadProducts() {
  const saved = localStorage.getItem('santorini_products_v2');
  if (saved) {
    try {
      products = JSON.parse(saved);
    } catch (e) {
      products = [...INITIAL_PRODUCTS];
    }
  } else {
    products = [...INITIAL_PRODUCTS];
    saveProducts();
  }
}

function saveProducts() {
  localStorage.setItem('santorini_products_v2', JSON.stringify(products));
}

// Cargar y Guardar Shows en Vivo (Miércoles a Sábados)
function loadShows() {
  const saved = localStorage.getItem('santorini_shows');
  if (saved) {
    try {
      shows = JSON.parse(saved);
    } catch (e) {
      shows = [...INITIAL_SHOWS];
    }
  } else {
    shows = typeof INITIAL_SHOWS !== 'undefined' ? [...INITIAL_SHOWS] : [];
    saveShows();
  }
}

function saveShows() {
  localStorage.setItem('santorini_shows', JSON.stringify(shows));
}

// --- RENDERIZADO DEL CARRUSEL DE SHOWS EN VIVO ---
function renderShowSlider() {
  const container = document.getElementById('shows-slides-container');
  const dotsContainer = document.getElementById('shows-slider-dots');
  if (!container || !dotsContainer) return;

  const activeShows = shows.filter(s => s.active !== false);

  if (activeShows.length === 0) {
    container.innerHTML = `
      <div class="h-full flex items-center justify-center text-center p-6 text-slate-400">
        <p class="text-xs">No hay shows programados actualmente.</p>
      </div>
    `;
    dotsContainer.innerHTML = '';
    return;
  }

  if (currentShowIndex >= activeShows.length) {
    currentShowIndex = 0;
  }

  container.innerHTML = activeShows.map((show, idx) => {
    const isCurrent = idx === currentShowIndex;
    let targetPhone = appConfig.phone.replace(/[^0-9]/g, '');
    if (!targetPhone.startsWith('58')) targetPhone = '58' + targetPhone;
    const reservationMsg = encodeURIComponent(`¡Hola Tío Santorini! Quisiera reservar una mesa para el show en vivo: "${show.title}" (${show.schedule}).`);

    return `
      <div class="shows-slide ${isCurrent ? 'active' : ''}" data-index="${idx}">
        <img 
          src="${show.image || 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80'}" 
          alt="${show.title}" 
          class="shows-slide-bg"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80';"
        />
        <div class="shows-slide-overlay"></div>
        
        <div class="shows-slide-content">
          <div class="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
            
            <!-- Badge EN VIVO -->
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/60 text-amber-400 text-[10px] sm:text-xs font-black shadow-lg">
              <span class="w-2 h-2 rounded-full bg-red-500 pulse-dot"></span>
              <span>${show.badge || `EN VIVO • ${show.day.toUpperCase()}`}</span>
            </div>

            <!-- Título del Show (Con margen para despejar controles) -->
            <h2 class="text-lg sm:text-2xl lg:text-3xl font-black text-white brand-font leading-snug drop-shadow-md pr-2 sm:pr-0">
              ${show.title}
            </h2>

            <!-- Horario y Programación -->
            <div class="flex items-center gap-2 text-xs sm:text-sm text-amber-300 font-bold">
              <i class="fa-solid fa-calendar-check text-xs"></i>
              <span>${show.schedule}</span>
            </div>

            <!-- Descripción -->
            <p class="text-[11px] sm:text-sm text-slate-200 line-clamp-2 max-w-xl drop-shadow leading-relaxed">
              ${show.description || 'Disfruta de la mejor música en vivo, gastronomía y cócteles en Tío Santorini San Diego.'}
            </p>
          </div>

          <!-- Botón de Reserva para el Show -->
          <div class="pt-1">
            <a 
              href="https://wa.me/${targetPhone}?text=${reservationMsg}" 
              target="_blank" 
              class="btn-gold inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black shadow-xl cursor-pointer active:scale-95"
            >
              <i class="fa-brands fa-whatsapp text-sm sm:text-base"></i>
              <span>Reservar Mesa para este Show</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Renderizar dots indicadores
  if (dotsContainer) {
    dotsContainer.innerHTML = activeShows.map((_, idx) => `
      <button 
        type="button"
        onclick="goToShowSlide(${idx})" 
        class="slider-dot ${idx === currentShowIndex ? 'active' : ''}" 
        aria-label="Ir al show ${idx + 1}"
      ></button>
    `).join('');
  }

  // Actualizar contador superior
  updateShowSlideActive();
}

// Control del Carrusel Automático ("que se deslice solo")
function startShowAutoplay() {
  stopShowAutoplay();
  showAutoplayTimer = setInterval(() => {
    nextShowSlide();
  }, 4500); // Se desliza solo cada 4.5 segundos
}

function stopShowAutoplay() {
  if (showAutoplayTimer) {
    clearInterval(showAutoplayTimer);
    showAutoplayTimer = null;
  }
}

function nextShowSlide() {
  const activeShows = shows.filter(s => s.active !== false);
  if (activeShows.length <= 1) return;
  currentShowIndex = (currentShowIndex + 1) % activeShows.length;
  updateShowSlideActive();
}

function prevShowSlide() {
  const activeShows = shows.filter(s => s.active !== false);
  if (activeShows.length <= 1) return;
  currentShowIndex = (currentShowIndex - 1 + activeShows.length) % activeShows.length;
  updateShowSlideActive();
}

function goToShowSlide(index) {
  currentShowIndex = index;
  updateShowSlideActive();
  startShowAutoplay(); // Reiniciar contador al hacer clic
}

function updateShowSlideActive() {
  const slides = document.querySelectorAll('.shows-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const counter = document.getElementById('slider-counter');

  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === currentShowIndex);
  });

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentShowIndex);
  });

  const activeShows = shows.filter(s => s.active !== false);
  if (counter && activeShows.length > 0) {
    counter.textContent = `${currentShowIndex + 1} / ${activeShows.length}`;
  }
}

// Gestos táctiles para iPhone y Android (Deslizar con el dedo)
function setupSliderTouchEvents() {
  const slider = document.getElementById('shows-slider-component');
  if (!slider) return;

  let startX = 0;
  let endX = 0;

  slider.addEventListener('touchstart', (e) => {
    stopShowAutoplay();
    startX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff > 45) {
      prevShowSlide(); // Deslizar hacia la derecha (anterior)
    } else if (diff < -45) {
      nextShowSlide(); // Deslizar hacia la izquierda (siguiente)
    }
    startShowAutoplay();
  }, { passive: true });

  // Pausar en desktop cuando el cursor esté encima
  slider.addEventListener('mouseenter', stopShowAutoplay);
  slider.addEventListener('mouseleave', startShowAutoplay);
}

// Carrito
function loadCart() {
  const saved = localStorage.getItem('santorini_cart');
  if (saved) {
    try {
      cart = JSON.parse(saved);
    } catch (e) {
      cart = [];
    }
  }
}

function saveCart() {
  localStorage.setItem('santorini_cart', JSON.stringify(cart));
  updateCartUI();
}

// --- RENDERIZADO DE CATEGORÍAS ---
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  container.innerHTML = INITIAL_CATEGORIES.map(cat => {
    const isActive = cat.id === currentCategory;
    return `
      <button 
        onclick="setCategory('${cat.id}')"
        class="cat-pill px-4 py-2 rounded-full text-xs md:text-sm font-medium flex items-center gap-2 cursor-pointer transition-all ${isActive ? 'active' : ''}"
        data-category="${cat.id}"
      >
        <i class="fa-solid ${cat.icon} text-gold"></i>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');
}

function setCategory(catId) {
  currentCategory = catId;
  renderCategories();
  renderProducts();

  // Scroll suave al área del menú
  const menuArea = document.getElementById('menu-section');
  if (menuArea && window.innerWidth < 768) {
    menuArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// --- RENDERIZADO DE PRODUCTOS ---
function renderProducts() {
  const container = document.getElementById('products-grid');
  const countBadge = document.getElementById('results-count');
  if (!container) return;

  // Filtrado por categoría y término de búsqueda
  let filtered = products.filter(p => {
    const matchesCategory = currentCategory === 'todos' || p.category === currentCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      p.name.toLowerCase().includes(q) || 
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.badge && p.badge.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} platillo${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-950/60 border border-blue-800 flex items-center justify-center text-2xl text-amber-400">
          <i class="fa-solid fa-utensils"></i>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">No se encontraron productos</h3>
        <p class="text-sm text-slate-400 max-w-sm mx-auto">Prueba con otra palabra clave o selecciona otra categoría en la parte superior.</p>
        <button onclick="clearSearch()" class="mt-4 px-4 py-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-amber-400 border border-amber-400/30 text-sm font-semibold transition-all">
          Ver todo el menú
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => {
    const isAvailable = product.available !== false;
    const priceFormatted = Number(product.price).toFixed(2);
    const bcvPriceFormatted = (product.price * appConfig.bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    // Contar cuántos de este producto ya están en el carrito
    const inCartQty = cart
      .filter(item => item.productId === product.id)
      .reduce((sum, item) => sum + item.quantity, 0);

    const requiresCustomization = product.hasContornos || product.hasProteina;

    return `
      <div class="food-card glow-card group ${!isAvailable ? 'opacity-60 grayscale' : ''}" id="card-${product.id}">
        <!-- Imagen y Badges -->
        <div class="food-card-img-wrapper cursor-pointer" onclick="openProductCustomizer('${product.id}')">
          <img 
            src="${product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}" 
            alt="${product.name}" 
            class="food-card-img"
            loading="lazy"
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
          
          <!-- Badge Superior Izquierdo -->
          <div class="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
            ${product.badge ? `<span class="badge-tag">${product.badge}</span>` : ''}
            ${product.num ? `<span class="bg-blue-950/80 backdrop-blur-md border border-blue-500/40 text-blue-200 text-xs px-2 py-0.5 rounded-full font-bold">#${product.num}</span>` : ''}
          </div>

          <!-- Si está agotado -->
          ${!isAvailable ? `
            <div class="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20">
              <span class="bg-red-900/90 border border-red-500 text-white font-bold text-xs uppercase px-3 py-1.5 rounded-full tracking-wider shadow-lg">
                <i class="fa-solid fa-ban mr-1"></i> Agotado por hoy
              </span>
            </div>
          ` : ''}

          <!-- Botón de Vista Rápida / Personalizar -->
          <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden sm:block">
            <span class="bg-slate-950/80 backdrop-blur-sm border border-amber-400/40 text-amber-300 text-xs px-2.5 py-1 rounded-lg">
              <i class="fa-solid fa-magnifying-glass-plus mr-1"></i> Detalles
            </span>
          </div>
        </div>

        <!-- Contenido y Descripción -->
        <div class="p-4 flex flex-col flex-1 justify-between bg-slate-900/40">
          <div>
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <h3 
                onclick="openProductCustomizer('${product.id}')"
                class="font-bold text-white text-base md:text-lg leading-snug cursor-pointer hover:text-amber-300 transition-colors"
              >
                ${product.name}
              </h3>
            </div>
            
            <p class="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
              ${product.description || 'Deliciosa especialidad preparada con los mejores ingredientes en Tío Santorini.'}
            </p>

            ${requiresCustomization ? `
              <div class="mb-3 flex flex-wrap gap-1.5">
                ${product.hasContornos ? '<span class="text-[11px] bg-blue-950/70 border border-blue-700/50 text-blue-300 px-2 py-0.5 rounded-md"><i class="fa-solid fa-bowl-rice text-[10px] mr-1"></i>Elige 2 Contornos</span>' : ''}
                ${product.hasProteina ? '<span class="text-[11px] bg-amber-950/60 border border-amber-600/40 text-amber-300 px-2 py-0.5 rounded-md"><i class="fa-solid fa-drumstick-bite text-[10px] mr-1"></i>Elige Proteína</span>' : ''}
              </div>
            ` : ''}
          </div>

          <!-- Pie de Tarjeta: Precio y Botón Agregar -->
          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <div>
              <div class="text-lg md:text-xl font-extrabold text-amber-400">
                $${priceFormatted}
              </div>
              <div class="text-[11px] text-slate-400">
                Bs. ${bcvPriceFormatted}
              </div>
            </div>

            <!-- Botón Acción Táctil -->
            <div>
              ${!isAvailable ? `
                <button disabled class="px-3 py-2 rounded-lg bg-slate-800 text-slate-500 text-xs font-semibold cursor-not-allowed">
                  No disponible
                </button>
              ` : requiresCustomization ? `
                <button 
                  onclick="openProductCustomizer('${product.id}')"
                  class="btn-gold px-4 py-2 sm:py-1.5 rounded-xl text-xs md:text-sm font-black flex items-center gap-1.5 cursor-pointer shadow-md min-h-[38px] active:scale-95 transition-transform"
                >
                  ${inCartQty > 0 ? `<span class="bg-slate-950 text-amber-400 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">${inCartQty}</span>` : '<i class="fa-solid fa-sliders text-xs"></i>'}
                  <span>Elegir</span>
                </button>
              ` : `
                <button 
                  onclick="quickAddToCart('${product.id}')"
                  class="btn-gold px-4 py-2 sm:py-1.5 rounded-xl text-xs md:text-sm font-black flex items-center gap-1.5 cursor-pointer shadow-md min-h-[38px] active:scale-95 transition-transform"
                >
                  ${inCartQty > 0 ? `<span class="bg-slate-950 text-amber-400 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">${inCartQty}</span>` : '<i class="fa-solid fa-plus text-xs"></i>'}
                  <span>Agregar</span>
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function clearSearch() {
  searchQuery = '';
  currentCategory = 'todos';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  renderCategories();
  renderProducts();
}

// --- MODAL DE PERSONALIZACIÓN / DETALLE (CONTORNOS Y PROTEÍNAS) ---
function openProductCustomizer(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentCustomizingProduct = product;
  const modal = document.getElementById('customizer-modal');
  const modalBody = document.getElementById('customizer-body');
  if (!modal || !modalBody) return;

  const priceFormatted = Number(product.price).toFixed(2);
  const bcvPriceFormatted = (product.price * appConfig.bcvRate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  modalBody.innerHTML = `
    <!-- Manilla táctil en móviles para deslizar hacia abajo -->
    <div class="modal-handle-bar sm:hidden -mt-2 mb-3 cursor-pointer" onclick="closeCustomizerModal()"></div>

    <!-- Cabecera de Imagen y Título -->
    <div class="relative h-48 md:h-56 -mx-5 sm:-mx-6 -mt-1 sm:-mt-6 mb-4 overflow-hidden rounded-xl sm:rounded-t-xl bg-slate-950">
      <img 
        src="${product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}" 
        alt="${product.name}" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#091026] via-transparent to-black/40"></div>
      <button 
        onclick="closeCustomizerModal()" 
        class="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 active:scale-90 transition-all border border-white/20 shadow-md"
        aria-label="Cerrar modal"
      >
        <i class="fa-solid fa-xmark text-sm"></i>
      </button>
      <div class="absolute bottom-3 left-4 sm:left-6 right-4 sm:right-6">
        ${product.badge ? `<span class="badge-tag mb-1.5 inline-block">${product.badge}</span>` : ''}
        <h2 class="text-xl md:text-2xl font-extrabold text-white leading-tight drop-shadow-md">${product.name}</h2>
      </div>
    </div>

    <!-- Descripción y Precio -->
    <div class="mb-4">
      <p class="text-sm text-slate-300 leading-relaxed">${product.description || ''}</p>
      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-2xl font-black text-amber-400">$${priceFormatted}</span>
        <span class="text-xs text-slate-400 font-medium">/ Aprox. Bs. ${bcvPriceFormatted}</span>
      </div>
    </div>

    <!-- Opciones de Selección (Contornos / Proteína) -->
    <form id="customizer-form" onsubmit="handleCustomizerSubmit(event)" class="space-y-4">
      
      <!-- Si incluye Contornos -->
      ${product.hasContornos ? `
        <div class="bg-blue-950/40 border border-blue-900/60 p-3.5 rounded-xl">
          <label class="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <i class="fa-solid fa-bowl-rice mr-1.5"></i> Selecciona tus 2 Contornos (Incluidos):
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span class="text-slate-300 font-semibold mb-1 block">Contorno 1:</span>
              <select id="contorno-1" class="santorini-input text-xs" required>
                ${CONTORNOS_OPTIONS.map(c => `<option value="${c}">${c}</option>`).join('')}
              </select>
            </div>
            <div>
              <span class="text-slate-300 font-semibold mb-1 block">Contorno 2:</span>
              <select id="contorno-2" class="santorini-input text-xs" required>
                ${CONTORNOS_OPTIONS.map((c, i) => `<option value="${c}" ${i === 4 ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Si incluye Selección de Proteína (Shawarma o Burger) -->
      ${product.hasProteina ? `
        <div class="bg-amber-950/30 border border-amber-900/60 p-3.5 rounded-xl">
          <label class="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <i class="fa-solid fa-drumstick-bite mr-1.5"></i> Elige tu Proteína de preferencia:
          </label>
          <div class="grid grid-cols-2 gap-2">
            ${(product.category === 'shawarmas' ? PROTEINAS_SHAWARMA : PROTEINAS_BURGER).map((prot, idx) => `
              <label class="custom-option-label text-xs">
                <input type="radio" name="custom-proteina" value="${prot}" ${idx === 0 ? 'checked' : ''} class="mr-2 accent-amber-400">
                <span>${prot}</span>
              </label>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Notas o instrucciones especiales para la cocina -->
      <div>
        <label class="block text-xs font-bold text-slate-300 mb-1.5">
          <i class="fa-solid fa-pen mr-1 text-gold"></i> Instrucciones especiales o término de carne:
        </label>
        <input 
          type="text" 
          id="custom-notes" 
          placeholder="Ej: Término 3/4, salsa de ajo aparte, sin cebolla..."
          class="santorini-input text-xs py-2"
        />
      </div>

      <!-- Selector de Cantidad y Botón de Confirmación -->
      <div class="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-1">
          <button type="button" onclick="adjustModalQty(-1)" class="w-8 h-8 rounded-md bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-sm font-bold cursor-pointer">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span id="modal-qty" class="w-8 text-center font-bold text-white text-base">1</span>
          <button type="button" onclick="adjustModalQty(1)" class="w-8 h-8 rounded-md bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center text-sm font-bold cursor-pointer">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>

        <button type="submit" class="btn-gold flex-1 py-3 px-4 rounded-xl text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-lg">
          <i class="fa-solid fa-cart-plus"></i>
          <span>Agregar al Pedido</span>
        </button>
      </div>

    </form>
  `;

  modal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeCustomizerModal() {
  const modal = document.getElementById('customizer-modal');
  if (modal) modal.classList.remove('open');
  document.body.classList.remove('modal-open');
  currentCustomizingProduct = null;
}

let modalCurrentQty = 1;

function adjustModalQty(delta) {
  const qtyEl = document.getElementById('modal-qty');
  if (!qtyEl) return;
  modalCurrentQty = Math.max(1, modalCurrentQty + delta);
  qtyEl.textContent = modalCurrentQty;
}

function handleCustomizerSubmit(event) {
  event.preventDefault();
  if (!currentCustomizingProduct) return;

  const form = event.target;
  let customDetails = [];

  // Recoger contornos
  const c1 = form.querySelector('#contorno-1');
  const c2 = form.querySelector('#contorno-2');
  if (c1 && c2) {
    customDetails.push(`Contornos: ${c1.value} y ${c2.value}`);
  }

  // Recoger proteína
  const selectedProt = form.querySelector('input[name="custom-proteina"]:checked');
  if (selectedProt) {
    customDetails.push(`Proteína: ${selectedProt.value}`);
  }

  // Recoger notas
  const notesInput = form.querySelector('#custom-notes');
  if (notesInput && notesInput.value.trim()) {
    customDetails.push(`Nota: "${notesInput.value.trim()}"`);
  }

  const customText = customDetails.join(' | ');

  addToCart(currentCustomizingProduct, modalCurrentQty, customText);
  closeCustomizerModal();
  modalCurrentQty = 1;
}

// --- AGREGADO RÁPIDO AL CARRITO (Para productos sin opciones obligatorias) ---
function quickAddToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  addToCart(product, 1, '');
}

// --- GESTIÓN DEL CARRITO ---
function addToCart(product, quantity = 1, customOptions = '') {
  // Clave única considerando opciones para no fusionar pedidos con notas distintas
  const cartKey = `${product.id}__${customOptions}`;
  const existingIndex = cart.findIndex(item => item.cartKey === cartKey);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      cartKey,
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: quantity,
      customOptions: customOptions
    });
  }

  saveCart();
  renderProducts(); // Actualizar badges de conteo en tarjetas
  showToast(`¡${product.name} agregado al pedido!`);

  // Efecto visual en botón flotante
  const cartBtn = document.getElementById('floating-cart-btn');
  if (cartBtn) {
    cartBtn.classList.add('pulse-badge');
    setTimeout(() => cartBtn.classList.remove('pulse-badge'), 400);
  }
}

function updateCartItemQty(cartKey, delta) {
  const index = cart.findIndex(item => item.cartKey === cartKey);
  if (index === -1) return;

  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  renderProducts();
}

function removeCartItem(cartKey) {
  cart = cart.filter(item => item.cartKey !== cartKey);
  saveCart();
  renderProducts();
  showToast('Producto eliminado del pedido');
}

function clearCart() {
  if (cart.length === 0) return;
  if (confirm('¿Deseas vaciar todos los productos de tu pedido?')) {
    cart = [];
    saveCart();
    renderProducts();
    showToast('Pedido vaciado');
  }
}

// --- ACTUALIZAR INTERFAZ DEL CARRITO ---
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalUSD = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subtotalVES = subtotalUSD * appConfig.bcvRate;

  // Actualizar badges flotantes y barras
  const countEls = document.querySelectorAll('.cart-count-badge');
  countEls.forEach(el => {
    el.textContent = totalItems;
    el.classList.toggle('hidden', totalItems === 0);
  });

  const totalUSDEls = document.querySelectorAll('.cart-total-usd');
  totalUSDEls.forEach(el => el.textContent = `$${subtotalUSD.toFixed(2)}`);

  const totalVESEls = document.querySelectorAll('.cart-total-ves');
  totalVESEls.forEach(el => el.textContent = `Bs. ${subtotalVES.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

  // Renderizar lista en el Drawer
  const itemsContainer = document.getElementById('cart-items-list');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartFooter = document.getElementById('cart-footer');

  if (itemsContainer && cartEmptyState && cartFooter) {
    if (cart.length === 0) {
      itemsContainer.innerHTML = '';
      cartEmptyState.classList.remove('hidden');
      cartFooter.classList.add('opacity-50', 'pointer-events-none');
    } else {
      cartEmptyState.classList.add('hidden');
      cartFooter.classList.remove('opacity-50', 'pointer-events-none');

      itemsContainer.innerHTML = cart.map(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        return `
          <div class="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex gap-3 items-center">
            <img 
              src="${item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}" 
              alt="${item.name}" 
              class="w-14 h-14 rounded-lg object-cover bg-slate-950 flex-shrink-0 border border-slate-800"
            />
            <div class="flex-1 min-w-0">
              <h4 class="text-xs md:text-sm font-bold text-white truncate">${item.name}</h4>
              <div class="text-xs text-amber-400 font-semibold mb-1">$${item.price.toFixed(2)} c/u</div>
              ${item.customOptions ? `<p class="text-[11px] text-slate-400 line-clamp-1 italic">${item.customOptions}</p>` : ''}
              
              <!-- Controles de Cantidad Táctiles -->
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center gap-2 bg-slate-950 rounded-lg p-1 border border-slate-800">
                  <button onclick="updateCartItemQty('${item.cartKey}', -1)" class="w-7 h-7 sm:w-6 sm:h-6 rounded-md bg-slate-800 hover:bg-slate-700 active:scale-90 text-white flex items-center justify-center text-xs font-bold" aria-label="Disminuir cantidad">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <span class="w-6 text-center text-xs font-extrabold text-white">${item.quantity}</span>
                  <button onclick="updateCartItemQty('${item.cartKey}', 1)" class="w-7 h-7 sm:w-6 sm:h-6 rounded-md bg-slate-800 hover:bg-slate-700 active:scale-90 text-white flex items-center justify-center text-xs font-bold" aria-label="Aumentar cantidad">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
                
                <span class="text-xs sm:text-sm font-extrabold text-amber-400">$${itemTotal}</span>
              </div>
            </div>

            <!-- Botón Eliminar Táctil -->
            <button onclick="removeCartItem('${item.cartKey}')" class="text-slate-500 hover:text-red-400 p-2.5 transition-colors active:scale-90" title="Eliminar del pedido" aria-label="Eliminar producto">
              <i class="fa-solid fa-trash-can text-sm sm:text-xs"></i>
            </button>
          </div>
        `;
      }).join('');
    }
  }
}

function handleBackdropClick(event, modalId) {
  if (event.target.id === modalId) {
    if (modalId === 'customizer-modal') closeCustomizerModal();
    if (modalId === 'admin-modal') closeAdminModal();
    if (modalId === 'product-form-modal') closeProductFormModal();
    if (modalId === 'show-form-modal') closeShowFormModal();
  }
}

// Drawer Controls
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.classList.add('modal-open');
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.classList.remove('modal-open');
  }
}

// Alternar campos de Delivery vs Mesa vs Retiro
function onOrderTypeChange(type) {
  const deliveryFields = document.getElementById('field-delivery-address');
  const tableFields = document.getElementById('field-table-number');
  
  if (deliveryFields) deliveryFields.classList.toggle('hidden', type !== 'delivery');
  if (tableFields) tableFields.classList.toggle('hidden', type !== 'mesa');
}

// --- ENVIAR PEDIDO POR WHATSAPP ---
function sendOrderToWhatsApp() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío. Por favor selecciona al menos un platillo.');
    return;
  }

  // Validaciones del formulario
  const clientName = document.getElementById('checkout-name')?.value.trim();
  const clientPhone = document.getElementById('checkout-phone')?.value.trim();
  const orderType = document.querySelector('input[name="order-type"]:checked')?.value || 'delivery';
  const paymentMethod = document.getElementById('checkout-payment')?.value || 'Pago Móvil';
  const deliveryAddress = document.getElementById('checkout-address')?.value.trim();
  const tableNumber = document.getElementById('checkout-table')?.value.trim();
  const generalNotes = document.getElementById('checkout-notes')?.value.trim();

  if (!clientName) {
    alert('Por favor ingresa tu Nombre y Apellido para poder registrar tu pedido.');
    document.getElementById('checkout-name')?.focus();
    return;
  }

  if (orderType === 'delivery' && !deliveryAddress) {
    alert('Por favor indícanos la dirección de entrega para el Delivery en San Diego o zonas cercanas.');
    document.getElementById('checkout-address')?.focus();
    return;
  }

  if (orderType === 'mesa' && !tableNumber) {
    alert('Por favor indícanos el número de mesa en el restaurante.');
    document.getElementById('checkout-table')?.focus();
    return;
  }

  const subtotalUSD = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const subtotalVES = subtotalUSD * appConfig.bcvRate;

  // Etiqueta de tipo de pedido
  let orderTypeLabel = '🛵 Delivery a Domicilio';
  if (orderType === 'llevar') orderTypeLabel = '🛍️ Para Llevar / Pick Up';
  if (orderType === 'mesa') orderTypeLabel = `🍽️ En el Restaurante (Mesa #${tableNumber})`;

  // Construcción del Mensaje con Formato Elegante
  let msg = `🌟 *NUEVO PEDIDO - TÍO SANTORINI* 🌟\n`;
  msg += `_San Diego, Carabobo_\n`;
  msg += `--------------------------------------\n`;
  msg += `👤 *Cliente:* ${clientName}\n`;
  if (clientPhone) msg += `📞 *Teléfono:* ${clientPhone}\n`;
  msg += `📍 *Tipo de Pedido:* ${orderTypeLabel}\n`;
  if (orderType === 'delivery') msg += `🏠 *Dirección de Entrega:* ${deliveryAddress}\n`;
  msg += `💳 *Método de Pago:* ${paymentMethod}\n`;
  if (generalNotes) msg += `📝 *Observaciones:* ${generalNotes}\n`;
  msg += `--------------------------------------\n`;
  msg += `🛒 *DETALLE DEL PEDIDO:*\n\n`;

  cart.forEach(item => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    msg += `• *${item.quantity}x ${item.name}* - $${itemTotal} USD\n`;
    if (item.customOptions) {
      msg += `   ↳ _${item.customOptions}_\n`;
    }
  });

  msg += `--------------------------------------\n`;
  msg += `💰 *TOTAL A PAGAR:* $${subtotalUSD.toFixed(2)} USD\n`;
  msg += `🇻🇪 *Ref. en Bolívares (Tasa BCV):* Bs. ${subtotalVES.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
  msg += `--------------------------------------\n`;
  msg += `⏰ *Hora:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n`;
  msg += `¡Hola Tío Santorini! Deseo confirmar este pedido. Quedo atento a su respuesta para el pago.`;

  // Limpiar número de WhatsApp para enlace
  let targetPhone = appConfig.phone.replace(/[^0-9]/g, '');
  if (!targetPhone.startsWith('58')) {
    targetPhone = '58' + targetPhone;
  }

  const encodedUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;

  // Abrir WhatsApp en nueva pestaña
  window.open(encodedUrl, '_blank');

  // Limpiar carrito tras completar
  cart = [];
  saveCart();
  closeCartDrawer();
  showToast('¡Pedido enviado con éxito a WhatsApp!');
}

// --- NOTIFICACIÓN TOAST ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-check text-gold"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// --- PANEL DE ADMINISTRACIÓN (EDITAR, AGREGAR, GESTIONAR) ---
function openAdminModal() {
  const modal = document.getElementById('admin-modal');
  if (!modal) return;

  if (!isAdminAuthenticated) {
    // Solicitar PIN
    const enteredPin = prompt('Introduce el PIN de Administrador (Por defecto: 1234):');
    if (enteredPin === appConfig.pin || enteredPin === '1234') {
      isAdminAuthenticated = true;
    } else {
      alert('PIN Incorrecto. Acceso denegado.');
      return;
    }
  }

  renderAdminView();
  modal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeAdminModal() {
  const modal = document.getElementById('admin-modal');
  if (modal) modal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

function renderAdminView() {
  updateAdminStats();
  renderAdminProductsTable();
  renderAdminShows();
}

function updateAdminStats() {
  const totalCount = products.length;
  const availableCount = products.filter(p => p.available !== false).length;
  const outOfStockCount = totalCount - availableCount;

  const totalEl = document.getElementById('admin-stat-total');
  const availEl = document.getElementById('admin-stat-available');
  const outEl = document.getElementById('admin-stat-out');

  if (totalEl) totalEl.textContent = totalCount;
  if (availEl) availEl.textContent = availableCount;
  if (outEl) outEl.textContent = outOfStockCount;
}

function renderAdminProductsTable(searchTerm = '') {
  const tbody = document.getElementById('admin-products-tbody');
  if (!tbody) return;

  let list = [...products];
  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  tbody.innerHTML = list.map(product => {
    const isAvail = product.available !== false;
    return `
      <tr class="border-b border-slate-800 hover:bg-slate-800/40 text-xs md:text-sm">
        <td class="p-3">
          <div class="flex items-center gap-3">
            <img 
              src="${product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}" 
              alt="${product.name}" 
              class="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-700 flex-shrink-0"
              onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';"
            />
            <div class="min-w-0">
              <div class="font-bold text-white truncate">${product.name}</div>
              <div class="text-[11px] text-slate-400 capitalize">${product.category} ${product.badge ? `• <span class="text-amber-400 font-semibold">${product.badge}</span>` : ''}</div>
            </div>
          </div>
        </td>
        <td class="p-3 font-extrabold text-amber-400">$${Number(product.price).toFixed(2)}</td>
        <td class="p-3">
          <label class="switch">
            <input type="checkbox" ${isAvail ? 'checked' : ''} onchange="toggleProductAvailability('${product.id}', this.checked)">
            <span class="slider"></span>
          </label>
        </td>
        <td class="p-3 text-right space-x-1">
          <button onclick="openEditProductModal('${product.id}')" class="px-2.5 py-1.5 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-300 font-semibold text-xs transition-colors" title="Editar platillo">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button onclick="deleteProduct('${product.id}')" class="px-2.5 py-1.5 rounded bg-red-900/40 hover:bg-red-800 text-red-300 font-semibold text-xs transition-colors" title="Eliminar platillo">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Alternar disponibilidad (Agotado / Disponible)
function toggleProductAvailability(productId, available) {
  const prod = products.find(p => p.id === productId);
  if (prod) {
    prod.available = available;
    saveProducts();
    renderProducts();
    updateAdminStats();
    showToast(`${prod.name} ahora está ${available ? 'Disponible' : 'Agotado'}`);
  }
}

// Eliminar producto
function deleteProduct(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  if (confirm(`¿Estás seguro de que deseas eliminar permanentemente "${prod.name}" del menú?`)) {
    products = products.filter(p => p.id !== productId);
    saveProducts();
    renderProducts();
    renderAdminView();
    showToast('Platillo eliminado con éxito');
  }
}

// --- CREAR O EDITAR PRODUCTO (MODAL INTERNO) ---
function openNewProductModal() {
  editingProductId = null;
  const modal = document.getElementById('product-form-modal');
  const title = document.getElementById('product-form-title');
  const form = document.getElementById('product-edit-form');
  if (!modal || !form) return;

  title.textContent = 'Agregar Nuevo Platillo';
  form.reset();

  // Categorías en select
  populateCategorySelect('product-category-input');

  document.getElementById('product-id-input').value = '';
  document.getElementById('image-preview').src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
  document.getElementById('product-available-input').checked = true;

  modal.classList.add('open');
}

function openEditProductModal(productId) {
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  editingProductId = productId;
  const modal = document.getElementById('product-form-modal');
  const title = document.getElementById('product-form-title');
  if (!modal) return;

  title.textContent = `Editar: ${prod.name}`;
  populateCategorySelect('product-category-input', prod.category);

  document.getElementById('product-id-input').value = prod.id;
  document.getElementById('product-name-input').value = prod.name;
  document.getElementById('product-price-input').value = prod.price;
  document.getElementById('product-description-input').value = prod.description || '';
  document.getElementById('product-image-input').value = prod.image || '';
  document.getElementById('product-badge-input').value = prod.badge || '';
  document.getElementById('product-contornos-input').checked = !!prod.hasContornos;
  document.getElementById('product-proteina-input').checked = !!prod.hasProteina;
  document.getElementById('product-available-input').checked = prod.available !== false;

  updateImagePreview(prod.image);

  modal.classList.add('open');
}

function closeProductFormModal() {
  const modal = document.getElementById('product-form-modal');
  if (modal) modal.classList.remove('open');
  editingProductId = null;
}

function populateCategorySelect(selectId, selectedValue = '') {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = INITIAL_CATEGORIES
    .filter(c => c.id !== 'todos')
    .map(c => `<option value="${c.id}" ${c.id === selectedValue ? 'selected' : ''}>${c.name}</option>`)
    .join('');
}

function updateImagePreview(url) {
  const preview = document.getElementById('image-preview');
  if (preview) {
    preview.src = url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
  }
}

// Guardar formulario de producto (Nuevo o Editado)
function handleProductFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('product-name-input').value.trim();
  const category = document.getElementById('product-category-input').value;
  const price = parseFloat(document.getElementById('product-price-input').value);
  const description = document.getElementById('product-description-input').value.trim();
  const image = document.getElementById('product-image-input').value.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
  const badge = document.getElementById('product-badge-input').value.trim();
  const hasContornos = document.getElementById('product-contornos-input').checked;
  const hasProteina = document.getElementById('product-proteina-input').checked;
  const available = document.getElementById('product-available-input').checked;

  if (!name || isNaN(price) || price < 0) {
    alert('Por favor completa un nombre válido y un precio mayor o igual a 0.');
    return;
  }

  if (editingProductId) {
    // Editar existente
    const prodIndex = products.findIndex(p => p.id === editingProductId);
    if (prodIndex > -1) {
      products[prodIndex] = {
        ...products[prodIndex],
        name,
        category,
        price,
        description,
        image,
        badge,
        hasContornos,
        hasProteina,
        available
      };
      showToast(`¡"${name}" actualizado con éxito!`);
    }
  } else {
    // Crear nuevo producto
    const newProduct = {
      id: 'custom-' + Date.now(),
      num: products.length + 1,
      name,
      category,
      price,
      description,
      image,
      badge,
      hasContornos,
      hasProteina,
      available
    };
    products.unshift(newProduct);
    showToast(`¡"${name}" agregado al menú!`);
  }

  saveProducts();
  renderProducts();
  renderAdminView();
  closeProductFormModal();
}

// Configuración de Fotos Predeterminadas Rápidas en el formulario
function setPresetImage(url) {
  const input = document.getElementById('product-image-input');
  if (input) {
    input.value = url;
    updateImagePreview(url);
  }
}

// Guardar Configuración de Tasa BCV y WhatsApp
function saveAdminSettings() {
  const newPhone = document.getElementById('admin-phone-input').value.trim();
  const newBcv = parseFloat(document.getElementById('admin-bcv-input').value);

  if (newPhone) {
    appConfig.phone = newPhone;
    appConfig.phoneDisplay = newPhone;
  }
  if (!isNaN(newBcv) && newBcv > 0) {
    appConfig.bcvRate = newBcv;
  }

  saveConfig();
  renderProducts();
  updateCartUI();
  showToast('Configuración y Tasa BCV actualizadas');
}

// --- GESTIÓN DE SHOWS EN VIVO EN EL ADMIN ---
function renderAdminShows() {
  const container = document.getElementById('admin-shows-list');
  if (!container) return;

  container.innerHTML = shows.map((show) => `
    <div class="bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between gap-2.5">
      <div class="flex items-center gap-2.5 min-w-0">
        <img 
          src="${show.image}" 
          alt="${show.title}" 
          class="w-12 h-10 rounded-lg object-cover bg-slate-900 border border-slate-700 flex-shrink-0"
          onerror="this.src='https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80';"
        />
        <div class="min-w-0">
          <div class="font-bold text-white text-xs truncate">${show.title}</div>
          <div class="text-[10px] text-amber-400 font-semibold">${show.schedule}</div>
        </div>
      </div>

      <div class="flex items-center gap-2 flex-shrink-0">
        <label class="switch" title="Mostrar/Ocultar show">
          <input type="checkbox" ${show.active !== false ? 'checked' : ''} onchange="toggleShowActive('${show.id}', this.checked)">
          <span class="slider"></span>
        </label>
        <button 
          onclick="openEditShowModal('${show.id}')" 
          class="px-2.5 py-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-blue-300 font-semibold text-xs transition-colors cursor-pointer active:scale-95"
          title="Editar este show"
        >
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function toggleShowActive(showId, active) {
  const show = shows.find(s => s.id === showId);
  if (show) {
    show.active = active;
    saveShows();
    renderShowSlider();
    showToast(`Show "${show.title}" ${active ? 'activado' : 'ocultado'}`);
  }
}

function openEditShowModal(showId) {
  const show = shows.find(s => s.id === showId);
  if (!show) return;

  editingShowId = showId;
  const modal = document.getElementById('show-form-modal');
  if (!modal) return;

  document.getElementById('show-id-input').value = show.id;
  document.getElementById('show-title-input').value = show.title;
  document.getElementById('show-day-input').value = show.day;
  document.getElementById('show-schedule-input').value = show.schedule;
  document.getElementById('show-description-input').value = show.description || '';
  document.getElementById('show-image-input').value = show.image;
  document.getElementById('show-badge-input').value = show.badge || '';
  document.getElementById('show-active-input').checked = show.active !== false;

  updateShowImagePreview(show.image);

  modal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeShowFormModal() {
  const modal = document.getElementById('show-form-modal');
  if (modal) modal.classList.remove('open');
  editingShowId = null;

  const adminModal = document.getElementById('admin-modal');
  if (!adminModal || !adminModal.classList.contains('open')) {
    document.body.classList.remove('modal-open');
  }
}

function updateShowImagePreview(url) {
  const preview = document.getElementById('show-image-preview');
  if (preview) {
    preview.src = url || 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80';
  }
}

function setShowPresetImage(url) {
  const input = document.getElementById('show-image-input');
  if (input) {
    input.value = url;
    updateShowImagePreview(url);
  }
}

function handleShowFormSubmit(event) {
  event.preventDefault();
  if (!editingShowId) return;

  const showIndex = shows.findIndex(s => s.id === editingShowId);
  if (showIndex === -1) return;

  const title = document.getElementById('show-title-input').value.trim();
  const day = document.getElementById('show-day-input').value.trim();
  const schedule = document.getElementById('show-schedule-input').value.trim();
  const description = document.getElementById('show-description-input').value.trim();
  const image = document.getElementById('show-image-input').value.trim();
  const badge = document.getElementById('show-badge-input').value.trim();
  const active = document.getElementById('show-active-input').checked;

  shows[showIndex] = {
    ...shows[showIndex],
    title,
    day,
    schedule,
    description,
    image,
    badge,
    active
  };

  saveShows();
  renderShowSlider();
  renderAdminShows();
  closeShowFormModal();
  showToast(`¡Show "${title}" actualizado con éxito!`);
}

// Restaurar Menú de Fábrica
function resetMenuToDefault() {
  if (confirm('¿Estás seguro de que deseas restablecer todo el menú y los shows en vivo a los valores originales de Tío Santorini? Se perderán las modificaciones personalizadas.')) {
    products = [...INITIAL_PRODUCTS];
    shows = typeof INITIAL_SHOWS !== 'undefined' ? [...INITIAL_SHOWS] : [];
    saveProducts();
    saveShows();
    renderProducts();
    renderShowSlider();
    renderAdminView();
    showToast('Menú y shows restablecidos al original');
  }
}

// Exportar datos a JSON
function exportMenuJSON() {
  const exportPayload = {
    products,
    shows,
    config: appConfig
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `menu_tio_santorini_${Date.now()}.json`);
  dlAnchorElem.click();
}

// Importar datos desde JSON
function importMenuJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        products = imported;
        saveProducts();
      } else if (imported.products) {
        products = imported.products;
        if (imported.shows) shows = imported.shows;
        saveProducts();
        saveShows();
      }
      renderProducts();
      renderShowSlider();
      renderAdminView();
      showToast('Datos importados correctamente');
    } catch (err) {
      alert('Error al leer el archivo JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// --- EVENT LISTENERS GENERALES ---
function setupEventListeners() {
  // Búsqueda en tiempo real
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Búsqueda dentro del admin
  const adminSearch = document.getElementById('admin-search-input');
  if (adminSearch) {
    adminSearch.addEventListener('input', (e) => {
      renderAdminProductsTable(e.target.value);
    });
  }

  // Preview de imagen en formulario de producto
  const imgInput = document.getElementById('product-image-input');
  if (imgInput) {
    imgInput.addEventListener('input', (e) => {
      updateImagePreview(e.target.value);
    });
  }

  // Preview de imagen en formulario de show
  const showImgInput = document.getElementById('show-image-input');
  if (showImgInput) {
    showImgInput.addEventListener('input', (e) => {
      updateShowImagePreview(e.target.value);
    });
  }

  // Cerrar modales con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCustomizerModal();
      closeCartDrawer();
      closeProductFormModal();
      closeShowFormModal();
    }
  });
}
