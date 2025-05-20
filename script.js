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

// Form handling
const contactForm = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        try {
            const response = await fetch("https://oxoworx1.oxorfr.workers.dev/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Origin': window.location.origin
                },
                mode: 'cors',
                body: formData,
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.reset();
                statusMessage.textContent = "✅ Сообщение успешно отправлено!";
                statusMessage.className = "status-message success";
            } else {
                throw new Error(data.error || 'Ошибка при отправке сообщения');
            }
        } catch (error) {
            console.error('Error:', error);
            statusMessage.textContent = "❌ Произошла ошибка. Пожалуйста, попробуйте еще раз.";
            statusMessage.className = "status-message error";
        }
        
        // Hide the message after 5 seconds
        setTimeout(() => {
            statusMessage.className = "status-message";
        }, 5000);
    });
}

// Add scroll-based animations
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Initialize sections with opacity 0
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger initial animation for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navContainer = document.querySelector('.nav-container');
const navLinks = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navContainer.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navContainer.contains(e.target)) {
        hamburger.classList.remove('active');
        navContainer.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});
