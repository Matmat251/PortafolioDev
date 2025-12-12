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
});
