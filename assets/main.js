// assets/main.js

document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    function forceShowAnimatedBlocksOnSmallWidth() {
        if (window.innerWidth >= 1024) return;

        const selectors = [
            '.service',
            '.skill',
            '.pricing-card',
            '.process-step',
            '.contact__form-wrapper'
        ];

        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    }

    forceShowAnimatedBlocksOnSmallWidth();
    window.addEventListener('resize', forceShowAnimatedBlocksOnSmallWidth);
});
