// ===== GLOBAL VARIABLES =====
let menuOpen = false;
let cart = [];
let isCartOpen = false;

// Detailed course data
const cursosData = {
    'programacion': {
        title: 'Programming',
        price: 299,
        duration: '12 weeks',
        level: 'Beginner to Advanced',
        students: '150+ students',
        description: 'Master the most in-demand programming languages in the tech industry.',
        modules: [
            'Programming Fundamentals',
            'Programming in C and C++',
            'Java for Enterprise Development',
            'JavaScript and Web Development',
            'Python for Data Science',
            'Data Structures and Algorithms',
            'Design Patterns',
            'Final Integrative Project'
        ],
        skills: ['Programming logic', 'Debugging', 'Code optimization', 'Teamwork'],
        certificate: true,
        icon: '💻'
    },
    'sistemas': {
        title: 'Systems and Assembler',
        price: 399,
        duration: '16 weeks',
        level: 'Intermediate to Advanced',
        students: '89+ students',
        description: 'Learn low-level programming and Linux system administration.',
        modules: [
            'Computer Architecture',
            'Assembly x86/x64 Programming',
            'Linux Administration',
            'Advanced Shell Scripting',
            'Operating Systems',
            'Processes and Threads',
            'Memory and Resource Management',
            'Embedded System Project'
        ],
        skills: ['Linux Administration', 'Low-level programming', 'System optimization', 'Advanced debugging'],
        certificate: true,
        icon: '⚙️'
    },
    'redes': {
        title: 'Networks and Telecommunications',
        price: 449,
        duration: '14 weeks',
        level: 'Intermediate',
        students: '120+ students',
        description: 'Design and manage computer networks and telecommunication systems.',
        modules: [
            'Network Fundamentals',
            'TCP/IP Protocol',
            'CISCO Equipment Configuration',
            'Network Security',
            'VoIP and IP Telephony',
            'Wireless Networks',
            'Monitoring and Troubleshooting',
            'Enterprise Network Project'
        ],
        skills: ['CISCO Configuration', 'Traffic analysis', 'Network security', 'Problem solving'],
        certificate: true,
        icon: '🌐'
    },
    'arduino': {
        title: 'Arduino and Embedded Systems',
        price: 349,
        duration: '10 weeks',
        level: 'Beginner to Intermediate',
        students: '200+ students',
        description: 'Create IoT projects and embedded systems with Arduino and microcontrollers.',
        modules: [
            'Introduction to Arduino',
            'C Programming for Arduino',
            'Sensors and Actuators',
            'I2C and SPI Communication',
            'Raspberry Pi and Embedded Linux',
            'IoT Connectivity',
            'Mobile Applications for IoT',
            'Complete IoT Project'
        ],
        skills: ['Embedded programming', 'Basic electronics', 'IoT', 'Rapid prototyping'],
        certificate: true,
        icon: '🤖'
    },
    'bases-datos': {
        title: 'Databases',
        price: 329,
        duration: '12 weeks',
        level: 'Beginner to Intermediate',
        students: '95+ students',
        description: 'Design and manage relational and NoSQL databases for modern applications.',
        modules: [
            'Database Fundamentals',
            'Advanced SQL and MySQL',
            'PostgreSQL and Optimization',
            'MongoDB and NoSQL Databases',
            'Database Design',
            'Indexes and Performance',
            'Backup and Recovery',
            'Database System Project'
        ],
        skills: ['Database design', 'Complex queries', 'Optimization', 'Administration'],
        certificate: true,
        icon: '🗄️'
    },
    'web': {
        title: 'Web Development',
        price: 379,
        duration: '14 weeks',
        level: 'Beginner to Advanced',
        students: '180+ students',
        description: 'Build modern, responsive web applications with the latest technologies.',
        modules: [
            'Advanced HTML5 and CSS3',
            'JavaScript ES6+',
            'React Framework',
            'Node.js and Express',
            'REST APIs',
            'Databases for Web',
            'Deployment and DevOps',
            'Full-Stack Web Project'
        ],
        skills: ['Modern frontend', 'Backend with Node.js', 'REST APIs', 'Responsive design'],
        certificate: true,
        icon: '🎨'
    }
};

