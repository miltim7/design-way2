// components/skills/skills.js

document.addEventListener('DOMContentLoaded', function() {
    const skills = document.querySelectorAll('.skill');
    
    if (skills.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        skills.forEach(function(skill, index) {
            skill.style.opacity = '0';
            skill.style.transform = 'translateY(20px)';
            skill.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(skill);
        });
    }
    
    const skillImages = document.querySelectorAll('.skill__img[data-src]');
    
    if (skillImages.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    img.onload = function() {
                        setTimeout(() => {
                            img.style.opacity = '1';
                        }, 100);
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.1
        });
        
        skillImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
    
    const orderButtons = document.querySelectorAll('.skill__button');
    
    orderButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const skillCard = this.closest('.skill');
            const skillTitle = skillCard.querySelector('.skill__title').textContent;
            const skillPrice = skillCard.querySelector('.skill__price').textContent;
            
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
                            messageField.value = `Интересуюсь услугой: ${skillTitle} (${skillPrice})`;
                            messageField.focus();
                        }
                    }
                }, 800);
            }
        });
    });
});