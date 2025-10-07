// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    // Add smooth scrolling to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active navigation state
                updateActiveNav(this);
            }
        });
    });
    
    // Update active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Function to update active navigation
    function updateActiveNav(activeLink) {
        // Remove active class from all links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        activeLink.classList.add('active');
    }
    
    // Add scroll reveal animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add hover effects for equipment cards
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    equipmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add loading animation for header image
    const headerImage = document.getElementById('headerImage');
    if (headerImage) {
        headerImage.style.opacity = '0';
        headerImage.style.transition = 'opacity 1s ease';
        
        headerImage.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    }
    
    // Add scroll-triggered header effect
    window.addEventListener('scroll', function() {
        const headerImage = document.querySelector('.header-image');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (headerImage) {
            headerImage.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add mobile menu toggle functionality
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '☰';
    navToggle.style.display = 'none';
    
    // Insert toggle button before navigation
    navMenu.parentNode.insertBefore(navToggle, navMenu);
    
    // Add toggle functionality
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('nav-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav')) {
            navMenu.classList.remove('nav-open');
        }
    });
    
    // Show/hide mobile toggle based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            navMenu.classList.add('mobile-nav');
        } else {
            navToggle.style.display = 'none';
            navMenu.classList.remove('mobile-nav', 'nav-open');
        }
    }
    
    // Check on load and resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

// Add CSS for mobile navigation
const mobileNavCSS = `
    @media (max-width: 768px) {
        .nav-toggle {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .mobile-nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #2c5530;
            flex-direction: column;
            box-shadow: 0 5px 10px rgba(0,0,0,0.2);
        }
        
        .mobile-nav.nav-open {
            display: flex;
        }
        
        .mobile-nav li {
            width: 100%;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .mobile-nav a {
            padding: 1rem 2rem;
            text-align: center;
        }
    }
`;

// Inject mobile navigation CSS
const style = document.createElement('style');
style.textContent = mobileNavCSS;
document.head.appendChild(style);




