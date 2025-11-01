// DSHP Morocco Tourism Website - Main JavaScript File

class DSHPWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupHeroSlider();
        this.setupFormHandling();
        this.setupLoadingBar();
        this.setupLanguageSwitcher();
        this.setupAccessibility();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMenu = document.querySelector('.close-menu');

        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => this.toggleMobileMenu(true));
            closeMenu.addEventListener('click', () => this.toggleMobileMenu(false));
        }

        // Close mobile menu when clicking on links
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.toggleMobileMenu(false));
        });

        // Scroll to top button
        const scrollTop = document.querySelector('.scroll-top');
        if (scrollTop) {
            scrollTop.addEventListener('click', () => this.scrollToTop());
        }

        // Navigation active state
        this.setupNavigation();

        // Like buttons for destination cards
        this.setupLikeButtons();

        // Gallery item clicks
        this.setupGallery();

        // Hotel booking buttons
        this.setupBookingButtons();
    }

    // Mobile menu functionality
    toggleMobileMenu(show) {
        const mobileMenu = document.getElementById('mobileMenu');
        const body = document.body;

        if (show) {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    }

    // Scroll to top functionality
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Setup navigation active states
    setupNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        // Update active nav link based on scroll position
        const updateActiveNav = () => {
            let current = '';
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveNav);

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Setup scroll animations
    setupScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeInOnScroll = () => {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        };

        // Initial check
        fadeInOnScroll();

        // Check on scroll
        window.addEventListener('scroll', fadeInOnScroll);

        // Header scroll effect
        const header = document.getElementById('header');
        const scrollTop = document.querySelector('.scroll-top');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                scrollTop.classList.add('active');
            } else {
                header.classList.remove('scrolled');
                scrollTop.classList.remove('active');
            }
        });
    }

    // Setup hero slider
    setupHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        let currentSlide = 0;
        let slideInterval;

        // Function to show a specific slide
        const showSlide = (index) => {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        };

        // Next slide function
        const nextSlide = () => {
            let next = currentSlide + 1;
            if (next >= slides.length) next = 0;
            showSlide(next);
        };

        // Previous slide function
        const prevSlide = () => {
            let prev = currentSlide - 1;
            if (prev < 0) prev = slides.length - 1;
            showSlide(prev);
        };

        // Auto slide change
        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 5000);
        };

        const stopSlider = () => {
            clearInterval(slideInterval);
        };

        // Event listeners for controls
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Dot controls
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopSlider();
                startSlider();
            });
        });

        // Pause on hover
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', stopSlider);
            hero.addEventListener('mouseleave', startSlider);
        }

        // Start the slider
        startSlider();
    }

    // Setup like buttons for destination cards
    setupLikeButtons() {
        const likeButtons = document.querySelectorAll('.card-like');
        
        likeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const icon = button.querySelector('i');
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    button.style.background = 'var(--primary-red)';
                    button.style.color = 'var(--white)';
                    this.showNotification('تمت الإضافة إلى المفضلة', 'success');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    button.style.background = 'rgba(255, 255, 255, 0.9)';
                    button.style.color = 'var(--gray)';
                    this.showNotification('تمت الإزالة من المفضلة', 'info');
                }
            });
        });
    }

    // Setup gallery functionality
    setupGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('h3').textContent;
                const description = item.querySelector('p').textContent;
                
                this.openLightbox(img.src, title, description);
            });
        });
    }

    // Lightbox functionality
    openLightbox(src, title, description) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="إغلاق">
                    <i class="fas fa-times"></i>
                </button>
                <img src="${src}" alt="${title}">
                <div class="lightbox-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        `;

        // Add styles for lightbox
        const lightboxStyles = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 2rem;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox-content img {
                max-width: 100%;
                max-height: 70vh;
                border-radius: 8px;
            }
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            }
            .lightbox-info {
                color: white;
                text-align: center;
                margin-top: 1rem;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = lightboxStyles;
        document.head.appendChild(styleSheet);

        // Add to DOM
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Close lightbox functionality
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
            document.head.removeChild(styleSheet);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
                document.head.removeChild(styleSheet);
            }
        });

        // Close with ESC key
        document.addEventListener('keydown', function closeOnEsc(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
                document.head.removeChild(styleSheet);
                document.removeEventListener('keydown', closeOnEsc);
            }
        });
    }

    // Setup booking buttons
    setupBookingButtons() {
        const bookingButtons = document.querySelectorAll('.hotel-card .btn-primary');
        
        bookingButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const hotelCard = button.closest('.hotel-card');
                const hotelName = hotelCard.querySelector('h3').textContent;
                const price = hotelCard.querySelector('.amount').textContent;
                
                this.showBookingModal(hotelName, price);
            });
        });
    }

    // Booking modal
    showBookingModal(hotelName, price) {
        const modal = document.createElement('div');
        modal.className = 'booking-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="إغلاق">
                    <i class="fas fa-times"></i>
                </button>
                <h2>حجز فندق ${hotelName}</h2>
                <p>السعر: <strong>${price} دولار/ليلة</strong></p>
                <form class="booking-form">
                    <div class="form-group">
                        <label for="checkin">تاريخ الوصول</label>
                        <input type="date" id="checkin" required>
                    </div>
                    <div class="form-group">
                        <label for="checkout">تاريخ المغادرة</label>
                        <input type="date" id="checkout" required>
                    </div>
                    <div class="form-group">
                        <label for="guests">عدد الضيوف</label>
                        <select id="guests" required>
                            <option value="1">1 ضيف</option>
                            <option value="2">2 ضيوف</option>
                            <option value="3">3 ضيوف</option>
                            <option value="4">4 ضيوف</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">تأكيد الحجز</button>
                </form>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            .booking-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 1rem;
            }
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                width: 100%;
                position: relative;
            }
            .modal-close {
                position: absolute;
                top: 1rem;
                left: 1rem;
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: var(--gray);
            }
            .modal-close:hover {
                color: var(--dark);
            }
            .booking-form {
                margin-top: 1.5rem;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);

        // Add to DOM
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
            document.head.removeChild(styleSheet);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
                document.head.removeChild(styleSheet);
            }
        });

        // Form submission
        const form = modal.querySelector('.booking-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processBooking(form, hotelName);
        });

        // Set minimum date for checkin to today
        const today = new Date().toISOString().split('T')[0];
        const checkin = modal.querySelector('#checkin');
        const checkout = modal.querySelector('#checkout');
        
        checkin.min = today;
        checkin.value = today;
        
        // Update checkout min date when checkin changes
        checkin.addEventListener('change', () => {
            checkout.min = checkin.value;
            if (checkout.value < checkin.value) {
                checkout.value = checkin.value;
            }
        });
    }

    // Process booking form
    processBooking(form, hotelName) {
        const formData = new FormData(form);
        const checkin = form.querySelector('#checkin').value;
        const checkout = form.querySelector('#checkout').value;
        const guests = form.querySelector('#guests').value;

        // Simulate booking process
        this.showNotification('جاري معالجة حجزك...', 'info');
        
        setTimeout(() => {
            this.showNotification(`تم حجز ${hotelName} بنجاح!`, 'success');
            
            // Close modal
            const modal = document.querySelector('.booking-modal');
            if (modal) {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            }
        }, 2000);
    }

    // Setup form handling
    setupFormHandling() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }

    // Handle contact form submission
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            this.showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
            return;
        }

        // Simulate form submission
        this.showNotification('جاري إرسال رسالتك...', 'info');
        
        setTimeout(() => {
            this.showNotification('تم إرسال رسالتك بنجاح! سنرد عليك قريباً.', 'success');
            form.reset();
        }, 2000);
    }

    // Setup loading bar
    setupLoadingBar() {
        const loadingBar = document.getElementById('loadingBar');
        
        window.addEventListener('load', () => {
            if (loadingBar) {
                loadingBar.style.width = '100%';
                setTimeout(() => {
                    loadingBar.style.opacity = '0';
                    setTimeout(() => {
                        loadingBar.style.display = 'none';
                    }, 300);
                }, 500);
            }
        });

        // Update loading bar on route changes (simulated)
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                if (loadingBar) {
                    loadingBar.style.width = '0%';
                    loadingBar.style.opacity = '1';
                    loadingBar.style.display = 'block';
                    
                    setTimeout(() => {
                        loadingBar.style.width = '100%';
                        setTimeout(() => {
                            loadingBar.style.opacity = '0';
                            setTimeout(() => {
                                loadingBar.style.display = 'none';
                            }, 300);
                        }, 300);
                    }, 100);
                }
            }
        });
    }

    // Setup language switcher
    setupLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                const lang = button.getAttribute('data-lang');
                
                // Remove active class from all buttons
                langButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Change language (in a real app, this would load translations)
                this.changeLanguage(lang);
            });
        });
    }

    // Change language (placeholder for real implementation)
    changeLanguage(lang) {
        this.showNotification(`تم تغيير اللغة إلى ${this.getLanguageName(lang)}`, 'info');
        
        // In a real application, you would:
        // 1. Load the appropriate translation file
        // 2. Update all text content on the page
        // 3. Update the dir attribute for RTL/LTR languages
        // 4. Save user preference
        
        // Example for RTL/LTR direction
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
    }

    // Get language name
    getLanguageName(lang) {
        const languages = {
            'ar': 'العربية',
            'fr': 'الفرنسية',
            'en': 'الإنجليزية'
        };
        return languages[lang] || lang;
    }

    // Setup accessibility features
    setupAccessibility() {
        // Skip to main content link
        this.addSkipLink();
        
        // Focus management for modals
        this.setupFocusManagement();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
    }

    // Add skip to main content link
    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'انتقل إلى المحتوى الرئيسي';
        
        const skipStyles = `
            .skip-link {
                position: absolute;
                top: -40px;
                right: 6px;
                background: var(--primary-red);
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 10000;
                transition: top 0.3s;
            }
            .skip-link:focus {
                top: 6px;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = skipStyles;
        document.head.appendChild(styleSheet);
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Setup focus management for modals
    setupFocusManagement() {
        // This would manage focus trapping in modals
        // Implementation depends on specific modal components
    }

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Close modals with ESC
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.booking-modal, .lightbox');
                if (openModal) {
                    openModal.remove();
                    document.body.style.overflow = '';
                }
                
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    this.toggleMobileMenu(false);
                }
            }
        });
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="إغلاق">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add notification styles
        const notificationStyles = `
            .notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(-100px);
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 10001;
                transition: transform 0.3s ease;
                border-left: 4px solid;
            }
            .notification-info {
                border-left-color: var(--blue);
            }
            .notification-success {
                border-left-color: var(--primary-green);
            }
            .notification-error {
                border-left-color: var(--primary-red);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: var(--gray);
                cursor: pointer;
                padding: 0.25rem;
            }
            .notification.show {
                transform: translateX(-50%) translateY(0);
            }
        `;

        const styleSheet = document.createElement('style');
        if (!document.querySelector('#notification-styles')) {
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = notificationStyles;
            document.head.appendChild(styleSheet);
        }

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DSHPWebsite();
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance monitoring
window.addEventListener('load', () => {
    // Log performance metrics
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DSHPWebsite;
}