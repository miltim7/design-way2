// components/portfolio/portfolio.js

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.portfolio__slider');
    const track = document.querySelector('.portfolio__track');
    const slides = Array.from(document.querySelectorAll('.portfolio__slide'));
    const prevBtn = document.querySelector('.portfolio__arrow--prev');
    const nextBtn = document.querySelector('.portfolio__arrow--next');
    const dotsContainer = document.querySelector('.portfolio__dots');

    if (!slider || !track || slides.length === 0 || !prevBtn || !nextBtn || !dotsContainer) {
        return;
    }

    let currentIndex = 0;
    const lastIndex = slides.length - 1;

    // Создаем точки
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'portfolio__dot';
        dot.setAttribute('aria-label', `Показать слайд ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.portfolio__dot'));

    function updateSlider() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;

        slides.forEach((slide, index) => {
            slide.classList.toggle('portfolio__slide--active', index === currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('portfolio__dot--active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = lastIndex;
        } else if (index > lastIndex) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateSlider();
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    // Свайпы на тач-устройствах
    let startX = 0;
    let isDragging = false;

    slider.addEventListener('touchstart', (e) => {
        if (!e.touches || !e.touches[0]) return;
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDragging || !e.touches || !e.touches[0]) return;
        // можно добавить визуальное перетягивание, но для простоты не двигаем трек
    });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;

        const endX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : startX;
        const deltaX = endX - startX;

        const swipeThreshold = 50; // px

        if (deltaX > swipeThreshold) {
            // свайп вправо (показать предыдущий)
            goToSlide(currentIndex - 1);
        } else if (deltaX < -swipeThreshold) {
            // свайп влево (показать следующий)
            goToSlide(currentIndex + 1);
        }
    });

    // Если IntersectionObserver доступен — плавное появление блока
    const portfolioSection = document.querySelector('.portfolio');

    if ('IntersectionObserver' in window && portfolioSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        portfolioSection.classList.add('portfolio--visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -10% 0px',
            }
        );

        observer.observe(portfolioSection);
    }

    // Инициализация
    goToSlide(0);
});
