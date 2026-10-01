// ==================== MENU HAMBURGER ====================

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

// Toggle menu
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-container')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    }
});

// ==================== FAQ ACCORDION ====================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Fechar outros itens
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle item atual
        item.classList.toggle('active');
    });
});

// ==================== LAZY LOADING ====================

// Verificar se IntersectionObserver é suportado
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== SMOOTH SCROLL POLYFILL ====================

// Para navegadores que não suportam scroll-behavior: smooth
if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==================== ANALYTICS & TRACKING ====================

// Rastrear cliques em CTAs
const allButtons = document.querySelectorAll('.btn, .cta-header, .whatsapp-button');
allButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Aqui você pode adicionar rastreamento de eventos
        console.log('CTA clicado:', button.textContent.trim());
    });
});

// ==================== PERFORMANCE ====================

// Permitir que a página carregue primeiro
window.addEventListener('load', () => {
    // Pré-carregar imagens críticas
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage && heroImage.src) {
        const img = new Image();
        img.src = heroImage.src;
    }
});

// ==================== ACCESSIBILIDADE ====================

// Manter focus visível ao navegar com teclado
let isKeyboardUser = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        isKeyboardUser = true;
    }
});

document.addEventListener('click', () => {
    isKeyboardUser = false;
});

// ==================== FORM VALIDATION (se necessário) ====================

// Placeholder para validação de formulários futuros
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim() === '') {
        errors.push('Nome é obrigatório');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('E-mail inválido');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== SCROLL TO TOP ====================

// Mostrar botão quando rolar para baixo
const scrollToTopButton = document.createElement('button');
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #687464;
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 998;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.opacity = '1';
        scrollToTopButton.style.pointerEvents = 'auto';
    } else {
        scrollToTopButton.style.opacity = '0';
        scrollToTopButton.style.pointerEvents = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== MOBILE DETECTION ====================

const isMobile = () => {
    return window.innerWidth <= 768;
};

// ==================== VIEWPORT HEIGHT FIX ====================

// Corrigir altura do viewport no mobile
const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setViewportHeight();
window.addEventListener('resize', setViewportHeight);

// ==================== INICIALIZAÇÃO ====================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Marina Valente - Fisioterapia carregado');
    
    // Verificar se todos os elementos críticos estão presentes
    const headerPresent = document.querySelector('header') !== null;
    const navPresent = document.querySelector('.nav') !== null;
    const faqPresent = document.querySelector('.faq-item') !== null;
    
    if (!headerPresent || !navPresent) {
        console.warn('Alguns elementos críticos não foram encontrados');
    }
});

// ==================== DEBUG ====================

// Modo debug (remover em produção)
const debugMode = false;

if (debugMode) {
    window.debugInfo = {
        isMobile: isMobile(),
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        },
        performance: {
            navigation: performance.getEntriesByType('navigation')[0]
        }
    };
}
