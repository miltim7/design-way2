// components/services/services.js

document.addEventListener('DOMContentLoaded', function() {
    const services = document.querySelectorAll('.service');
    
    if (services.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        services.forEach(function(service, index) {
            service.style.opacity = '0';
            service.style.transform = 'translateY(20px)';
            service.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(service);
        });
    }
    
    const serviceImages = document.querySelectorAll('.service__img[data-src]');
    
    if (serviceImages.length > 0 && 'IntersectionObserver' in window) {
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
        
        serviceImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
});