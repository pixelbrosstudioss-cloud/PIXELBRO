// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '0.75rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B+';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toLocaleString() + '+';
}

// Initialize counters when elements are in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    stat.textContent = '0';
    observer.observe(stat);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
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

// Form submission handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Simple validation
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#e5e7eb';
            }
        });
        
        if (isValid) {
            // Get form data
            const formData = new FormData(this);
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Submit to Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Thank you for your message! We will get back to you soon.');
                    this.reset();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Submission failed');
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Sorry, there was an error. Please email us directly at pixelbros.studioss@gmail.com');
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        }
    });
}

// Scroll animations
const scrollElements = document.querySelectorAll('.service-card, .work-item, .creator-card');

const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
    );
};

const displayScrollElement = (element) => {
    element.classList.add('fade-in-up');
};

const hideScrollElement = (element) => {
    element.classList.remove('fade-in-up');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Initial check for elements already in view
handleScrollAnimation();

// Video play button handler
const playButtons = document.querySelectorAll('.play-btn');
playButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const video = this.closest('.video-container').querySelector('video');
        const overlay = this.closest('.video-overlay');
        
        if (video.paused) {
            video.play();
            overlay.style.opacity = '0';
        } else {
            video.pause();
            overlay.style.opacity = '1';
        }
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Lazy loading for images and videos
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('img[data-src], video[data-src]');
    
    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.tagName === 'IMG') {
                    element.src = element.dataset.src;
                } else if (element.tagName === 'VIDEO') {
                    element.src = element.dataset.src;
                }
                element.removeAttribute('data-src');
                observer.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => lazyObserver.observe(element));
}

// Lightbox for design images
(function initDesignLightbox() {
    const items = Array.from(document.querySelectorAll('img[data-role="design-item"]'));
    const lightbox = document.getElementById('designLightbox');
    if (!lightbox || items.length === 0) return;

    const imgEl = lightbox.querySelector('.lightbox-image');
    const btnClose = lightbox.querySelector('.lightbox-close');
    const btnPrev = lightbox.querySelector('.lightbox-prev');
    const btnNext = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;

    function openAt(index) {
        currentIndex = index;
        const src = items[currentIndex].dataset.src || items[currentIndex].src;
        imgEl.src = src;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        btnClose.focus();
        preloadAdjacent();
    }

    function close() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        imgEl.src = '';
        items[currentIndex].focus && items[currentIndex].focus();
    }

    function prev() {
        openAt((currentIndex - 1 + items.length) % items.length);
    }

    function next() {
        openAt((currentIndex + 1) % items.length);
    }

    function onKey(e) {
        if (lightbox.classList.contains('open')) {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        }
    }

    function preloadAdjacent() {
        const prevIdx = (currentIndex - 1 + items.length) % items.length;
        const nextIdx = (currentIndex + 1) % items.length;
        [prevIdx, nextIdx].forEach(i => {
            const src = items[i].dataset.src || items[i].src;
            const img = new Image();
            img.src = src;
        });
    }

    items.forEach((el, idx) => {
        el.style.cursor = 'zoom-in';
        el.setAttribute('tabindex', '0');
        el.addEventListener('click', () => openAt(idx));
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openAt(idx);
            }
        });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', prev);
    btnNext.addEventListener('click', next);
    window.addEventListener('keydown', onKey);

    // Click outside image closes
    lightbox.addEventListener('click', (e) => {
        const content = lightbox.querySelector('.lightbox-content');
        if (!content.contains(e.target) && !e.target.classList.contains('lightbox-prev') && !e.target.classList.contains('lightbox-next')) {
            close();
        }
    });
})();

console.log('Pixel Bros website loaded successfully! 🎬');

