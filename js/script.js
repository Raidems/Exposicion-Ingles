// ===== VARIABLES GLOBALES =====
let menuOpen = false;
let cart = [];
let isCartOpen = false;

// Datos detallados de los cursos
const cursosData = {
    'programacion': {
        title: 'Programación',
        price: 299,
        duration: '12 semanas',
        level: 'Principiante a Avanzado',
        students: '150+ estudiantes',
        description: 'Domina los lenguajes de programación más demandados en la industria tecnológica.',
        modules: [
            'Fundamentos de Programación',
            'Programación en C y C++',
            'Java para Desarrollo Empresarial',
            'JavaScript y Desarrollo Web',
            'Python para Ciencia de Datos',
            'Estructuras de Datos y Algoritmos',
            'Patrones de Diseño',
            'Proyecto Final Integrador'
        ],
        skills: ['Lógica de programación', 'Debugging', 'Optimización de código', 'Trabajo en equipo'],
        certificate: true,
        icon: '💻'
    },
    'sistemas': {
        title: 'Sistemas y Assembler',
        price: 399,
        duration: '16 semanas',
        level: 'Intermedio a Avanzado',
        students: '89+ estudiantes',
        description: 'Aprende programación de bajo nivel y administración de sistemas Linux.',
        modules: [
            'Arquitectura de Computadoras',
            'Programación en Assembly x86/x64',
            'Administración de Linux',
            'Shell Scripting Avanzado',
            'Sistemas Operativos',
            'Procesos y Threads',
            'Memoria y Gestión de Recursos',
            'Proyecto de Sistema Embebido'
        ],
        skills: ['Administración Linux', 'Programación de bajo nivel', 'Optimización de sistema', 'Debugging avanzado'],
        certificate: true,
        icon: '⚙️'
    },
    'redes': {
        title: 'Redes y Telecomunicaciones',
        price: 449,
        duration: '14 semanas',
        level: 'Intermedio',
        students: '120+ estudiantes',
        description: 'Diseña y administra redes de computadoras y sistemas de telecomunicaciones.',
        modules: [
            'Fundamentos de Redes',
            'Protocolo TCP/IP',
            'Configuración de Equipos CISCO',
            'Seguridad en Redes',
            'VoIP y Telefonía IP',
            'Redes Inalámbricas',
            'Monitoreo y Troubleshooting',
            'Proyecto de Red Empresarial'
        ],
        skills: ['Configuración CISCO', 'Análisis de tráfico', 'Seguridad de red', 'Resolución de problemas'],
        certificate: true,
        icon: '🌐'
    },
    'arduino': {
        title: 'Arduino y Sistemas Embebidos',
        price: 349,
        duration: '10 semanas',
        level: 'Principiante a Intermedio',
        students: '200+ estudiantes',
        description: 'Crea proyectos IoT y sistemas embebidos con Arduino y microcontroladores.',
        modules: [
            'Introducción a Arduino',
            'Programación en C para Arduino',
            'Sensores y Actuadores',
            'Comunicación I2C y SPI',
            'Raspberry Pi y Linux Embebido',
            'Conectividad IoT',
            'Aplicaciones Móviles para IoT',
            'Proyecto IoT Completo'
        ],
        skills: ['Programación embebida', 'Electrónica básica', 'IoT', 'Prototipado rápido'],
        certificate: true,
        icon: '🤖'
    },
    'bases-datos': {
        title: 'Bases de Datos',
        price: 329,
        duration: '12 semanas',
        level: 'Principiante a Intermedio',
        students: '95+ estudiantes',
        description: 'Diseña y administra bases de datos relacionales y NoSQL para aplicaciones modernas.',
        modules: [
            'Fundamentos de Bases de Datos',
            'SQL y MySQL Avanzado',
            'PostgreSQL y Optimización',
            'MongoDB y Bases NoSQL',
            'Diseño de Base de Datos',
            'Índices y Performance',
            'Backup y Recuperación',
            'Proyecto de Sistema de BD'
        ],
        skills: ['Diseño de BD', 'Consultas complejas', 'Optimización', 'Administración'],
        certificate: true,
        icon: '🗄️'
    },
    'web': {
        title: 'Desarrollo Web',
        price: 379,
        duration: '14 semanas',
        level: 'Principiante a Avanzado',
        students: '180+ estudiantes',
        description: 'Construye aplicaciones web modernas y responsivas con las últimas tecnologías.',
        modules: [
            'HTML5 y CSS3 Avanzado',
            'JavaScript ES6+',
            'Framework React',
            'Node.js y Express',
            'APIs REST',
            'Base de Datos para Web',
            'Deployment y DevOps',
            'Proyecto Web Full-Stack'
        ],
        skills: ['Frontend moderno', 'Backend con Node.js', 'APIs REST', 'Responsive design'],
        certificate: true,
        icon: '🎨'
    }
};

