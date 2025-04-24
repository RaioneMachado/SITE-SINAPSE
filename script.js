document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        menuToggle.innerHTML = navbar.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Scroll Header Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 0);
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentSlide = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateSlider() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const slider = document.querySelector('.testimonial-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-image, .about-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .about-image, .about-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

document.addEventListener('DOMContentLoaded', function() {
    // Configuração das partículas
    const ctaSection = document.querySelector('.cta');
    const particleCount = 30;
    
    // Criar partículas
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('cta-particle');
            
            // Tamanho aleatório entre 2px e 6px
            const size = Math.random() * 4 + 2;
            
            // Posição inicial aleatória
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Opacidade aleatória
            const opacity = Math.random() * 0.6 + 0.2;
            
            // Tempo de animação aleatório
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            // Aplicar estilos
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = opacity;
            particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
            
            ctaSection.appendChild(particle);
        }
    }
    
    // Animação das partículas
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(calc(var(--move-x) * 50px), calc(var(--move-y) * 30px));
            }
            50% {
                transform: translate(calc(var(--move-x) * 100px), calc(var(--move-y) * 60px));
            }
            75% {
                transform: translate(calc(var(--move-x) * 50px), calc(var(--move-y) * 90px));
            }
            100% {
                transform: translate(0, 120px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Inicializar partículas
    createParticles();
    
    // Efeito de digitação no título (opcional)
    const ctaTitle = document.querySelector('.cta h2');
    if (ctaTitle) {
        const originalText = ctaTitle.textContent;
        ctaTitle.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                ctaTitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);
    }
    
    // Efeito de hover no botão aprimorado
    const ctaButton = document.querySelector('.cta-btn');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            // Efeito de ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.width = ripple.style.height = `${Math.max(this.offsetWidth, this.offsetHeight)}px`;
            this.appendChild(ripple);
            
            // Remover após animação
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    }
    
    // Adicionar estilo para o efeito ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Parallax effect para as partículas
    window.addEventListener('mousemove', function(e) {
        const particles = document.querySelectorAll('.cta-particle');
        particles.forEach(particle => {
            const moveX = (e.clientX - window.innerWidth/2) / 100;
            const moveY = (e.clientY - window.innerHeight/2) / 100;
            particle.style.setProperty('--move-x', moveX);
            particle.style.setProperty('--move-y', moveY);
        });
    });
});

document.querySelectorAll('.process-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const x = e.clientX - card.getBoundingClientRect().left;
        const y = e.clientY - card.getBoundingClientRect().top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});