// ===== HAMBURGER MENU TOGGLE FUNCTION =====
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

// ===== FORM SUBMIT HANDLER =====
function handleSubmit(event) {
    event.preventDefault();

    // Get form values
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const curso = document.getElementById('curso').value;
    const mensaje = document.getElementById('mensaje').value;

    // Basic validation
    if (!nombre || !email || !curso || !mensaje) {
        showNotification('Please fill in all required fields.', 'warning');
        return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'warning');
        return;
    }

    // Simulate successful submission
    showNotification(`Thank you ${nombre}! We have received your inquiry about the ${getCursoName(curso)} course. We will contact you soon at ${email}.`, 'success');

    // Clear form
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('curso').value = '';
    document.getElementById('mensaje').value = '';

    // Optional: Send data to server
    // sendToServer({ nombre, email, curso, mensaje });
}

// ===== HELPER FUNCTION TO GET COURSE NAME =====
function getCursoName(value) {
    const cursos = {
        'programacion': 'Programming',
        'sistemas': 'Systems and Assembler',
        'redes': 'Networks and Telecommunications',
        'arduino': 'Arduino and Embedded Systems',
        'bases-datos': 'Databases',
        'web': 'Web Development'
    };
    return cursos[value] || value;
}

// ===== SCROLL ANIMATION FUNCTIONS =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.course-card, .stat-item, .contact-item, .mv-item, .team-member, .testimonial-card'); // Added new elements

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
            // Optional: Stagger grid items animation
            if (element.classList.contains('stat-item') || element.classList.contains('course-card') || element.classList.contains('contact-item')) {
                const index = Array.from(element.parentNode.children).indexOf(element);
                element.style.setProperty('--delay', `${index * 0.1}s`);
            }
        }
    });
}

// ===== CLOSE MENU WHEN CLICKING A LINK =====
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

// ===== SMOOTH SCROLL SETUP =====
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Adjust for fixed header

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== HEADER SCROLL EFFECT =====
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

// ===== REAL-TIME FORM VALIDATION =====
function setupFormValidation() {
    const emailInput = document.getElementById('email');
    const nombreInput = document.getElementById('nombre');

    // Real-time email validation
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

    // Name validation (letters and spaces only)
    nombreInput.addEventListener('input', function() {
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const isValid = nombreRegex.test(this.value);

        if (this.value && !isValid) { // If has value and NOT valid, border red
            this.style.borderColor = '#e74c3c';
        } else if (this.value && isValid) { // If has value and valid, border green
            this.style.borderColor = '#27ae60';
        } else { // If no value (empty), default border
            this.style.borderColor = '#e9ecef';
        }
    });
}

// ===== ANIMATED COUNTERS FOR STATS =====
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
                counter.innerText = counter.innerText.replace(/[0-9]+/, target); // Ensure exact final value
            }
        };

        // Animate only when element is visible
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

// ===== SUBTLE PARALLAX EFFECT (Currently unused, uncomment if desired) =====
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;

    if (hero) {
        hero.style.transform = `translateY(${parallax}px)`;
    }
}

// ===== SHOPPING CART FUNCTIONS =====
function addToCart(courseId) {
    const course = cursosData[courseId];
    if (!course) return;

    // Check if course is already in cart
    const existingItem = cart.find(item => item.id === courseId);

    if (existingItem) {
        showNotification('This course is already in your cart', 'warning');
        return;
    }

    cart.push({
        id: courseId,
        title: course.title,
        price: course.price,
        icon: course.icon
    });

    updateCartDisplay();
    showNotification(`${course.title} added to cart`, 'success');
}

