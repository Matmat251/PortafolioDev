/**
 * ============================================================================
 * PORTAFOLIO PERSONAL - MATHEW TENORIO
 * ============================================================================
 * 
 * Archivo: main.js
 * Autor: Mathew Tenorio
 * Carrera: Ingeniería de Sistemas
 * 
 * Descripción:
 * Este archivo contiene toda la lógica JavaScript del portafolio.
 * Incluye funcionalidades como:
 * - Navegación suave (smooth scroll)
 * - Efectos de scroll en el navbar
 * - Inicialización de componentes Materialize
 * - Animaciones al hacer scroll
 * 
 * Dependencias:
 * - Bootstrap 5.3.2 (para el navbar collapse)
 * - Materialize CSS 1.0.0 (para efectos waves)
 * 
 * ============================================================================
 */

// ============================================================================
// CONFIGURACIÓN INICIAL
// Esperar a que el DOM esté completamente cargado antes de ejecutar scripts
// ============================================================================
document.addEventListener('DOMContentLoaded', function () {

    // Inicializar todos los módulos
    initNavbar();
    initSmoothScroll();
    initMaterialize();
    initScrollAnimations();
    initHamburgerMenu(); // Inicializar menú hamburguesa personalizado

    // Mensaje de bienvenida en consola (para desarrollo)
    console.log('🚀 Portafolio de Mathew Tenorio cargado correctamente');
    console.log('📧 Contacto: mathewteno25@hotmail.com');
});

// ============================================================================
// MÓDULO: NAVBAR
// Maneja el comportamiento del navbar al hacer scroll
// ============================================================================

/**
 * Inicializa el comportamiento del navbar
 * - Agrega clase 'scrolled' cuando el usuario hace scroll
 * - Cambia la apariencia del navbar para mejor visibilidad
 */
function initNavbar() {
    // Obtener referencia al navbar
    const navbar = document.querySelector('.navbar-custom');

    // Si no existe el navbar, salir de la función
    if (!navbar) {
        console.warn('⚠️ Navbar no encontrado');
        return;
    }

    // Umbral de scroll (en píxeles) para activar el cambio
    const scrollThreshold = 50;

    /**
     * Función que se ejecuta en cada evento de scroll
     * Verifica la posición del scroll y actualiza el navbar
     */
    function handleScroll() {
        // Obtener posición actual del scroll
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Agregar o remover clase según la posición
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Registrar el event listener para el scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Ejecutar una vez al cargar para verificar posición inicial
    handleScroll();
}

// ============================================================================
// MÓDULO: SMOOTH SCROLL
// Implementa navegación suave al hacer clic en enlaces internos
// ============================================================================

/**
 * Inicializa el scroll suave para enlaces de navegación
 * Mejora la experiencia de usuario al navegar entre secciones
 */
function initSmoothScroll() {
    // Seleccionar todos los enlaces que apuntan a secciones internas
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            // Obtener el href del enlace
            const targetId = this.getAttribute('href');

            // Ignorar si es solo '#'
            if (targetId === '#') return;

            // Buscar el elemento destino
            const targetElement = document.querySelector(targetId);

            // Si existe el elemento, hacer scroll suave
            if (targetElement) {
                // Prevenir comportamiento por defecto
                event.preventDefault();

                // Calcular posición considerando el navbar fijo
                const navbarHeight = document.querySelector('.navbar-custom').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                // Ejecutar scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Cerrar el menú móvil si está abierto (Bootstrap)
                closeNavbarMobile();
            }
        });
    });
}

/**
 * Cierra el menú de navegación móvil después de hacer clic
 * Mejora la UX en dispositivos móviles
 */
function closeNavbarMobile() {
    // Buscar el collapse del navbar
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Si está abierto, cerrarlo
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Remover la clase 'show' directamente
        navbarCollapse.classList.remove('show');

        // Actualizar el atributo aria del toggler
        if (navbarToggler) {
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
    }
}

/**
 * Inicializa el menú hamburguesa para evitar conflictos con Materialize
 * Maneja el toggle de forma completamente manual sin depender de Bootstrap
 */
