// Initialization
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavbarHide();
    initCustomCursor();
    initScrollProgress();
    initCopyEmail();
});

/**
 * Scroll Reveal Animation
 * Uses Intersection Observer to add the 'active' class when elements enter the viewport
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Reveal only once
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * Hide Navbar on Scroll Down, Show on Scroll Up
 */
function initNavbarHide() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            if (window.scrollY > lastScrollY) {
                // Scrolling down
                navbar.classList.add('hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('hidden');
            }
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollY = window.scrollY;
    }, { passive: true });
}

/**
 * Custom Cursor Logic
 */
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Immediate position for dot
        dot.style.transform = `translate(${posX}px, ${posY}px)`;
        
        // Slightly delayed/smooth approach for outline via animation frame
        outline.animate({
            transform: `translate(${posX}px, ${posY}px)`
        }, { duration: 300, fill: "forwards" });
    });

    // Add hovering effect on interactive elements
    const interactables = document.querySelectorAll('a, button, .project-card, .btn');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => outline.classList.add('hovering'));
        el.addEventListener('mouseleave', () => outline.classList.remove('hovering'));
    });
}

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = progress + '%';
    }, { passive: true });
}

/**
 * Copy Email to Clipboard
 */
function initCopyEmail() {
    const copyBtn = document.getElementById('copy-email-btn');
    if (!copyBtn) return;
    
    copyBtn.addEventListener('click', () => {
        const email = 'santiano2200383@ceu.edu.ph';
        navigator.clipboard.writeText(email).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'Copied! ✓';
            copyBtn.style.backgroundColor = '#4caf50'; // Success green
            copyBtn.style.color = '#fff';
            
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.backgroundColor = ''; 
                copyBtn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            // Fallback for older browsers
            window.location.href = `mailto:${email}`;
        });
    });
}
