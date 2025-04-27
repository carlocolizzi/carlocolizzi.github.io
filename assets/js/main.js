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