function initHamburgerMenu() {
    const navbarToggler = document.getElementById('hamburgerBtn');
    const navbarCollapse = document.getElementById('navbarMain');

    if (navbarToggler && navbarCollapse) {
        // Función para abrir el menú
        function openMenu() {
            navbarCollapse.classList.remove('collapse');
            navbarCollapse.classList.add('show');
            navbarToggler.setAttribute('aria-expanded', 'true');
        }

        // Función para cerrar el menú
        function closeMenu() {
            navbarCollapse.classList.add('collapse');
            navbarCollapse.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        }

        // Click en el botón hamburguesa
        navbarToggler.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (navbarCollapse.classList.contains('show')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Cerrar el menú al hacer clic en un enlace
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                // Solo cerrar en móvil
                if (window.innerWidth < 992) {
                    closeMenu();
                }
            });
        });

        // Cerrar el menú al hacer clic fuera
        document.addEventListener('click', function (e) {
            if (window.innerWidth < 992) {
                if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                    if (navbarCollapse.classList.contains('show')) {
                        closeMenu();
                    }
                }
            }
        });

        console.log('✅ Menú hamburguesa inicializado correctamente');
    }
}

// ============================================================================
// MÓDULO: MATERIALIZE
// Inicializa los componentes de Materialize CSS
// ============================================================================

/**
 * Inicializa los componentes de Materialize CSS
 * Principalmente el efecto 'waves' en botones
 */
function initMaterialize() {
    // Verificar si Materialize está disponible
    if (typeof M !== 'undefined') {
        // Inicializar todos los componentes automáticamente
        M.AutoInit();

        console.log('✅ Materialize inicializado correctamente');
    } else {
        console.warn('⚠️ Materialize no está disponible');
    }
}

// ============================================================================
// MÓDULO: ANIMACIONES DE SCROLL
// Animaciones que se activan cuando los elementos entran en viewport
// ============================================================================

/**
 * Inicializa las animaciones basadas en scroll
 * Usa Intersection Observer API para mejor rendimiento
 */
function initScrollAnimations() {
    // Verificar soporte de Intersection Observer
    if (!('IntersectionObserver' in window)) {
        console.warn('⚠️ Intersection Observer no soportado');
        return;
    }

    // Configuración del observer
    const observerOptions = {
        root: null,                    // Viewport como contenedor
        rootMargin: '0px',             // Sin margen adicional
        threshold: 0.1                 // 10% visible para activar
    };

    /**
     * Callback que se ejecuta cuando el elemento entra en viewport
     */
    function handleIntersection(entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Agregar clase de animación
                entry.target.classList.add('animate-fade-in-up');

                // Dejar de observar este elemento
                observer.unobserve(entry.target);
            }
        });
    }

    // Crear el observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Elementos a observar (tarjetas y secciones)
    const animatedElements = document.querySelectorAll('.skill-card, .project-card');

    // Registrar cada elemento
    animatedElements.forEach(function (element) {
        // Ocultar inicialmente
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';

        // Comenzar a observar
        observer.observe(element);
    });
}

// ============================================================================
// FUNCIONES DE UTILIDAD
// Funciones auxiliares reutilizables
// ============================================================================

/**
 * Función de debounce para optimizar eventos frecuentes
 * Limita la frecuencia de ejecución de una función
 * 
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en milisegundos
 * @returns {Function} - Función con debounce aplicado
 */
function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        // Función que se ejecutará después del delay
        const later = function () {
            clearTimeout(timeout);
            func.apply(this, args);
        };

        // Resetear el timer
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Detecta si el usuario está en un dispositivo móvil
 * Útil para adaptar comportamientos según dispositivo
 * 
 * @returns {boolean} - true si es móvil, false si no
 */
