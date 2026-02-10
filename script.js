// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Active Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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

document.querySelectorAll('.skill-category, .project-card, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (name && email && message) {
            // Create mailto link
            const subject = encodeURIComponent('New Message from Portfolio');
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Thank you for your message! Please complete the email sending process.');
        } else {
            alert('Please fill in all fields');
        }
    });
}

// Active Navigation Link Styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #00d4ff;
    }

    .nav-link.active::after {
        width: 100%;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        background: rgba(10, 14, 39, 0.98);
        padding: 2rem;
        gap: 1rem;
        border-bottom: 1px solid rgba(0, 212, 255, 0.1);
    }
`;
document.head.appendChild(style);

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        element.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    });
});

// Add Glow Effect on Mouse Move for Footer Social Icons
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    document.querySelectorAll('.footer-social-link').forEach(icon => {
        const rect = icon.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(x - (rect.left + rect.width / 2), 2) +
            Math.pow(y - (rect.top + rect.height / 2), 2)
        );
        
        if (distance < 150) {
            icon.style.boxShadow = `0 0 ${150 - distance}px rgba(0, 212, 255, 0.6)`;
        } else {
            icon.style.boxShadow = '0 0 0px rgba(0, 212, 255, 0)';
        }
    });
});

// Animate Numbers in Stats
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-item h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 30;
        let current = 0;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 50);
    });
}

// Trigger animation when section is in view
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(statsSection);
        }
    });
    statsObserver.observe(statsSection);
}

// Initialize animations on page load
window.addEventListener('load', () => {
    document.querySelectorAll('.hero-content > *').forEach((element, index) => {
        element.style.animation = `none`;
    });
});