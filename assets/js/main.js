// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.case-study').forEach(card => {
    observer.observe(card);
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Hide mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

function typeText() {
    const titles = [
        "Robotics Engineer.",
        "Business Analyst.",
        "Software Developer.",
    ];
    const typingText = document.getElementById('typing-text');
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBeforeDelete = 2000;
    const pauseBeforeNextTitle = 500;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            // Deleting text
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(type, pauseBeforeNextTitle);
                return;
            }
            
            setTimeout(type, deletingSpeed);
        } else {
            // Typing text
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(type, pauseBeforeDelete);
                return;
            }
            
            setTimeout(type, typingSpeed);
        }
    }
    
    type();
}

// Start typing animation when the page loads
document.addEventListener('DOMContentLoaded', typeText);

// Dynamic sticky positioning for case study cards (desktop only)
function initDynamicSticky() {
    // Only run on desktop
    if (window.innerWidth <= 768) return;
    
    const caseStudies = document.querySelectorAll('.case-study');
    if (caseStudies.length === 0) return;

    let currentTopCard = 0;
    const stickyTopOffset = 100;
    const cardSpacing = 20;

    function updateStickyPositions() {
        // Reset all cards
        caseStudies.forEach((card, index) => {
            card.classList.remove('sticky-top', 'sticky-shifted');
            
            // Calculate how many cards are currently above this one
            const cardsAbove = Math.min(index, currentTopCard);
            
            if (index === currentTopCard) {
                // This is the top card
                card.classList.add('sticky-top');
                card.style.top = `${stickyTopOffset}px`;
            } else if (index > currentTopCard) {
                // Cards below the top card
                const offset = stickyTopOffset + (index - currentTopCard) * cardSpacing;
                card.style.top = `${offset}px`;
            } else {
                // Cards above the top card (should not be sticky)
                card.style.top = 'auto';
            }
        });
    }

    function handleScroll() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const headerHeight = 70; // Account for fixed header
        
        // Find which card should be at the top
        let newTopCard = 0;
        
        caseStudies.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardTop = rect.top + scrollY;
            const cardHeight = rect.height;
            
            // Check if this card should be the top sticky card
            if (cardTop <= scrollY + headerHeight + stickyTopOffset && 
                cardTop + cardHeight > scrollY + headerHeight + stickyTopOffset) {
                newTopCard = index;
            }
        });

        // Only update if the top card has changed
        if (newTopCard !== currentTopCard) {
            currentTopCard = newTopCard;
            updateStickyPositions();
        }
    }

    // Initialize
    updateStickyPositions();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle resize
    window.addEventListener('resize', () => {
        updateStickyPositions();
    });
}

// Initialize dynamic sticky positioning
document.addEventListener('DOMContentLoaded', initDynamicSticky);

// Menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Wait for header to be loaded
    setTimeout(() => {
        const menuToggle = document.querySelector('.menu-toggle');
        const menuOverlay = document.querySelector('.menu-overlay');
        const menuClose = document.querySelector('.menu-close');

        if (menuToggle && menuOverlay && menuClose) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                menuOverlay.classList.add('active');
            });

            menuClose.addEventListener('click', (e) => {
                e.stopPropagation();
                menuOverlay.classList.remove('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (menuOverlay.classList.contains('active') && 
                    !menuOverlay.contains(e.target) && 
                    !menuToggle.contains(e.target)) {
                    menuOverlay.classList.remove('active');
                }
            });
        }
    }, 100); // Small delay to ensure header is loaded
}); 