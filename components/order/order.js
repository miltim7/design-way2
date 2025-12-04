// components/order/order.js

document.addEventListener('DOMContentLoaded', function() {
    const processSteps = document.querySelectorAll('.process-step');
    
    if (processSteps.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.querySelector('.step__icon').style.transform = 'scale(1)';
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        processSteps.forEach(function(step, index) {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            step.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            step.querySelector('.step__icon').style.transition = 'all 0.4s ease 0.2s';
            observer.observe(step);
        });
    }
    
    const orderButton = document.querySelector('.order__button');
    
    if (orderButton) {
        orderButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
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
                            messageField.value = 'Хочу обсудить сотрудничество и начать проект';
                            messageField.focus();
                        }
                    }
                }, 800);
            }
        });
    }
    
    const stepIcons = document.querySelectorAll('.step__icon');
    
    stepIcons.forEach(function(icon) {
        icon.addEventListener('mouseenter', function() {
            const paths = this.querySelectorAll('.icon path');
            paths.forEach(function(path, index) {
                path.style.transition = `stroke-dashoffset 0.3s ease ${index * 0.1}s`;
            });
        });
    });
    
    const steps = document.querySelectorAll('.process-step');
    
    steps.forEach(function(step, index) {
        step.addEventListener('mouseenter', function() {
            const number = this.querySelector('.step__number');
            number.style.transform = 'scale(1.2)';
            number.style.opacity = '1';
        });
        
        step.addEventListener('mouseleave', function() {
            const number = this.querySelector('.step__number');
            number.style.transform = '';
            number.style.opacity = '';
        });
    });
});