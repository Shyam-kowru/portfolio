// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0s';
            entry.target.style.animationFillMode = 'both';
            entry.target.style.animationName = 'fadeInUp';
            entry.target.style.animationDuration = '1s';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .timeline-item, .project-card, .contact-item').forEach(el => {
    observer.observe(el);
});

// Form submission handler
document.querySelector('.contact-form form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const subject = e.target.querySelectorAll('input[type="text"]')[1].value;
    const message = e.target.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && subject && message) {
        alert('Thank you for your message! I will get back to you soon.');
        e.target.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 150);
    }, 1000);
});

// Skills animation counter
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const finalValue = parseInt(statNumber.textContent);
            animateValue(statNumber, 0, finalValue, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});
// Download Resume as PDF
document.getElementById('download-resume').addEventListener('click', () => {
    // Create a clean version for PDF
    const originalBody = document.body.innerHTML;
    const printContent = `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Shyam Kumar K</h1>
            <p><strong>Email:</strong> shyamkumarkowru@gmail.com | <strong>Phone:</strong> +91 9008275657</p>
            <p><strong>Location:</strong> Bengaluru, Karnataka, India</p>
            
            <h2 style="color: #2c3e50; margin-top: 30px;">Education</h2>
            <p><strong>City Engineering College Bangalore</strong><br>
            Bachelor of Engineering | August 2021 – Present</p>
            
            <h2 style="color: #2c3e50; margin-top: 30px;">Experience</h2>
            <p><strong>AI/ML Internship | Rooman Technologies</strong><br>
            September 2024 – May 2025 | Bikasipura, Bengaluru</p>
            
            <p><strong>Frontend Development Internship | Colt Assist Private</strong><br>
            October 2023 – November 2023 | J.P. Nagar, Bengaluru</p>
            
            <p><strong>Python Development Internship | IPEC Solutions</strong><br>
            October 2022 – November 2022 | Rajarajeshwari Nagar, Bengaluru</p>
            
            <h2 style="color: #2c3e50; margin-top: 30px;">Skills</h2>
            <p><strong>Programming:</strong> Python, JavaScript, SQL<br>
            <strong>Web Technologies:</strong> HTML5, CSS3, React<br>
            <strong>AI/ML:</strong> scikit-learn, NumPy, Pandas, Matplotlib, InceptionV3, LSTM</p>
            
            <h2 style="color: #2c3e50; margin-top: 30px;">Projects</h2>
            <p><strong>DeepFake Detection System</strong> - Web-based AI tool using InceptionV3 + LSTM<br>
            <strong>Scientific Calculator</strong> - JavaScript-based mathematical calculator<br>
            <strong>COVID-19 Chatbot</strong> - Python-based NLP chatbot</p>
        </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html><head><title>Shyam Kumar K - Resume</title></head><body>
        ${printContent}
        </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
});


// Particle effect for hero section (optional enhancement)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255,255,255,0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    const hero = document.querySelector('.hero');
    hero.appendChild(particle);
    
    const animationDuration = Math.random() * 3000 + 2000;
    const horizontalMovement = (Math.random() - 0.5) * 200;
    
    particle.animate([
        { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
        { transform: `translateY(-${window.innerHeight + 100}px) translateX(${horizontalMovement}px)`, opacity: 1 },
        { transform: `translateY(-${window.innerHeight + 200}px) translateX(${horizontalMovement * 2}px)`, opacity: 0 }
    ], {
        duration: animationDuration,
        easing: 'linear'
    }).onfinish = () => {
        particle.remove();
    };
}

// Create particles periodically
setInterval(createParticle, 300);