// ===== FUNCIÓN PARA TOGGLE DEL MENÚ HAMBURGUESA =====
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    menuOpen = !menuOpen;

    if (menuOpen) {
        navMenu.classList.add('active');
        hamburger.classList.add('active');
    } else {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// ===== FUNCIÓN PARA MANEJAR EL ENVÍO DEL FORMULARIO =====
function handleSubmit(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const curso = document.getElementById('curso').value;
    const mensaje = document.getElementById('mensaje').value;

    // Validación básica
    if (!nombre || !email || !curso || !mensaje) {
        showNotification('Por favor, completa todos los campos obligatorios.', 'warning');
        return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, ingresa un correo electrónico válido.', 'warning');
        return;
    }

    // Simular envío exitoso
    showNotification(`¡Gracias ${nombre}! Hemos recibido tu consulta sobre el curso de ${getCursoName(curso)}. Te contactaremos pronto al correo ${email}.`, 'success');

    // Limpiar el formulario
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('mensaje').value = '';

    // Opcional: Enviar datos a un servidor
    // sendToServer({ nombre, email, curso, mensaje });
}

// ===== FUNCIÓN AUXILIAR PARA OBTENER EL NOMBRE DEL CURSO =====
function getCursoName(value) {
    const cursos = {
        'programacion': 'Programación',
        'sistemas': 'Sistemas y Assembler',
        'redes': 'Redes y Telecomunicaciones',
        'arduino': 'Arduino y Sistemas Embebidos',
        'bases-datos': 'Bases de Datos',
        'web': 'Desarrollo Web'
    };
    return cursos[value] || value;
}

// ===== FUNCIONES PARA ANIMACIONES AL HACER SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.course-card, .stat-item, .contact-item, .mv-item, .team-member, .testimonial-card'); // Agregados los nuevos elementos

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
            // Opcional: Para animar escalonadamente los items en grid
            if (element.classList.contains('stat-item') || element.classList.contains('course-card') || element.classList.contains('contact-item')) {
                const index = Array.from(element.parentNode.children).indexOf(element);
                element.style.setProperty('--delay', `${index * 0.1}s`);
            }
        }
    });
}

// ===== FUNCIÓN PARA CERRAR EL MENÚ AL HACER CLICK EN UN ENLACE =====
function closeMenuOnClick() {
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');

            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            menuOpen = false;
        });
    });
}

// ===== FUNCIÓN PARA SMOOTH SCROLLING EN NAVEGACIÓN =====
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para el header fijo

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FUNCIÓN PARA EFECTOS EN EL HEADER AL HACER SCROLL =====
function headerScrollEffect() {
    const header = document.querySelector('header');

    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 25px rgba(0,0,0,0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
}

// ===== FUNCIÓN PARA VALIDACIÓN EN TIEMPO REAL DEL FORMULARIO =====
function setupFormValidation() {
    const emailInput = document.getElementById('email');
    const nombreInput = document.getElementById('nombre');

    // Validación del email en tiempo real
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(this.value);

        if (this.value && !isValid) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#e9ecef';
        }

        if (isValid) {
            this.style.borderColor = '#27ae60';
        }
    });

    // Validación del nombre (solo letras y espacios)
    nombreInput.addEventListener('input', function() {
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const isValid = nombreRegex.test(this.value);

        if (this.value && !isValid) { // Si hay valor y NO es válido, el borde es rojo
            this.style.borderColor = '#e74c3c';
        } else if (this.value && isValid) { // Si hay valor y SÍ es válido, el borde es verde
            this.style.borderColor = '#27ae60';
        } else { // Si no hay valor (campo vacío), el borde es el predeterminado
            this.style.borderColor = '#e9ecef';
        }
    });
}