function isMobileDevice() {
    return window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ============================================================================
// EVENT LISTENERS GLOBALES
// Eventos que afectan a toda la página
// ============================================================================

// Manejar resize de ventana con debounce para rendimiento
window.addEventListener('resize', debounce(function () {
    // Actualizar comportamientos según nuevo tamaño
    console.log('📐 Ventana redimensionada:', window.innerWidth + 'x' + window.innerHeight);
}, 250));

// Log cuando la página está completamente cargada (incluyendo imágenes)
window.addEventListener('load', function () {
    console.log('📄 Todos los recursos cargados');

    // Inicializar el lightbox después de que carguen las imágenes
    initLightbox();
});

// ============================================================================
// MÓDULO: LIGHTBOX GALLERY
// Galería modal para mostrar múltiples imágenes de proyectos
// ============================================================================

/**
 * Configuración de galerías de proyectos
 * Cada galería tiene un ID y un array de imágenes con título
 */
const galleryData = {
    hssc: {
        name: 'HSSC GROUP',
        images: [
            { src: 'img/hs-courrier-1.png', title: 'Página Principal - Conócenos' },
            { src: 'img/hs-courrier-2.png', title: 'Sección de Servicios' },
            { src: 'img/hs-courrier-3.png', title: 'Tiendas Recomendadas' },
            { src: 'img/hs-courrier-4.png', title: 'Formulario de Contacto' }
        ]
    },
    fastwheels: {
        name: 'Fast Wheels',
        images: [
            { src: 'img/fast-wheels-1.png', title: 'Catálogo de Vehículos' },
            { src: 'img/fast-wheels-2.png', title: 'Login de Usuario' },
            { src: 'img/fast-wheels-3.png', title: 'Registro de Cliente' },
            { src: 'img/fast-wheels-4.png', title: 'Portal Corporativo' },
            { src: 'img/fast-wheels-5.png', title: 'Mis Reservas' },
            { src: 'img/fast-wheels-6.png', title: 'Perfil de Usuario' },
            { src: 'img/fast-wheels-7.png', title: 'Formulario de Reserva' },
            { src: 'img/fast-wheels-8.png', title: 'Pago con Tarjeta' },
            { src: 'img/fast-wheels-9.png', title: 'Panel de Control Admin' },
            { src: 'img/fast-wheels-10.png', title: 'Gestión de Vehículos' },
            { src: 'img/fast-wheels-11.png', title: 'Registrar Vehículo' },
            { src: 'img/fast-wheels-12.png', title: 'Gestión de Reservas' },
            { src: 'img/fast-wheels-13.png', title: 'Directorio de Clientes' },
            { src: 'img/fast-wheels-14.png', title: 'Reportes y Análisis' }
        ]
    },
    ultratech: {
        name: 'UltraTech',
        images: [
            { src: 'img/ultratech-1.png', title: 'Login - Servicio Técnico' },
            { src: 'img/ultratech-2.png', title: 'Dashboard Cliente' },
            { src: 'img/ultratech-3.png', title: 'Boleta Electrónica' },
            { src: 'img/ultratech-4.png', title: 'Lista de Tickets' },
            { src: 'img/ultratech-5.png', title: 'Crear Ticket' },
            { src: 'img/ultratech-6.png', title: 'Crear Usuario' },
            { src: 'img/ultratech-7.png', title: 'Lista de Tickets Admin' },
            { src: 'img/ultratech-8.png', title: 'Menú Principal' },
            { src: 'img/ultratech-9.png', title: 'Login Admin' },
            { src: 'img/ultratech-10.png', title: 'Modificar Ticket' },
            { src: 'img/ultratech-11.png', title: 'Modificar Usuario' }
        ]
    }
};

/**
 * Inicializa el sistema de lightbox
 * Gestiona apertura, cierre, navegación y thumbnails
 */
function initLightbox() {
    // Elementos del DOM
    const modal = document.getElementById('lightboxModal');
    const overlay = modal?.querySelector('.lightbox-overlay');
    const closeBtn = modal?.querySelector('.lightbox-close');
    const prevBtn = modal?.querySelector('.lightbox-prev');
    const nextBtn = modal?.querySelector('.lightbox-next');
    const mainImage = modal?.querySelector('.lightbox-image');
    const titleEl = modal?.querySelector('.lightbox-title');
    const counterEl = modal?.querySelector('.lightbox-counter');
    const thumbnailsContainer = document.getElementById('lightboxThumbnails');

    // Estado actual
    let currentGallery = null;
    let currentIndex = 0;

    // Si no existe el modal, salir
    if (!modal) {
        console.warn('⚠️ Lightbox modal no encontrado');
        return;
    }

    /**
     * Abre el lightbox con la galería especificada
     */
    function openLightbox(galleryId) {
        currentGallery = galleryData[galleryId];
        if (!currentGallery) return;

        currentIndex = 0;

        // Generar thumbnails
        generateThumbnails();

        // Mostrar primera imagen
        updateImage();

        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        console.log('📸 Lightbox abierto:', currentGallery.name);
    }

    /**
     * Cierra el lightbox
     */
    function closeLightbox() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentGallery = null;
    }

    /**
     * Actualiza la imagen mostrada según el índice actual
     */
    function updateImage() {
        if (!currentGallery) return;

        const image = currentGallery.images[currentIndex];
        mainImage.src = image.src;
        mainImage.alt = image.title;
        titleEl.textContent = image.title;
        counterEl.textContent = `${currentIndex + 1} / ${currentGallery.images.length}`;

        // Actualizar thumbnails activos
        const thumbs = thumbnailsContainer.querySelectorAll('.lightbox-thumb');
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }

    /**
     * Genera los thumbnails dinámicamente
     */
    function generateThumbnails() {
        if (!currentGallery) return;

        thumbnailsContainer.innerHTML = '';

        currentGallery.images.forEach((image, index) => {
            const thumb = document.createElement('div');
            thumb.className = `lightbox-thumb ${index === 0 ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${image.src}" alt="${image.title}">`;
            thumb.addEventListener('click', () => {
                currentIndex = index;
                updateImage();
            });
            thumbnailsContainer.appendChild(thumb);
        });
    }

    /**
     * Navega a la imagen anterior
     */
    function prevImage() {
        if (!currentGallery) return;
        currentIndex = (currentIndex - 1 + currentGallery.images.length) % currentGallery.images.length;
        updateImage();
    }

    /**
     * Navega a la siguiente imagen
     */
    function nextImage() {
        if (!currentGallery) return;
        currentIndex = (currentIndex + 1) % currentGallery.images.length;
        updateImage();
    }

    // Event Listeners

    // Abrir lightbox al hacer clic en triggers
    document.querySelectorAll('.gallery-trigger').forEach(trigger => {
        trigger.addEventListener('click', function () {
            const galleryId = this.dataset.gallery;
            openLightbox(galleryId);
        });
    });

    // Cerrar lightbox
    closeBtn?.addEventListener('click', closeLightbox);
    overlay?.addEventListener('click', closeLightbox);

    // Navegación
    prevBtn?.addEventListener('click', prevImage);
    nextBtn?.addEventListener('click', nextImage);

    // Navegación con teclado
    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    console.log('✅ Lightbox gallery inicializado correctamente');
}

