// components/about/about.js

document.addEventListener('DOMContentLoaded', function() {
    // Ленивая загрузка изображения
    const aboutImage = document.querySelector('.photo__image[data-src]');
    
    if (aboutImage && 'IntersectionObserver' in window) {
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
        
        imageObserver.observe(aboutImage);
    }
    
    // Параллакс эффект для фотографии
    const photoWrapper = document.querySelector('.photo__wrapper');
    
    if (photoWrapper) {
        photoWrapper.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        photoWrapper.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
    
    // Анимация иконок при наведении
    const icons = document.querySelectorAll('.item__icon');
    
    icons.forEach(function(icon) {
        icon.addEventListener('mouseenter', function() {
            const paths = this.querySelectorAll('.icon path');
            paths.forEach(function(path, index) {
                path.style.transition = `stroke-dashoffset 0.3s ease ${index * 0.1}s`;
            });
        });
    });
    
    // Клик по CTA ссылке
    const ctaLink = document.querySelector('.cta__link');
    
    if (ctaLink) {
        ctaLink.addEventListener('click', function(e) {
            // Добавляем анимацию нажатия
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 300);
        });
    }
});