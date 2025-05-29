// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Adjust for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !service || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show success message (in a real application, you would send this to a server)
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Video optimization for mobile
function optimizeVideoForDevice() {
    const video = document.querySelector('.video-background video');
    
    if (video) {
        // Keep video completely clear on all devices
        video.style.opacity = '1.0';
        
        // Pause video if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            video.pause();
            video.style.display = 'none';
        }
    }
}

// Intersection Observer for animation triggers
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Optimize video
    optimizeVideoForDevice();
    
    // Observe service cards for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe sections for animation
    const sections = document.querySelectorAll('.about, .services, .contact');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    optimizeVideoForDevice();
    
    // Close mobile menu if window is resized to desktop
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Lazy load video
function lazyLoadVideo() {
    const video = document.querySelector('.video-background video');
    
    if (video) {
        const videoSrc = video.querySelector('source').getAttribute('src');
        
        // Only load video if it's in viewport and device can handle it
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.load();
                    videoObserver.unobserve(video);
                }
            });
        });
        
        videoObserver.observe(video);
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadVideo);

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Start video playback after page is fully loaded
    const video = document.querySelector('.video-background video');
    if (video) {
        video.play().catch(error => {
            console.log('Video autoplay failed:', error);
        });
    }
});

// Handle hamburger animation
function animateHamburger() {
    const bars = hamburger.querySelectorAll('.bar');
    
    hamburger.addEventListener('click', () => {
        bars.forEach((bar, index) => {
            bar.style.transform = hamburger.classList.contains('active') ? 
                (index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                 index === 1 ? 'opacity(0)' :
                 'rotate(-45deg) translate(7px, -6px)') : 
                'none';
        });
    });
} 