// ============================================================================
// MÓDULO: PARTICLES SYSTEM
// Sistema de partículas flotantes sin dependencias externas
// ============================================================================

/**
 * Crea y anima partículas flotantes en el fondo
 */
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 25;
    const colors = [
        'rgba(37, 99, 235, 0.4)',   // Primary blue
        'rgba(8, 145, 178, 0.3)',    // Secondary teal
        'rgba(249, 115, 22, 0.25)',  // Accent orange
        'rgba(139, 92, 246, 0.3)'    // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
        createParticle(container, colors);
    }

    console.log('✅ Sistema de partículas inicializado');
}

/**
 * Crea una partícula individual con propiedades aleatorias
 */
function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Propiedades aleatorias
    const size = Math.random() * 8 + 3;
    const duration = Math.random() * 25 + 15;
    const delay = Math.random() * 20;
    const left = Math.random() * 100;
    const drift = (Math.random() - 0.5) * 200;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = Math.random() * 0.4 + 0.1;

    // Aplicar estilos
    particle.style.cssText = `
        --size: ${size}px;
        --duration: ${duration}s;
        --delay: ${delay}s;
        --drift: ${drift}px;
        --color: ${color};
        --opacity: ${opacity};
        left: ${left}%;
    `;

    container.appendChild(particle);
}

// ============================================================================
// MÓDULO: MAGNETIC BUTTONS
// Efecto magnético en botones principales
// ============================================================================

/**
 * Inicializa el efecto magnético en botones
 */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn-neon, .btn-outline-neon');

    magneticElements.forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Movimiento sutil hacia el cursor
            const moveX = x * 0.2;
            const moveY = y * 0.2;

            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        btn.addEventListener('mouseleave', function () {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    console.log('✅ Efecto magnético inicializado');
}

// ============================================================================
// MÓDULO: ANIMATED COUNTERS
// Contadores animados que incrementan al entrar en viewport
// ============================================================================

/**
 * Inicializa contadores animados para las estadísticas del hero
 */
function initAnimatedCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statNumbers.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;

                // Extraer número y sufijo
                const match = text.match(/(\d+)(\+|%)?/);
                if (match) {
                    const targetNum = parseInt(match[1]);
                    const suffix = match[2] || '';

                    animateCounter(el, 0, targetNum, suffix, 1500);
                }

                observer.unobserve(el);
            }
        });
    }, observerOptions);

    statNumbers.forEach(function (el) {
        observer.observe(el);
    });

    console.log('✅ Contadores animados inicializados');
}

/**
 * Anima un contador desde inicio hasta fin
 */
function animateCounter(element, start, end, suffix, duration) {
    element.classList.add('counting');
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.classList.remove('counting');
        }
    }

    requestAnimationFrame(update);
}

// ============================================================================
// MÓDULO: TYPEWRITER EFFECT
// Efecto de escritura para el código del hero
// ============================================================================

