// Mobile Navigation
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Language Switching
const initLanguageSwitcher = () => {
    const languageSelect = document.getElementById('language-select');
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    languageSelect.value = savedLanguage;
    
    // Apply initial language
    changeLanguage(savedLanguage);
    
    // Add event listener for language changes
    languageSelect.addEventListener('change', (e) => {
        const selectedLanguage = e.target.value;
        changeLanguage(selectedLanguage);
        
        // Save language preference
        localStorage.setItem('language', selectedLanguage);
    });
}

const changeLanguage = (language) => {
    // Set document direction
    document.documentElement.lang = language;
    document.body.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr');
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-' + language + ']').forEach(element => {
        if (element.hasAttribute('data-' + language)) {
            element.textContent = element.getAttribute('data-' + language);
        }
    });
    
    // Update placeholders
    document.querySelectorAll('input[data-placeholder-' + language + '], textarea[data-placeholder-' + language + ']').forEach(element => {
        if (element.hasAttribute('data-placeholder-' + language)) {
            element.placeholder = element.getAttribute('data-placeholder-' + language);
        }
    });
    
    // Load Farsi font if needed
    if (language === 'fa') {
        loadFarsiFont();
    }
}

const loadFarsiFont = () => {
    // Check if font is already loaded
    if (document.getElementById('vazir-font')) return;
    
    // Create link element for font
    const fontLink = document.createElement('link');
    fontLink.id = 'vazir-font';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css';
    
    // Add to document head
    document.head.appendChild(fontLink);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Simulated Crypto Price Updates
const updateCryptoPrices = () => {
    const prices = document.querySelectorAll('.price');
    const changes = document.querySelectorAll('.change');
    
    prices.forEach((price, index) => {
        const currentPrice = parseFloat(price.textContent.replace('$', '').replace(',', ''));
        const change = parseFloat(changes[index].textContent.replace('%', ''));
        
        // Simulate price movement
        const newChange = (Math.random() * 2 - 1).toFixed(2);
        const newPrice = (currentPrice * (1 + newChange/100)).toFixed(2);
        
        // Update price with animation
        price.style.transform = 'scale(1.1)';
        price.style.color = newChange >= 0 ? 'var(--positive-color)' : 'var(--negative-color)';
        setTimeout(() => {
            price.textContent = `$${newPrice}`;
            price.style.transform = 'scale(1)';
            price.style.color = '';
        }, 200);
        
        // Update change percentage
        changes[index].textContent = `${newChange >= 0 ? '+' : ''}${newChange}%`;
        changes[index].className = `change ${newChange >= 0 ? 'positive' : 'negative'}`;
    });
}

// Portfolio Chart Animation
const initPortfolioChart = () => {
    const chart = document.querySelector('.chart-placeholder');
    let width = chart.offsetWidth;
    let height = chart.offsetHeight;
    let points = [];
    
    // Generate random points for the chart
    for (let i = 0; i < 50; i++) {
        points.push({
            x: (i / 50) * width,
            y: height * (0.3 + Math.random() * 0.4)
        });
    }
    
    // Create SVG path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    path.setAttribute('width', width);
    path.setAttribute('height', height);
    path.style.position = 'absolute';
    path.style.top = '0';
    path.style.left = '0';
    
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = points.map((point, i) => 
        `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');
    
    pathElement.setAttribute('d', d);
    pathElement.setAttribute('stroke', 'var(--accent-color)');
    pathElement.setAttribute('stroke-width', '2');
    pathElement.setAttribute('fill', 'none');
    
    path.appendChild(pathElement);
    chart.appendChild(path);
}

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Here you would typically send the form data to a server
    console.log('Form submitted:', formObject);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Scroll Animation
const scrollAnimation = () => {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('active');
            }
        });
    });
}

// Initialize all functions
const init = () => {
    navSlide();
    scrollAnimation();
    initPortfolioChart();
    initLanguageSwitcher();
    
    // Update crypto prices every 5 seconds
    setInterval(updateCryptoPrices, 5000);
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 