// ===== FUNCIÓN PARA CONTADOR ANIMADO EN ESTADÍSTICAS =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.innerText.replace(/[^0-9]/g, ''));
        const count = +target;
        const increment = count / 200;
        let current = 0;

        const updateCounter = () => {
            if (current < count) {
                current += increment;
                if (counter.innerText.includes('+')) {
                    counter.innerText = Math.ceil(current) + '+';
                } else if (counter.innerText.includes('%')) {
                    counter.innerText = Math.ceil(current) + '%';
                } else {
                    counter.innerText = Math.ceil(current);
                }
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = counter.innerText.replace(/[0-9]+/, target); // Asegura el valor final exacto
            }
        };

        // Solo animar cuando el elemento sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// ===== FUNCIÓN PARA EFECTO PARALLAX SUTIL (Actualmente no usado, descomentar si quieres) =====
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;

    if (hero) {
        hero.style.transform = `translateY(${parallax}px)`;
    }
}

// ===== FUNCIONES DEL CARRITO DE COMPRAS =====
function addToCart(courseId) {
    const course = cursosData[courseId];
    if (!course) return;

    // Verificar si el curso ya está en el carrito
    const existingItem = cart.find(item => item.id === courseId);

    if (existingItem) {
        showNotification('Este curso ya está en tu carrito', 'warning');
        return;
    }

    cart.push({
        id: courseId,
        title: course.title,
        price: course.price,
        icon: course.icon
    });

    updateCartDisplay();
    showNotification(`${course.title} agregado al carrito`, 'success');
}

function removeFromCart(courseId) {
    cart = cart.filter(item => item.id !== courseId);
    updateCartDisplay();
    showNotification('Curso removido del carrito', 'info');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cartCount) cartCount.textContent = cart.length;

    if (cartItems) {
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: var(--color-text-light); margin-top: 30px;">El carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <span class="cart-item-icon">${item.icon}</span>
                        <div>
                            <h4>${item.title}</h4>
                            <p>$${item.price} MXN</p>
                        </div>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" class="remove-btn">×</button>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }

    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `$${total} MXN`;
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    isCartOpen = !isCartOpen;

    if (isCartOpen) {
        cartSidebar.style.right = '0';
        document.body.style.overflow = 'hidden'; // Evita scroll en el body
        cartSidebar.classList.add('active'); // Para transiciones CSS
    } else {
        cartSidebar.style.right = '-400px'; // Ajusta según el ancho de tu sidebar
        document.body.style.overflow = 'auto';
        cartSidebar.classList.remove('active');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'warning');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const courseNames = cart.map(item => item.title).join(', ');

    if (confirm(`¿Confirmar compra de ${cart.length} curso(s) por $${total} MXN?\n\nCursos: ${courseNames}`)) {
        // Simular proceso de pago
        showNotification('¡Compra realizada con éxito! Te enviaremos los detalles de acceso por email.', 'success');
        cart = [];
        updateCartDisplay();
        toggleCart();
    }
}

