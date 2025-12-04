// components/pricing/pricing.js

document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    
    const orderButtons = document.querySelectorAll('.pricing-card__button');
    
    orderButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const plan = this.getAttribute('data-plan');
            const card = this.closest('.pricing-card');
            const planName = card.querySelector('.pricing-card__title').textContent;
            const planPrice = card.querySelector('.price__amount').textContent + ' ₽';
            
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    const contactForm = document.querySelector('#contact-form');
                    if (contactForm) {
                        const messageField = contactForm.querySelector('textarea[name="message"]');
                        if (messageField) {
                            messageField.value = `Интересуюсь тарифом: ${planName} (${planPrice})`;
                            messageField.focus();
                        }
                    }
                }, 800);
            }
            
            console.log(`Выбран тариф: ${planName} (${plan})`);
        });
    });
    
    const cards = document.querySelectorAll('.pricing-card');
    
    if (cards.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        cards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(card);
        });
    }
    
    const contactLink = document.querySelector('.pricing__contact-link');
    
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = contactSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                setTimeout(() => {
                    const contactForm = document.querySelector('#contact-form');
                    if (contactForm) {
                        const messageField = contactForm.querySelector('textarea[name="message"]');
                        if (messageField) {
                            messageField.value = 'Нужен индивидуальный расчет проекта';
                            messageField.focus();
                        }
                    }
                }, 800);
            }
        });
    }
});