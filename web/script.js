document.addEventListener('DOMContentLoaded', function() {
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
   
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            
            navLinks.forEach(l => l.classList.remove('active'));
            
            this.classList.add('active');
            
           
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });
    
    
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }
    
    
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    
    let statsAnimated = false;
    
    function checkScroll() {
        const aboutSection = document.getElementById('about');
        const aboutPosition = aboutSection.getBoundingClientRect();
        
       
        if (aboutPosition.top < window.innerHeight && aboutPosition.bottom >= 0 && !statsAnimated) {
            animateValue('years-count', 0, 5, 2000);
            animateValue('memories-count', 0, 100, 2500);
            animateValue('photos-count', 0, 250, 3000);
            statsAnimated = true;
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    
    checkScroll();
    
   
    function createBubbles() {
        const container = document.querySelector('.background-animation');
        for (let i = 0; i < 10; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            
           
            const size = Math.random() * 80 + 40;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.top = `${Math.random() * 100}%`;
            
            
            bubble.style.animationDelay = `${Math.random() * 5}s`;
            
            
            const colors = [
                'rgba(255, 182, 193, 0.3)',
                'rgba(173, 216, 230, 0.3)',
                'rgba(221, 160, 221, 0.3)',
                'rgba(144, 238, 144, 0.3)',
                'rgba(255, 215, 0, 0.3)'
            ];
            bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            container.appendChild(bubble);
        }
    }
    
    createBubbles();
    
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
   
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    
    document.querySelectorAll('.gallery-item, .memory, .timeline-item').forEach(item => {
        observer.observe(item);
    });
    
    
    const style = document.createElement('style');
    style.textContent = `
        .gallery-item, .memory, .timeline-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});