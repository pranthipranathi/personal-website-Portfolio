// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Smooth scrolling for navigation links
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

// Skills animation
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const animateSkills = () => {
    if (!skillsAnimated) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
        skillsAnimated = true;
    }
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skills when skills section is visible
            if (entry.target.id === 'skills') {
                animateSkills();
            }
        }
    });
}, observerOptions);

// Observe all sections and cards for animation
document.querySelectorAll('section, .about-card, .skill-card, .project-card, .achievement-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Gallery modal
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-image');
const captionText = document.getElementById('caption');
const closeModal = document.querySelector('.close');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        captionText.innerHTML = img.alt;
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Contact form
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Resume download
const downloadResumeBtn = document.getElementById('download-resume');

downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a simple resume content
    const resumeContent = `
S. PRANATHI
Aspiring Software Developer

CONTACT INFORMATION
Email: pranathi.s@example.com
Phone: +91 98765 43210
Location: Madurai, Tamil Nadu
LinkedIn: linkedin.com/in/pranathi-s
GitHub: github.com/pranathi-s

EDUCATION
Bachelor of Technology in Information Technology
Velammal College of Engineering and Technology, Madurai
Pre-final Year Student

TECHNICAL SKILLS
• Programming Languages: Java, JavaScript, PHP
• Web Technologies: HTML, CSS
• Database: MySQL
• Tools & Technologies: Git, VS Code

PROJECTS
• Web Development Internship Project
• Smart Campus Management System
• Personal Portfolio Website

ACHIEVEMENTS
• Academic Excellence
• Web Development Certification
• Programming Contest Participation
• Team Leadership Experience

INTERESTS
• Software Development
• Web Technologies
• Photography
• Problem Solving
    `;
    
    // Create and download the resume
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'S_Pranathi_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});

// Typing effect for hero title
const heroTitle = document.querySelector('.hero-title');
const titleText = 'S. Pranathi';
let titleIndex = 0;

function typeTitle() {
    if (titleIndex < titleText.length) {
        heroTitle.textContent = titleText.slice(0, titleIndex + 1);
        titleIndex++;
        setTimeout(typeTitle, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    heroTitle.textContent = '';
    setTimeout(typeTitle, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animation for elements
const revealElements = document.querySelectorAll('.about-card, .skill-card, .project-card, .achievement-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Add cursor trail effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Add CSS for cursor trail
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.7;
        animation: cursorTrail 1s ease-out forwards;
        z-index: 9999;
    }
    
    @keyframes cursorTrail {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);