function removeFromCart(courseId) {
    cart = cart.filter(item => item.id !== courseId);
    updateCartDisplay();
    showNotification('Course removed from cart', 'info');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cartCount) cartCount.textContent = cart.length;

    if (cartItems) {
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: var(--color-text-light); margin-top: 30px;">The cart is empty.</p>';
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
        document.body.style.overflow = 'hidden'; // Prevent scroll on body
        cartSidebar.classList.add('active'); // For CSS transitions
    } else {
        cartSidebar.style.right = '-400px'; // Adjust according to your sidebar width
        document.body.style.overflow = 'auto';
        cartSidebar.classList.remove('active');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'warning');
        return;
    }

    showPaymentMethodModal();

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const courseNames = cart.map(item => item.title).join(', ');

    if (confirm(`Confirm purchase of ${cart.length} course(s) for $${total} MXN?\n\nCourses: ${courseNames}`)) {
        // Simulate payment process
        showNotification('Purchase successful! We will send access details by email.', 'success');
        cart = [];
        updateCartDisplay();
        toggleCart();
    }
}

// ===== FUNCTIONS FOR COURSE PREVIEW =====
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
                            <strong>Duration:</strong> ${course.duration}
                        </div>
                        <div class="meta-item">
                            <strong>Level:</strong> ${course.level}
                        </div>
                        <div class="meta-item">
                            <strong>Students:</strong> ${course.students}
                        </div>
                        <div class="meta-item">
                            <strong>Certificate:</strong> ${course.certificate ? 'Included' : 'Not included'}
                        </div>
                    </div>

                    <div class="course-description">
                        <h3>Description</h3>
                        <p>${course.description}</p>
                    </div>

                    <div class="course-modules">
                        <h3>Course Modules</h3>
                        <ul>
                            ${course.modules.map(module => `<li>${module}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="course-skills">
                        <h3>Skills You Will Develop</h3>
                        <div class="skills-tags">
                            ${course.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="course-price-large">$${course.price} MXN</div>
                <button onclick="addToCart('${courseId}'); closeModal();" class="btn-primary">
                    Add to Cart
                </button>
                <button onclick="closeModal()" class="btn-secondary">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Animate modal entrance
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

// ===== FUNCTION TO SHOW NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notifications to avoid clutter
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

    // Animate entrance
    setTimeout(() => notification.classList.add('show'), 10);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== FAQ ACCORDION FUNCTION =====
function setupFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close others if you want only one open at a time
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ===== EVENT LISTENERS AND INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechLearn Academy - System started successfully');

    addPaymentStyles();

    // Setup smooth navigation
    setupSmoothScrolling();

    // Close menu on link click
    closeMenuOnClick();

    // Setup form validation
    setupFormValidation();

    // Initialize animated counters
    animateCounters();

    // Initialize cart
    updateCartDisplay();

    // Add purchase and preview buttons to course cards
    addCourseButtons();

    // Create cart sidebar (where correction applies)
    createCartSidebar();

    // Setup FAQ accordion
    setupFaqAccordion();

    // Scroll event listeners
    window.addEventListener('scroll', () => {
        headerScrollEffect();
        animateOnScroll();
        // parallaxEffect(); // Uncomment if you want parallax effect
    });

    // Window resize listener
    window.addEventListener('resize', () => {
        // Close menu if window becomes larger
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            menuOpen = false;
        }
    });

    // ESC key listener to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closePaymentModal();
            if (isCartOpen) toggleCart();
        }
    });

    // Welcome message in console
    console.log('%cWelcome to TechLearn Academy! 🚀', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cIf you are a developer, join our team!', 'color: #764ba2; font-size: 12px;');
});



// ===== FUNCTIONS TO ADD ELEMENTS TO THE DOM =====
function addCourseButtons() {
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach((card) => {
        const courseId = card.getAttribute('data-course-id'); // Get the ID from data-course-id attribute

        if (!courseId) return;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'course-buttons';
        buttonsContainer.innerHTML = `
            <button onclick="showCoursePreview('${courseId}')" class="btn-preview">
                View Details
            </button>
            <button onclick="addToCart('${courseId}')" class="btn-buy">
                Buy Now
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
            <h3>🛒 My Cart</h3>
            <button onclick="toggleCart()" class="close-cart">&times;</button>
        </div>
        <div id="cart-items" class="cart-items">
            </div>
        <div class="cart-footer">
            <div class="cart-total">
                Total: <span id="cart-total">$0 MXN</span>
            </div>
            <button onclick="checkout()" class="btn-checkout">
                Proceed to Payment
            </button>
        </div>
    `;

    document.body.appendChild(cartSidebar);
    
}

// ===== OPTIONAL FUNCTION TO SEND DATA TO SERVER =====
async function sendToServer(data) {
    try {
        // Example sending to server (uncomment and modify according to your backend)
        /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Data sent successfully');
        } else {
            console.error('Error sending data');
        }
        */

        console.log('Data to send:', data);
    } catch (error) {
        console.error('Connection error:', error);
    }
}

// ===== ADDITIONAL FUNCTIONS FOR INTERACTIVITY =====

// Function to show additional course info
function showCourseInfo(courseType) {
    const courseInfo = {
        'programacion': {
            duration: '12 weeks',
            level: 'Beginner to Advanced',
            projects: '8 practical projects'
        },
        'sistemas': {
            duration: '16 weeks',
            level: 'Intermediate to Advanced',
            projects: '6 system projects'
        },
        // Add more info as needed
    };

    console.log(`Course info ${courseType}:`, courseInfo[courseType]);
}

// Function to toggle dark theme (optional)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Function to load theme preference
function loadThemePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}
// ===== FUNCTIONS FOR PAYMENT METHODS =====

// Available payment methods data
const paymentMethods = {
    'credit-card': {
        name: 'Credit/Debit Card',
        icon: '💳',
        description: 'Visa, MasterCard, American Express',
        processingFee: 0
    },
    'paypal': {
        name: 'PayPal',
        icon: '🅿️',
        description: 'Secure payment with PayPal',
        processingFee: 0.03 // 3% commission
    },
    'oxxo': {
        name: 'OXXO',
        icon: '🏪',
        description: 'Payment at OXXO stores',
        processingFee: 15 // Fixed commission of $15 MXN
    },
    'spei': {
        name: 'SPEI Transfer',
        icon: '🏦',
        description: 'Immediate bank transfer',
        processingFee: 0
    },
    'mercado-pago': {
        name: 'Mercado Pago',
        icon: '💙',
        description: 'Payment with Mercado Pago',
        processingFee: 0.025 // 2.5% commission
    }
};

// Global variable for selected payment method
let selectedPaymentMethod = null;

// Modified main checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'warning');
        return;
    }

    // Show payment methods modal
    showPaymentMethodModal();
}

// Function to show the payment methods modal
function showPaymentMethodModal() {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="modal-content payment-modal-content">
            <div class="modal-header">
                <h2>💳 Select Your Payment Method</h2>
                <span class="close-modal" onclick="closePaymentModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="cart-summary">
                    <h3>Your Purchase Summary:</h3>
                    <div class="summary-items">
                        ${cart.map(item => `
                            <div class="summary-item">
                                <span>${item.icon} ${item.title}</span>
                                <span>$${item.price} MXN</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="summary-subtotal">
                        <strong>Subtotal: $${subtotal} MXN</strong>
                    </div>
                </div>

                <div class="payment-methods">
                    <h3>Available Payment Methods:</h3>
                    <div class="payment-options">
                        ${Object.keys(paymentMethods).map(methodId => {
                            const method = paymentMethods[methodId];
                            return `
                                <div class="payment-option" onclick="selectPaymentMethod('${methodId}')">
                                    <div class="payment-option-content">
                                        <div class="payment-icon">${method.icon}</div>
                                        <div class="payment-info">
                                            <h4>${method.name}</h4>
                                            <p>${method.description}</p>
                                            ${method.processingFee > 0 ? 
                                                `<small class="processing-fee">
                                                    ${typeof method.processingFee === 'number' && method.processingFee < 1 ? 
                                                        `Fee: ${(method.processingFee * 100)}%` : 
                                                        `Fee: $${method.processingFee} MXN`
                                                    }
                                                </small>` : 
                                                '<small class="no-fee">No fees</small>'
                                            }
                                        </div>
                                    </div>
                                    <div class="payment-radio">
                                        <input type="radio" name="payment-method" value="${methodId}" id="payment-${methodId}">
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div id="payment-total" class="payment-total">
                    <div class="total-breakdown">
                        <div class="total-line">
                            <span>Subtotal:</span>
                            <span>$${subtotal} MXN</span>
                        </div>
                        <div class="total-line" id="fee-line" style="display: none;">
                            <span>Fee:</span>
                            <span id="fee-amount">$0 MXN</span>
                        </div>
                        <div class="total-line total-final">
                            <span><strong>Total to Pay:</strong></span>
                            <span><strong id="final-total">$${subtotal} MXN</strong></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="closePaymentModal()" class="btn-secondary">
                    Cancel
                </button>
                <button onclick="proceedToPayment()" class="btn-primary" id="proceed-btn" disabled>
                    Proceed to Payment
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Animate modal entrance
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
}

// Function to select payment method
function selectPaymentMethod(methodId) {
    selectedPaymentMethod = methodId;
    
    // Update selection UI
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    const selectedOption = document.querySelector(`input[value="${methodId}"]`).closest('.payment-option');
    selectedOption.classList.add('selected');
    
    // Check the radio button
    document.getElementById(`payment-${methodId}`).checked = true;
    
    // Calculate and display total with fees
    updatePaymentTotal();
    
    // Enable proceed button
    document.getElementById('proceed-btn').disabled = false;
}

// Function to update total with fees
function updatePaymentTotal() {
    if (!selectedPaymentMethod) return;
    
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const method = paymentMethods[selectedPaymentMethod];
    let fee = 0;
    let total = subtotal;
    
    if (method.processingFee > 0) {
        if (method.processingFee < 1) {
            // Percentage
            fee = subtotal * method.processingFee;
        } else {
            // Fixed amount
            fee = method.processingFee;
        }
        total = subtotal + fee;
        
        // Show fee line
        document.getElementById('fee-line').style.display = 'flex';
        document.getElementById('fee-amount').textContent = `$${fee.toFixed(2)} MXN`;
    } else {
        // Hide fee line
        document.getElementById('fee-line').style.display = 'none';
    }
    
    document.getElementById('final-total').textContent = `$${total.toFixed(2)} MXN`;
}

// Function to proceed with payment
function proceedToPayment() {
    if (!selectedPaymentMethod) {
        showNotification('Please select a payment method', 'warning');
        return;
    }
    
    const method = paymentMethods[selectedPaymentMethod];
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    let fee = 0;
    
    if (method.processingFee > 0) {
        fee = method.processingFee < 1 ? subtotal * method.processingFee : method.processingFee;
    }
    
    const total = subtotal + fee;
    const courseNames = cart.map(item => item.title).join(', ');
    
    // Show confirmation modal specific to payment method
    showPaymentConfirmation(method, total, courseNames);
}

// Function to show payment confirmation
function showPaymentConfirmation(method, total, courseNames) {
    const confirmationMessage = getPaymentInstructions(method, total);
    
    if (confirm(`${confirmationMessage}\n\nConfirm purchase of ${cart.length} course(s) for $${total.toFixed(2)} MXN?\n\nCourses: ${courseNames}`)) {
        // Simulate payment process according to method
        processPayment(method, total);
    }
}

// Function to get specific payment instructions
function getPaymentInstructions(method, total) {
    switch (method.name) {
        case 'Credit/Debit Card':
            return `Payment with ${method.name} (${method.icon})\nYou will be redirected to a secure page to enter your card details.\nTotal: $${total.toFixed(2)} MXN`;
        
        case 'OXXO':
            return `Payment at ${method.name} (${method.icon})\nYou will receive a barcode to pay at any OXXO store.\nYou have 3 days to complete the payment.\nTotal: $${total.toFixed(2)} MXN`;
        
        case 'SPEI Transfer':
            return `${method.name} (${method.icon})\nYou will receive bank details to complete the transfer.\nThe course will activate automatically once payment is confirmed.\nTotal: $${total.toFixed(2)} MXN`;
        
        case 'PayPal':
            return `Payment with ${method.name} (${method.icon})\nYou will be redirected to PayPal to complete the payment securely.\nTotal: $${total.toFixed(2)} MXN`;
        
        case 'Mercado Pago':
            return `Payment with ${method.name} (${method.icon})\nYou can pay with card, transfer, or account balance.\nTotal: $${total.toFixed(2)} MXN`;
        
        default:
            return `Payment with ${method.name}\nTotal: $${total.toFixed(2)} MXN`;
    }
}

// Function to process payment
function processPayment(method, total) {
    // Simulate different processing times by method
    const processingTime = {
        'credit-card': 2000,
        'paypal': 1500,
        'mercado-pago': 1500,
        'spei': 3000,
        'oxxo': 1000
    };
    
    showNotification('Processing payment...', 'info');
    
    setTimeout(() => {
        // Simulate payment success
        const successMessage = getSuccessMessage(method, total);
        showNotification(successMessage, 'success');
        
        // Clear cart and close modals
        cart = [];
        updateCartDisplay();
        closePaymentModal();
        if (isCartOpen) toggleCart();
        
        // Reset selected payment method
        selectedPaymentMethod = null;
        
    }, processingTime[selectedPaymentMethod] || 2000);
}

// Function to get specific success message
function getSuccessMessage(method, total) {
    switch (method.name) {
        case 'OXXO':
            return `Payment started successfully! We sent you the barcode by email to pay $${total.toFixed(2)} MXN at OXXO. You have 3 days to complete the payment.`;
        
        case 'SPEI Transfer':
            return `Request processed! We sent you bank details by email. Once the transfer of $${total.toFixed(2)} MXN is done, your course will activate automatically.`;
        
        default:
            return `Purchase successful for $${total.toFixed(2)} MXN! We will send you access details by email.`;
    }
}

// Function to close the payment modal
function closePaymentModal() {
    const modal = document.querySelector('.payment-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Reset selection
    selectedPaymentMethod = null;
}

// Function to add CSS styles for payment methods
function addPaymentStyles() {
    const styles = `
        <style>
        .payment-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .payment-modal-content {
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }

        .cart-summary {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 25px;
        }

        .summary-items {
            margin: 15px 0;
        }

        .summary-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }

        .summary-subtotal {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px solid #667eea;
            text-align: right;
        }

        .payment-methods h3 {
            margin-bottom: 20px;
            color: #333;
        }

        .payment-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .payment-option {
            border: 2px solid #e9ecef;
            border-radius: 12px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .payment-option:hover {
            border-color: #667eea;
            background: #f8f9ff;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.1);
        }

        .payment-option.selected {
            border-color: #667eea;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .payment-option.selected .processing-fee,
        .payment-option.selected .no-fee {
            color: rgba(255, 255, 255, 0.8);
        }

        .payment-option-content {
            display: flex;
            align-items: center;
            gap: 15px;
            flex: 1;
        }

        .payment-icon {
            font-size: 2rem;
            width: 50px;
            text-align: center;
        }

        .payment-info h4 {
            margin: 0 0 5px 0;
            font-size: 1.1rem;
        }

        .payment-info p {
            margin: 0 0 5px 0;
            color: #666;
            font-size: 0.9rem;
        }

        .payment-option.selected .payment-info p {
            color: rgba(255, 255, 255, 0.9);
        }

        .processing-fee {
            color: #e74c3c;
            font-weight: bold;
        }

        .no-fee {
            color: #27ae60;
            font-weight: bold;
        }

        .payment-radio input {
            width: 20px;
            height: 20px;
            accent-color: #667eea;
        }

        .payment-total {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-top: 25px;
        }

        .total-breakdown {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .total-line {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
        }

        .total-final {
            border-top: 2px solid #667eea;
            margin-top: 10px;
            padding-top: 15px;
            font-size: 1.2rem;
        }

        #proceed-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        @media (max-width: 768px) {
            .payment-modal-content {
                margin: 20px;
                max-width: none;
            }
            
            .payment-option-content {
                gap: 10px;
            }
            
            .payment-icon {
                font-size: 1.5rem;
                width: 40px;
            }
            
            .payment-info h4 {
                font-size: 1rem;
            }
            
            .payment-info p {
                font-size: 0.8rem;
            }
        }
        </style>
    `;
    
    document.head.appendChild(document.createElement('div')).innerHTML = styles;
}

// Initialize styles on DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    addPaymentStyles();
});

// Event listener to close modal with ESC (updated)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closePaymentModal();
        if (isCartOpen) toggleCart();
    }
});