/**
 * Inicializa efecto typewriter mejorado
 */
function initTypewriter() {
    const codeWindow = document.querySelector('.hero-code-window');
    if (!codeWindow) return;

    const codeContent = codeWindow.querySelector('.code-content pre code');
    if (!codeContent) return;

    // Guardar contenido original
    const originalHTML = codeContent.innerHTML;

    // Dividir en líneas
    const lines = originalHTML.split('\n');

    // Reconstruir con wrappers
    codeContent.innerHTML = lines.map((line, index) =>
        `<span class="typewriter-line" style="transition-delay: ${index * 100}ms">${line}</span>`
    ).join('\n');

    // Observer para activar animación
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const lineElements = codeContent.querySelectorAll('.typewriter-line');
                lineElements.forEach(function (line, index) {
                    setTimeout(function () {
                        line.classList.add('visible');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(codeWindow);

    console.log('✅ Typewriter effect inicializado');
}

// ============================================================================
// MÓDULO: SCROLL PROGRESS
// Barra de progreso de scroll en la parte superior
// ============================================================================

/**
 * Inicializa el indicador de progreso de scroll
 */
function initScrollProgress() {
    // Crear elemento de progreso
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    function updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    console.log('✅ Scroll progress inicializado');
}

// ============================================================================
// MÓDULO: PARALLAX EFFECT
// Efecto parallax suave en elementos
// ============================================================================

/**
 * Inicializa efecto parallax en elementos seleccionados
 */
function initParallax() {
    const parallaxElements = [
        { selector: '.orbit-center', speed: 0.05, direction: 'up' },
        { selector: '.hero-code-window', speed: 0.03, direction: 'up' },
        { selector: '.envelope-animation', speed: 0.04, direction: 'up' }
    ];

    function updateParallax() {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach(function (item) {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach(function (el) {
                const rect = el.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;

                if (isInView) {
                    const offset = scrollY * item.speed;
                    const direction = item.direction === 'up' ? -1 : 1;
                    el.style.transform = `translateY(${offset * direction}px)`;
                }
            });
        });
    }

    window.addEventListener('scroll', updateParallax, { passive: true });

    console.log('✅ Parallax inicializado');
}

// ============================================================================
// MÓDULO: RIPPLE EFFECT
// Efecto de onda en clics de botones
// ============================================================================

/**
 * Inicializa efecto ripple en botones
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-neon, .btn-outline-neon, .btn-submit');

    buttons.forEach(function (btn) {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';

        btn.addEventListener('click', function (e) {
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');

            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.className = 'ripple';
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;

            btn.appendChild(ripple);

            setTimeout(function () {
                ripple.remove();
            }, 600);
        });
    });

    console.log('✅ Ripple effect inicializado');
}

// ============================================================================
// MÓDULO: STAGGER ANIMATIONS
// Animaciones escalonadas para elementos en lista
// ============================================================================

/**
 * Inicializa animaciones escalonadas
 */
function initStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.skills-grid, .tech-stack-large, .social-links-contact');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const children = entry.target.children;
                Array.from(children).forEach(function (child, index) {
                    child.classList.add('stagger-item');
                    setTimeout(function () {
                        child.classList.add('visible');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    staggerContainers.forEach(function (container) {
        observer.observe(container);
    });

    console.log('✅ Stagger animations inicializadas');
}

// ============================================================================
// MÓDULO: TILT EFFECT
// Efecto de inclinación 3D en tarjetas
// ============================================================================

/**
 * Inicializa efecto tilt en tarjetas de proyectos
 */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.browser-mockup, .skill-mini-card');

    tiltElements.forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        el.addEventListener('mouseleave', function () {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    console.log('✅ Tilt effect inicializado');
}

// ============================================================================
// INICIALIZACIÓN DE TODOS LOS NUEVOS MÓDULOS
// ============================================================================

/**
 * Inicializa todos los efectos visuales premium
 * Se ejecuta después de que el DOM esté listo
 */
function initPremiumEffects() {
    // Pequeño delay para asegurar que todo esté cargado
    setTimeout(function () {
        initParticles();
        initMagneticButtons();
        initAnimatedCounters();
        initTypewriter();
        initScrollProgress();
        initParallax();
        initRippleEffect();
        initStaggerAnimations();
        initTiltEffect();

        console.log('🎨 Todos los efectos premium inicializados');
    }, 100);
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumEffects);
} else {
    initPremiumEffects();
}