// ===== FUNCIONES PARA VISTA PREVIA DE CURSOS =====
function showCoursePreview(courseId) {
    const course = cursosData[courseId];
    if (!course) return;

    const modal = document.createElement('div');
    modal.className = 'course-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${course.icon} ${course.title}</h2>
                <span class="close-modal" onclick="closeModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="course-preview-info">
                    <div class="course-meta">
                        <div class="meta-item">
                            <strong>Duración:</strong> ${course.duration}
                        </div>
                        <div class="meta-item">
                            <strong>Nivel:</strong> ${course.level}
                        </div>
                        <div class="meta-item">
                            <strong>Estudiantes:</strong> ${course.students}
                        </div>
                        <div class="meta-item">
                            <strong>Certificado:</strong> ${course.certificate ? 'Incluido' : 'No incluido'}
                        </div>
                    </div>

                    <div class="course-description">
                        <h3>Descripción</h3>
                        <p>${course.description}</p>
                    </div>

                    <div class="course-modules">
                        <h3>Módulos del Curso</h3>
                        <ul>
                            ${course.modules.map(module => `<li>${module}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="course-skills">
                        <h3>Habilidades que Desarrollarás</h3>
                        <div class="skills-tags">
                            ${course.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="course-price-large">$${course.price} MXN</div>
                <button onclick="addToCart('${courseId}'); closeModal();" class="btn-primary">
                    Agregar al Carrito
                </button>
                <button onclick="closeModal()" class="btn-secondary">
                    Cerrar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Animar entrada del modal
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

function closeModal() {
    const modal = document.querySelector('.course-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';

        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// ===== FUNCIÓN PARA MOSTRAR NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Elimina notificaciones existentes para evitar acumulaciones
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'warning' ? '⚠' : type === 'error' ? '✕' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 10);

    // Auto-remover después de 4 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== FUNCIÓN PARA ACORDEÓN DE PREGUNTAS FRECUENTES =====
function setupFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Cierra todos los demás ítems si quieres que solo uno esté abierto a la vez
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Abre o cierra el ítem actual
            item.classList.toggle('active');
        });
    });
}

// ===== EVENT LISTENERS Y INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechLearn Academy - Sistema iniciado correctamente');

    // Configurar navegación suave
    setupSmoothScrolling();

    // Configurar cierre de menú al hacer click en enlaces
    closeMenuOnClick();

    // Configurar validación de formulario
    setupFormValidation();

    // Inicializar contador animado
    animateCounters();

    // Inicializar carrito
    updateCartDisplay();

    // Agregar botones de compra y vista previa a las tarjetas de cursos
    addCourseButtons();

    // Crear carrito sidebar (donde se aplica la corrección)
    createCartSidebar();

    // Configurar acordeón de preguntas frecuentes
    setupFaqAccordion();

    // Event listeners para scroll
    window.addEventListener('scroll', () => {
        headerScrollEffect();
        animateOnScroll();
        // parallaxEffect(); // Descomenta si quieres efecto parallax
    });

    // Event listener para redimensionamiento de ventana
    window.addEventListener('resize', () => {
        // Cerrar menú si la ventana se hace más grande
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            menuOpen = false;
        }
    });

    // Event listener para cerrar modal con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            if (isCartOpen) toggleCart();
        }
    });

    // Mensaje de bienvenida en consola
    console.log('%c¡Bienvenido a TechLearn Academy! 🚀', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cSi eres desarrollador, ¡únete a nuestro equipo!', 'color: #764ba2; font-size: 12px;');
});

// ===== FUNCIONES PARA AGREGAR ELEMENTOS AL DOM =====
function addCourseButtons() {
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach((card) => {
        const courseId = card.getAttribute('data-course-id'); // Obtener el ID del atributo data-course-id

        if (!courseId) return;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'course-buttons';
        buttonsContainer.innerHTML = `
            <button onclick="showCoursePreview('${courseId}')" class="btn-preview">
                Ver Detalles
            </button>
            <button onclick="addToCart('${courseId}')" class="btn-buy">
                Comprar Ahora
            </button>
        `;

        card.appendChild(buttonsContainer);
    });
}

function createCartSidebar() {
    const cartSidebar = document.createElement('div');
    cartSidebar.id = 'cart-sidebar';
    cartSidebar.className = 'cart-sidebar';
    cartSidebar.innerHTML = `
        <div class="cart-header">
            <h3>🛒 Mi Carrito</h3>
            <button onclick="toggleCart()" class="close-cart">&times;</button>
        </div>
        <div id="cart-items" class="cart-items">
            </div>
        <div class="cart-footer">
            <div class="cart-total">
                Total: <span id="cart-total">$0 MXN</span>
            </div>
            <button onclick="checkout()" class="btn-checkout">
                Proceder al Pago
            </button>
        </div>
    `;

    document.body.appendChild(cartSidebar);

    // Agregar botón del carrito al header, NO dentro de nav, para un mejor control con flexbox
    const header = document.querySelector('header'); // Selecciona el header
    const cartButton = document.createElement('div');
    cartButton.className = 'cart-button';
    cartButton.innerHTML = `
        <button onclick="toggleCart()" class="cart-toggle">
            🛒 <span id="cart-count">0</span>
        </button>
    `;

    // Añade el botón del carrito al final del header
    if (header) {
        header.appendChild(cartButton);
    }
}

// ===== FUNCIÓN OPCIONAL PARA ENVIAR DATOS A SERVIDOR =====
async function sendToServer(data) {
    try {
        // Ejemplo de envío a servidor (descomenta y modifica según tu backend)
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Datos enviados correctamente');
        } else {
            console.error('Error al enviar datos');
        }
        */

        console.log('Datos a enviar:', data);
    } catch (error) {
        console.error('Error de conexión:', error);
    }
}

// ===== FUNCIONES ADICIONALES PARA INTERACTIVIDAD =====

// Función para mostrar información adicional de cursos
function showCourseInfo(courseType) {
    const courseInfo = {
        'programacion': {
            duration: '12 semanas',
            level: 'Principiante a Avanzado',
            projects: '8 proyectos prácticos'
        },
        'sistemas': {
            duration: '16 semanas',
            level: 'Intermedio a Avanzado',
            projects: '6 proyectos de sistemas'
        },
        // Agrega más información según necesites
    };

    console.log(`Información del curso ${courseType}:`, courseInfo[courseType]);
}

// Función para toggle de tema oscuro (opcional)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Función para cargar preferencia de tema
function loadThemePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}