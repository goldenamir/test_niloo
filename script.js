// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to feature cards when they come into view
const featureCards = document.querySelectorAll('.feature-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Add hover effect to pricing cards
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'scale(1)';
        }
    });
});

// Add click event to CTA button
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    alert('Thank you for your interest! Our platform is coming soon.');
});

// Add click event to pricing buttons
const pricingButtons = document.querySelectorAll('.pricing-button');
pricingButtons.forEach(button => {
    button.addEventListener('click', () => {
        const plan = button.closest('.pricing-card').querySelector('h3').textContent;
        alert(`Thank you for choosing the ${plan} plan! We'll contact you shortly.`);
    });
});

// Add scroll-based navbar background change
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    } else {
        navbar.style.backgroundColor = '#1a1a1a';
    }
});

// Language Switching
document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.getElementById('langBtn');
    const currentLang = document.querySelector('.current-lang');
    const langLinks = document.querySelectorAll('.lang-dropdown a');
    
    // Set initial language
    let currentLanguage = 'en';
    
    // Language content
    const content = {
        en: {
            // Navigation
            features: 'Features',
            about: 'About',
            pricing: 'Pricing',
            contact: 'Contact',
            login: 'Login / Membership',
            
            // Hero Section
            heroTitle: 'AI-Powered Trading Platform',
            heroSubtitle: 'Transform complex market data into clear trading decisions',
            getStarted: 'Get Started',
            
            // Features Section
            featuresTitle: 'Key Features',
            realTimeAnalytics: 'Real-Time Analytics',
            realTimeDesc: 'Access live market data and insights',
            aiInsights: 'AI-Powered Insights',
            aiInsightsDesc: 'Get intelligent trading recommendations',
            customAlerts: 'Custom Alerts',
            customAlertsDesc: 'Never miss important market movements',
            
            // About Section
            aboutTitle: 'About Unitrade Lab',
            aboutText1: "We're a team of trading enthusiasts, developers, and tech innovators who believe that great tools make great traders. Unitrade Lab is our way of bringing powerful, easy-to-use trading solutions to anyone who wants to get ahead in the markets.",
            aboutText2: "We've built this platform with care, focusing on what really matters: fast execution, smart analytics, and a great user experience. And we're just getting started!",
            aboutText3: "Join us as we continue to grow, improve, and make trading accessible to all.",
            
            // Pricing Section
            pricingTitle: 'Pricing Plans',
            basicPlan: 'Basic',
            basicPrice: '$29/month',
            basicFeature1: 'Basic market analysis',
            basicFeature2: 'Limited alerts',
            basicFeature3: 'Email support',
            choosePlan: 'Choose Plan',
            proPlan: 'Pro',
            proPrice: '$99/month',
            proFeature1: 'Advanced analytics',
            proFeature2: 'Unlimited alerts',
            proFeature3: 'Priority support',
            
            // Contact Section
            contactTitle: 'Contact Us',
            email: 'Email',
            phone: 'Phone',
            location: 'Location',
            yourName: 'Your Name',
            yourEmail: 'Your Email',
            yourMessage: 'Your Message',
            sendMessage: 'Send Message',
            
            // Footer
            copyright: '© 2024 TradeGPT. All rights reserved.'
        },
        fa: {
            // Navigation
            features: 'ویژگی‌ها',
            about: 'درباره ما',
            pricing: 'قیمت‌گذاری',
            contact: 'تماس با ما',
            login: 'ورود / عضویت',
            
            // Hero Section
            heroTitle: 'پلتفرم معاملاتی هوش مصنوعی',
            heroSubtitle: 'تبدیل داده‌های پیچیده بازار به تصمیمات معاملاتی روشن',
            getStarted: 'شروع کنید',
            
            // Features Section
            featuresTitle: 'ویژگی‌های کلیدی',
            realTimeAnalytics: 'تحلیل‌های لحظه‌ای',
            realTimeDesc: 'دسترسی به داده‌ها و بینش‌های زنده بازار',
            aiInsights: 'بینش‌های هوش مصنوعی',
            aiInsightsDesc: 'دریافت توصیه‌های معاملاتی هوشمند',
            customAlerts: 'هشدارهای سفارشی',
            customAlertsDesc: 'هرگز حرکات مهم بازار را از دست ندهید',
            
            // About Section
            aboutTitle: 'درباره یونیت‌ترید لب',
            aboutText1: 'ما تیمی از علاقه‌مندان به معاملات، توسعه‌دهندگان و نوآوران فناوری هستیم که معتقدیم ابزارهای عالی، معامله‌گران عالی می‌سازند. یونیت‌ترید لب راه ما برای ارائه راه‌حل‌های معاملاتی قدرتمند و آسان به هر کسی است که می‌خواهد در بازارها پیشرفت کند.',
            aboutText2: 'ما این پلتفرم را با دقت ساخته‌ایم و بر آنچه واقعاً مهم است تمرکز کرده‌ایم: اجرای سریع، تحلیل‌های هوشمند و تجربه کاربری عالی. و ما تازه شروع کرده‌ایم!',
            aboutText3: 'به ما بپیوندید تا به رشد، بهبود و دسترسی‌پذیر کردن معاملات برای همه ادامه دهیم.',
            
            // Pricing Section
            pricingTitle: 'طرح‌های قیمت‌گذاری',
            basicPlan: 'پایه',
            basicPrice: '۲۹ دلار در ماه',
            basicFeature1: 'تحلیل بازار پایه',
            basicFeature2: 'هشدارهای محدود',
            basicFeature3: 'پشتیبانی ایمیلی',
            choosePlan: 'انتخاب طرح',
            proPlan: 'حرفه‌ای',
            proPrice: '۹۹ دلار در ماه',
            proFeature1: 'تحلیل‌های پیشرفته',
            proFeature2: 'هشدارهای نامحدود',
            proFeature3: 'پشتیبانی اولویت‌دار',
            
            // Contact Section
            contactTitle: 'تماس با ما',
            email: 'ایمیل',
            phone: 'تلفن',
            location: 'موقعیت',
            yourName: 'نام شما',
            yourEmail: 'ایمیل شما',
            yourMessage: 'پیام شما',
            sendMessage: 'ارسال پیام',
            
            // Footer
            copyright: '© ۲۰۲۴ تریدجی‌پی‌تی. تمامی حقوق محفوظ است.'
        }
    };
    
    // Handle language selection
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const newLang = this.getAttribute('data-lang');
            if (newLang !== currentLanguage) {
                currentLanguage = newLang;
                currentLang.textContent = newLang.toUpperCase();
                updateContent(newLang);
            }
        });
    });
    
    // Update content based on selected language
    function updateContent(lang) {
        // Update navigation links
        document.querySelectorAll('.nav-links a').forEach((link, index) => {
            const keys = ['features', 'about', 'pricing', 'contact'];
            if (index < keys.length) {
                link.textContent = content[lang][keys[index]];
            }
        });
        
        // Update login text
        document.querySelector('.login-text').textContent = content[lang].login;
        
        // Update hero content
        document.querySelector('.hero-text h1').textContent = content[lang].heroTitle;
        document.querySelector('.hero-text p').textContent = content[lang].heroSubtitle;
        document.querySelector('.get-start-icon span').textContent = content[lang].getStarted;
        
        // Update features section
        document.querySelector('#features h2').textContent = content[lang].featuresTitle;
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards[0].querySelector('h3').textContent = content[lang].realTimeAnalytics;
        featureCards[0].querySelector('p').textContent = content[lang].realTimeDesc;
        featureCards[1].querySelector('h3').textContent = content[lang].aiInsights;
        featureCards[1].querySelector('p').textContent = content[lang].aiInsightsDesc;
        featureCards[2].querySelector('h3').textContent = content[lang].customAlerts;
        featureCards[2].querySelector('p').textContent = content[lang].customAlertsDesc;
        
        // Update about section
        document.querySelector('#about h2').textContent = content[lang].aboutTitle;
        const aboutParagraphs = document.querySelectorAll('#about p');
        aboutParagraphs[0].textContent = content[lang].aboutText1;
        aboutParagraphs[1].textContent = content[lang].aboutText2;
        aboutParagraphs[2].textContent = content[lang].aboutText3;
        
        // Update pricing section
        document.querySelector('#pricing h2').textContent = content[lang].pricingTitle;
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards[0].querySelector('h3').textContent = content[lang].basicPlan;
        pricingCards[0].querySelector('.price').textContent = content[lang].basicPrice;
        const basicFeatures = pricingCards[0].querySelectorAll('li');
        basicFeatures[0].textContent = content[lang].basicFeature1;
        basicFeatures[1].textContent = content[lang].basicFeature2;
        basicFeatures[2].textContent = content[lang].basicFeature3;
        pricingCards[0].querySelector('.pricing-button').textContent = content[lang].choosePlan;
        
        pricingCards[1].querySelector('h3').textContent = content[lang].proPlan;
        pricingCards[1].querySelector('.price').textContent = content[lang].proPrice;
        const proFeatures = pricingCards[1].querySelectorAll('li');
        proFeatures[0].textContent = content[lang].proFeature1;
        proFeatures[1].textContent = content[lang].proFeature2;
        proFeatures[2].textContent = content[lang].proFeature3;
        pricingCards[1].querySelector('.pricing-button').textContent = content[lang].choosePlan;
        
        // Update contact section
        document.querySelector('#contact h2').textContent = content[lang].contactTitle;
        const infoItems = document.querySelectorAll('.info-item');
        infoItems[0].querySelector('h3').textContent = content[lang].email;
        infoItems[1].querySelector('h3').textContent = content[lang].phone;
        infoItems[2].querySelector('h3').textContent = content[lang].location;
        
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        formInputs[0].placeholder = content[lang].yourName;
        formInputs[1].placeholder = content[lang].yourEmail;
        formInputs[2].placeholder = content[lang].yourMessage;
        document.querySelector('.submit-btn').textContent = content[lang].sendMessage;
        
        // Update footer
        document.querySelector('footer p').textContent = content[lang].copyright;
        
        // Update RTL/LTR direction
        document.body.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
    }
}); 